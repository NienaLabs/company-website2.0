// Publicly-hosted logo mark (served from /public). Emails need an absolute URL —
// wrapped on a white rounded tile so the dark mark stays visible on the dark email.
const LOGO_URL = 'https://nienalabs.com/android-chrome-512x512.png';

const logoHeader = (subtitle?: string) => `
    <div style="text-align:center;padding-bottom:24px;border-bottom:1px solid rgba(201,168,76,0.2);">
      <img src="${LOGO_URL}" alt="Niena Labs" width="60" height="60" style="display:block;margin:0 auto 12px;width:60px;height:60px;border-radius:14px;background:#ffffff;padding:8px;" />
      <div style="font-family:'Cinzel',Georgia,serif;font-size:22px;color:#C9A84C;letter-spacing:0.15em;text-transform:uppercase;">Niena Labs</div>
      ${subtitle ? `<div style="font-family:'Cinzel',Georgia,serif;font-size:10px;color:#666;letter-spacing:0.2em;text-transform:uppercase;margin-top:6px;">${subtitle}</div>` : ''}
    </div>`;

export interface AdminEnrollmentData {
  fullName: string;
  email: string;
  phone: string;
  courseTitle: string;
  amount: number;
  method: 'Paystack' | 'Bank Transfer';
  /** 'paid' = payment already verified (Paystack); 'pending' = student claims a manual bank transfer, needs verification */
  status: 'paid' | 'pending';
  reference?: string;
}

export const getAdminEnrollmentEmailHtml = (data: AdminEnrollmentData) => {
  const isPaid = data.status === 'paid';
  const bannerColor = isPaid ? '#1f7a3d' : '#B8860B';
  const bannerBg = isPaid ? 'rgba(31,122,61,0.12)' : 'rgba(184,134,11,0.12)';
  const statusLabel = isPaid
    ? 'PAYMENT VERIFIED · via Paystack'
    : 'AWAITING VERIFICATION · manual bank transfer';
  const actionNote = isPaid
    ? 'This payment was automatically verified through Paystack. You can proceed to add this student to the WhatsApp group.'
    : 'The student says they have made a bank transfer. Confirm the funds have landed in the Guaranty Trust Bank account (1304001001886) BEFORE adding them to the WhatsApp group.';

  const rows: [string, string][] = [
    ['Full Name', data.fullName || '—'],
    ['Email', data.email || '—'],
    ['WhatsApp', data.phone || '—'],
    ['Course', data.courseTitle || '—'],
    ['Amount', `GH₵${data.amount}`],
    ['Payment Method', data.method],
  ];
  if (data.reference) rows.push(['Paystack Reference', data.reference]);
  rows.push(['Received', new Date().toLocaleString('en-GB', { timeZone: 'Africa/Accra', dateStyle: 'medium', timeStyle: 'short' }) + ' (GMT)']);

  const rowsHtml = rows
    .map(
      ([label, value], i) => `
        <tr>
          <td style="padding:14px 20px;border-top:${i === 0 ? '0' : '1px solid rgba(255,255,255,0.06)'};font-family:'Cinzel',Georgia,serif;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#8a8a8a;white-space:nowrap;vertical-align:top;">${label}</td>
          <td style="padding:14px 20px;border-top:${i === 0 ? '0' : '1px solid rgba(255,255,255,0.06)'};font-family:'Cormorant Garamond',Georgia,serif;font-size:18px;color:#FFFFFF;text-align:right;font-weight:600;word-break:break-word;">${value}</td>
        </tr>`
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Bootcamp Enrollment</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Cinzel:wght@400;600&display=swap');
  </style>
</head>
<body style="margin:0;padding:0;background-color:#0B0C10;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;background-color:#0B0C10;font-family:'Cormorant Garamond',Georgia,serif;">
    ${logoHeader('Bootcamp Enrollment · Admin Alert')}

    <div style="text-align:center;margin:32px 0 8px;">
      <span style="display:inline-block;padding:8px 18px;border-radius:999px;background:${bannerBg};border:1px solid ${bannerColor};font-family:'Cinzel',Georgia,serif;font-size:11px;letter-spacing:0.08em;color:${bannerColor};text-transform:uppercase;">${statusLabel}</span>
    </div>

    <h1 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:30px;font-weight:400;color:#FFFFFF;text-align:center;margin:16px 0 28px;line-height:1.2;">
      New enrollment from <span style="color:#C9A84C;">${data.fullName || 'a student'}</span>
    </h1>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#111318;border:1px solid rgba(201,168,76,0.18);border-radius:8px;overflow:hidden;">
      ${rowsHtml}
    </table>

    <div style="margin-top:24px;padding:18px 20px;background:${bannerBg};border:1px solid ${bannerColor};border-radius:8px;">
      <p style="margin:0;font-family:'Cormorant Garamond',Georgia,serif;font-size:16px;color:#D8D8D8;line-height:1.6;">
        <strong style="color:${bannerColor};font-family:'Cinzel',Georgia,serif;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;">Next step</strong><br>
        ${actionNote}
      </p>
    </div>

    <div style="text-align:center;margin-top:24px;">
      <a href="https://wa.me/${(data.phone || '').replace(/[^0-9]/g, '')}" style="display:inline-block;padding:14px 28px;background:transparent;color:#C9A84C;border:1px solid #C9A84C;border-radius:4px;text-decoration:none;font-family:'Cinzel',Georgia,serif;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;">Message student on WhatsApp</a>
    </div>

    <div style="padding-top:30px;margin-top:24px;border-top:1px solid rgba(255,255,255,0.05);text-align:center;font-family:'Cinzel',Georgia,serif;font-size:10px;color:#666;letter-spacing:0.1em;text-transform:uppercase;">
      Automated notification from the Niena Labs website
    </div>
  </div>
</body>
</html>
`;
};

export const getWelcomeEmailHtml = (firstName: string, courseTitle: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Niena Labs Bootcamp</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Cinzel:wght@400;600&display=swap');
    
    body {
      margin: 0;
      padding: 0;
      background-color: #0B0C10;
      color: #EAEAEA;
      font-family: 'Cormorant Garamond', Georgia, serif;
      -webkit-font-smoothing: antialiased;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
      background-color: #0B0C10;
    }
    .header {
      text-align: center;
      padding-bottom: 30px;
      border-bottom: 1px solid rgba(201, 168, 76, 0.2);
    }
    .logo {
      font-family: 'Cinzel', serif;
      font-size: 24px;
      color: #C9A84C;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      text-decoration: none;
    }
    .content {
      padding: 40px 0;
      text-align: center;
    }
    h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 36px;
      font-weight: 400;
      color: #FFFFFF;
      margin-bottom: 20px;
      line-height: 1.2;
    }
    p {
      font-family: 'Cormorant Garamond', serif;
      font-size: 18px;
      color: #A0A0A0;
      line-height: 1.6;
      margin-bottom: 24px;
    }
    .highlight {
      color: #C9A84C;
    }
    .btn {
      display: inline-block;
      padding: 16px 32px;
      background-color: transparent;
      color: #C9A84C;
      border: 1px solid #C9A84C;
      border-radius: 4px;
      text-decoration: none;
      font-family: 'Cinzel', serif;
      font-size: 12px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-top: 20px;
      transition: background-color 0.3s ease;
    }
    .footer {
      padding-top: 30px;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      text-align: center;
      font-family: 'Cinzel', serif;
      font-size: 10px;
      color: #666666;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="${LOGO_URL}" alt="Niena Labs" width="60" height="60" style="display:block;margin:0 auto 12px;width:60px;height:60px;border-radius:14px;background:#ffffff;padding:8px;" />
      <div class="logo">Niena Labs</div>
    </div>

    <div class="content">
      <h1>Welcome to the <span class="highlight">Future</span>, ${firstName || 'Future Developer'}</h1>
      <p>
        Your enrollment in <strong>${courseTitle || 'the Niena Labs Bootcamp'}</strong> has been successfully confirmed. We are thrilled to have you join our elite community of builders and creators.
      </p>
      <p>
        The journey ahead will be intense, challenging, and incredibly rewarding. Our team will be reaching out to you on WhatsApp within the next 24 hours with your onboarding details, schedule, and exclusive community access links.
      </p>
      <p>
        In the meantime, prepare your workspace and get ready to push your limits.
      </p>
      
      <a href="https://nienalabs.com/bootcamp/dashboard" class="btn">View Dashboard</a>
    </div>
    
    <div class="footer">
      &copy; 2026 Niena Labs. Elevating digital craftsmanship.
    </div>
  </div>
</body>
</html>
`;

/**
 * Sent to the STUDENT after they choose the manual bank-transfer option.
 * Payment is not yet confirmed, so this reassures them their spot is reserved
 * pending verification, and restates the bank details + what happens next.
 */
export const getEnrollmentReceivedEmailHtml = (firstName: string, courseTitle: string, amount: number) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>We received your enrollment — Niena Labs Bootcamp</title>
</head>
<body style="margin:0;padding:0;background-color:#0B0C10;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;background-color:#0B0C10;font-family:'Cormorant Garamond',Georgia,serif;">
    ${logoHeader('Software Development Bootcamp 2026')}

    <div style="text-align:center;margin:32px 0 8px;">
      <span style="display:inline-block;padding:8px 18px;border-radius:999px;background:rgba(184,134,11,0.12);border:1px solid #B8860B;font-family:'Cinzel',Georgia,serif;font-size:11px;letter-spacing:0.08em;color:#B8860B;text-transform:uppercase;">Enrollment received · payment being verified</span>
    </div>

    <h1 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:32px;font-weight:400;color:#FFFFFF;text-align:center;margin:16px 0 20px;line-height:1.2;">
      Thank you, ${firstName || 'Future Developer'}
    </h1>

    <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:18px;color:#A0A0A0;line-height:1.7;text-align:center;margin:0 0 24px;">
      We've received your enrollment for <strong style="color:#C9A84C;">${courseTitle || 'the Niena Labs Bootcamp'}</strong>. Your spot is reserved while we confirm your bank transfer.
    </p>

    <div style="background:#111318;border:1px solid rgba(201,168,76,0.18);border-radius:8px;padding:24px;margin:0 0 24px;">
      <div style="font-family:'Cinzel',Georgia,serif;font-size:11px;color:#C9A84C;letter-spacing:0.1em;text-transform:uppercase;text-align:center;margin-bottom:16px;">Bank Transfer Details</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="padding:8px 0;font-family:'Cinzel',Georgia,serif;font-size:11px;color:#8a8a8a;letter-spacing:0.06em;text-transform:uppercase;">Bank</td><td style="padding:8px 0;text-align:right;font-family:'Cormorant Garamond',Georgia,serif;font-size:18px;color:#FFFFFF;font-weight:600;">Guaranty Trust Bank</td></tr>
        <tr><td style="padding:8px 0;border-top:1px solid rgba(255,255,255,0.06);font-family:'Cinzel',Georgia,serif;font-size:11px;color:#8a8a8a;letter-spacing:0.06em;text-transform:uppercase;">Account Number</td><td style="padding:8px 0;border-top:1px solid rgba(255,255,255,0.06);text-align:right;font-family:'Cormorant Garamond',Georgia,serif;font-size:18px;color:#FFFFFF;font-weight:600;">1304001001886</td></tr>
        <tr><td style="padding:8px 0;border-top:1px solid rgba(255,255,255,0.06);font-family:'Cinzel',Georgia,serif;font-size:11px;color:#8a8a8a;letter-spacing:0.06em;text-transform:uppercase;">Account Name</td><td style="padding:8px 0;border-top:1px solid rgba(255,255,255,0.06);text-align:right;font-family:'Cormorant Garamond',Georgia,serif;font-size:18px;color:#FFFFFF;font-weight:600;">Adomako Yaw</td></tr>
        <tr><td style="padding:8px 0;border-top:1px solid rgba(255,255,255,0.06);font-family:'Cinzel',Georgia,serif;font-size:11px;color:#8a8a8a;letter-spacing:0.06em;text-transform:uppercase;">Amount</td><td style="padding:8px 0;border-top:1px solid rgba(255,255,255,0.06);text-align:right;font-family:'Cormorant Garamond',Georgia,serif;font-size:18px;color:#C9A84C;font-weight:600;">GH₵${amount}</td></tr>
      </table>
      <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:15px;color:#A0A0A0;line-height:1.6;margin:16px 0 0;text-align:center;">
        Already transferred? Send your payment screenshot to <strong style="color:#FFFFFF;">support@nienalabs.com</strong> or WhatsApp <strong style="color:#FFFFFF;">+233 55 283 7672</strong> so we can verify it faster.
      </p>
    </div>

    <div style="background:rgba(201,168,76,0.05);border:1px solid rgba(201,168,76,0.18);border-radius:8px;padding:20px 24px;margin:0 0 24px;">
      <div style="font-family:'Cinzel',Georgia,serif;font-size:11px;color:#C9A84C;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:10px;">What happens next</div>
      <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:16px;color:#D8D8D8;line-height:1.7;margin:0;">
        Once we confirm your payment, our team will add you to the exclusive cohort WhatsApp group and reach out within 24 hours with your onboarding details, class schedule, and community access links. The bootcamp runs <strong style="color:#FFFFFF;">7 September – 7 November 2026</strong>, fully online.
      </p>
    </div>

    <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:16px;color:#A0A0A0;line-height:1.6;text-align:center;margin:0;">
      Questions? Reach us at <strong style="color:#C9A84C;">support@nienalabs.com</strong> or on WhatsApp at +233 55 283 7672 / +233 55 673 2796.
    </p>

    <div style="padding-top:30px;margin-top:28px;border-top:1px solid rgba(255,255,255,0.05);text-align:center;font-family:'Cinzel',Georgia,serif;font-size:10px;color:#666;letter-spacing:0.1em;text-transform:uppercase;">
      &copy; 2026 Niena Labs. Elevating digital craftsmanship.
    </div>
  </div>
</body>
</html>
`;
