// Vercel Function — Reconnaissance d'image FLO
// Proxy vers Anthropic API (clé jamais exposée côté client)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { base64, mediaType } = req.body;

  if (!base64 || !mediaType) {
    return res.status(400).json({ error: 'Missing base64 or mediaType' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 200,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: mediaType, data: base64 }
            },
            {
              type: 'text',
              text: `Tu regardes la photo d'un objet du quotidien qu'un voisin veut prêter à ses voisins.

Contexte : outils de bricolage, électroménager, jardinage, sport, cuisine, véhicules (vélo, trottinette), jeux, mobilier.

Réponds UNIQUEMENT avec ce JSON :
{
  "name": "nom de l'objet en français, marque incluse si visible (ex: Perceuse Bosch, Karcher K3, Vélo VTT) — 1 à 5 mots, commence par majuscule",
  "description": "phrase courte et utile pour des voisins, max 12 mots (ex: Légère, idéale pour les petits travaux)",
  "category": "une seule valeur parmi : outils, electromenager, jardin, sport, cuisine, mobilier, vehicules, jeux, autre",
  "confidence": 0.92
}

JSON seul, sans markdown, sans explication.`
            }
          ]
        }]
      })
    });

    if (!response.ok) {
      const err = await response.json();
      // Renvoie le code exact pour que le client puisse distinguer quota / erreur
      return res.status(response.status).json({
        error: err.error?.message || 'Anthropic API error',
        type:  err.error?.type   || 'unknown'
      });
    }

    const data = await response.json();
    const text = data.content[0].text.trim();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : text);

    return res.status(200).json(parsed);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
