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
