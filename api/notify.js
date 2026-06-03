// Vercel Function — Notifications email FLO
// Déclenché par webhook Supabase sur INSERT dans notifications
// Utilise fetch natif — aucune dépendance externe

const SUPABASE_URL = 'https://optfcepolcjyregdaxpt.supabase.co';
const RESEND_API_URL = 'https://api.resend.com/emails';
const EMAIL_FROM = 'FLO <onboarding@resend.dev>';

const SUBJECTS = {
  loan_request:    '📦 Nouvelle demande de prêt — FLO',
  loan_accepted:   '✅ Votre demande a été acceptée — FLO',
  loan_declined:   '❌ Votre demande a été refusée — FLO',
  bottle_response: '💬 Une réponse à votre bouteille à la mer — FLO',
};

async function supabaseGet(path) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: {
      'apikey': process.env.SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
    },
  });
  return res.json();
}

async function getMember(userId) {
  const data = await supabaseGet(`members?id=eq.${userId}&select=first_name,email&limit=1`);
  return data?.[0];
}

async function getLoan(loanId) {
  const data = await supabaseGet(
    `loans?id=eq.${loanId}&select=id,item:items!item_id(name),owner:members!owner_id(first_name),borrower:members!borrower_id(first_name)&limit=1`
  );
  return data?.[0];
}

function buildHtml(type, recipient, loan) {
  const item      = loan?.item?.name   || 'un objet';
  const owner     = loan?.owner?.first_name    || 'Un voisin';
  const borrower  = loan?.borrower?.first_name || 'Un voisin';

  const messages = {
    loan_request:    { title: `${borrower} souhaite emprunter votre objet`, body: `<p><strong>${borrower}</strong> vous demande d'emprunter : <strong>${item}</strong>.</p><p>Connectez-vous à FLO pour accepter ou refuser.</p>` },
    loan_accepted:   { title: `Bonne nouvelle, votre demande est acceptée !`, body: `<p><strong>${owner}</strong> accepte de vous prêter : <strong>${item}</strong>.</p><p>Connectez-vous à FLO pour coordonner la remise.</p>` },
    loan_declined:   { title: `Votre demande a été refusée`, body: `<p><strong>${owner}</strong> ne peut pas vous prêter <strong>${item}</strong> en ce moment.</p>` },
    bottle_response: { title: `Un voisin répond à votre bouteille à la mer`, body: `<p>Connectez-vous à FLO pour voir la réponse.</p>` },
  };

  const { title, body } = messages[type] || { title: 'Notification FLO', body: '<p>Vous avez une nouvelle notification.</p>' };

  return `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#F7F7F5;font-family:-apple-system,Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
<tr><td align="center">
<table width="100%" style="max-width:480px;background:#fff;border-radius:16px;overflow:hidden;">
<tr><td style="background:#1F9D55;padding:28px 32px;text-align:center;">
  <p style="margin:0;font-size:32px;font-weight:800;color:#fff;letter-spacing:-1px;">FLO</p>
  <p style="margin:4px 0 0;font-size:12px;color:rgba(255,255,255,.75);text-transform:uppercase;letter-spacing:.5px;">Front de Libération des Objets</p>
</td></tr>
<tr><td style="padding:32px 32px 24px;">
  <p style="margin:0 0 8px;font-size:11px;font-weight:500;color:#888;text-transform:uppercase;">Bonjour ${recipient?.first_name || ''}</p>
  <h1 style="margin:0 0 20px;font-size:20px;font-weight:700;color:#1A1A1C;line-height:1.3;">${title}</h1>
  <div style="font-size:15px;color:#3C3C43;line-height:1.6;">${body}</div>
</td></tr>
<tr><td style="padding:0 32px 32px;text-align:center;">
  <a href="https://rue-gamma.vercel.app" style="display:inline-block;background:#1F9D55;color:#fff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 32px;border-radius:24px;">Ouvrir FLO</a>
</td></tr>
<tr><td style="padding:16px 32px 24px;border-top:1px solid #F0F0EE;text-align:center;">
  <p style="margin:0;font-size:12px;color:#999;">Rue Charles-Saint-Venant · Lille</p>
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const secret = req.headers['x-webhook-secret'];
  if (secret !== process.env.WEBHOOK_SECRET) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const { record } = req.body;
    if (!record) return res.status(400).json({ error: 'No record' });

    const { type, user_id, loan_id } = record;
    if (!SUBJECTS[type]) return res.status(200).json({ skipped: true, type });

    const recipient = await getMember(user_id);
    if (!recipient?.email) return res.status(200).json({ skipped: true, reason: 'no email' });

    const loan = loan_id ? await getLoan(loan_id) : null;

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
        html: buildHtml(type, recipient, loan),
      }),
    });

    const result = await emailRes.json();
    if (!emailRes.ok) throw new Error(JSON.stringify(result));

    console.log(`[notify] ✅ Email → ${recipient.email} (${type})`);
    return res.status(200).json({ ok: true });

  } catch (err) {
    console.error('[notify] Error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
