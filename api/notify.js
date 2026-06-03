// Vercel Function — Notifications email FLO
// Déclenché par un webhook Supabase sur INSERT dans la table notifications

const SUPABASE_URL = 'https://optfcepolcjyregdaxpt.supabase.co';
const RESEND_API_URL = 'https://api.resend.com/emails';

const EMAIL_FROM = 'FLO <noreply@rue-gamma.fr>';

const SUBJECTS = {
  loan_request:   '📦 Nouvelle demande de prêt',
  loan_accepted:  '✅ Votre demande a été acceptée',
  loan_declined:  '❌ Votre demande a été refusée',
  bottle_response:'💬 Quelqu\'un répond à votre bouteille à la mer',
};

async function getServiceClient() {
  const { createClient } = await import('@supabase/supabase-js');
  return createClient(SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY, {
    auth: { persistSession: false }
  });
}

async function getMemberEmail(db, userId) {
  const { data } = await db.from('members').select('first_name, email').eq('id', userId).single();
  return data;
}

async function getLoanDetails(db, loanId) {
  const { data } = await db.from('loans')
    .select('id, item:items!item_id(name), owner:members!owner_id(first_name), borrower:members!borrower_id(first_name)')
    .eq('id', loanId)
    .single();
  return data;
}

function buildEmailHtml(type, recipient, loan) {
  const itemName = loan?.item?.name || 'un objet';
  const ownerName = loan?.owner?.first_name || 'Un voisin';
  const borrowerName = loan?.borrower?.first_name || 'Un voisin';

  const messages = {
    loan_request: {
      title: `${borrowerName} souhaite emprunter votre objet`,
      body: `<p><strong>${borrowerName}</strong> vous demande d'emprunter : <strong>${itemName}</strong>.</p>
             <p>Connectez-vous à FLO pour accepter ou refuser la demande.</p>`,
    },
    loan_accepted: {
      title: `Bonne nouvelle, votre demande est acceptée !`,
      body: `<p><strong>${ownerName}</strong> a accepté de vous prêter : <strong>${itemName}</strong>.</p>
             <p>Connectez-vous à FLO pour coordonner la remise.</p>`,
    },
    loan_declined: {
      title: `Votre demande a été refusée`,
      body: `<p>Malheureusement, <strong>${ownerName}</strong> ne peut pas vous prêter <strong>${itemName}</strong> en ce moment.</p>
             <p>D'autres objets sont peut-être disponibles sur FLO !</p>`,
    },
    bottle_response: {
      title: `Quelqu'un répond à votre bouteille à la mer`,
      body: `<p>Un voisin a répondu à votre demande sur FLO.</p>
             <p>Connectez-vous pour voir la réponse.</p>`,
    },
  };

  const msg = messages[type] || { title: 'Notification FLO', body: '<p>Vous avez une nouvelle notification.</p>' };

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F7F7F5;font-family:-apple-system,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:480px;background:#ffffff;border-radius:16px;overflow:hidden;">

        <!-- Header vert -->
        <tr>
          <td style="background:#1F9D55;padding:28px 32px;text-align:center;">
            <p style="margin:0;font-size:32px;font-weight:800;color:#ffffff;letter-spacing:-1px;">FLO</p>
            <p style="margin:4px 0 0;font-size:12px;color:rgba(255,255,255,0.75);letter-spacing:0.5px;text-transform:uppercase;">Front de Libération des Objets</p>
          </td>
        </tr>

        <!-- Corps -->
        <tr>
          <td style="padding:32px 32px 24px;">
            <p style="margin:0 0 8px;font-size:11px;font-weight:500;color:#888;text-transform:uppercase;letter-spacing:0.5px;">Bonjour ${recipient?.first_name || ''}</p>
            <h1 style="margin:0 0 20px;font-size:20px;font-weight:700;color:#1A1A1C;line-height:1.3;">${msg.title}</h1>
            <div style="font-size:15px;color:#3C3C43;line-height:1.6;">${msg.body}</div>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="padding:0 32px 32px;text-align:center;">
            <a href="https://rue-gamma.vercel.app"
               style="display:inline-block;background:#1F9D55;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 32px;border-radius:24px;">
              Ouvrir FLO
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:16px 32px 24px;border-top:1px solid #F0F0EE;text-align:center;">
            <p style="margin:0;font-size:12px;color:#999;">Rue Charles-Saint-Venant · Lille</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Vérification du secret webhook
  const secret = req.headers['x-webhook-secret'];
  if (secret !== process.env.WEBHOOK_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { record } = req.body;
    if (!record) return res.status(400).json({ error: 'No record' });

    const { type, user_id, loan_id } = record;
    if (!SUBJECTS[type]) return res.status(200).json({ skipped: true, type });

    const db = await getServiceClient();

    // Récupère le destinataire
    const recipient = await getMemberEmail(db, user_id);
    if (!recipient?.email) return res.status(200).json({ skipped: true, reason: 'no email' });

    // Récupère les détails du prêt si applicable
    const loan = loan_id ? await getLoanDetails(db, loan_id) : null;

    // Envoie l'email via Resend
    const emailRes = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: [recipient.email],
        subject: SUBJECTS[type],
        html: buildEmailHtml(type, recipient, loan),
      }),
    });

    const result = await emailRes.json();
    if (!emailRes.ok) throw new Error(result.message || 'Resend error');

    console.log(`[notify] Email envoyé → ${recipient.email} (${type})`);
    return res.status(200).json({ ok: true, email: recipient.email, type });

  } catch (err) {
    console.error('[notify] Error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
