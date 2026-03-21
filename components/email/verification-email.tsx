export default function VerificationEmail({
  name,
  verificationUrl,
}: {
  name: string;
  verificationUrl: string;
}) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #FF6B35; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Verify Your Email</h1>
          </div>
          <div class="content">
            <p>Hi ${name},</p>
            <p>Welcome to MindFlow! Please verify your email address to get started.</p>
            <a href="${verificationUrl}" class="button">Verify Email</a>
            <p style="color: #666; font-size: 14px;">Or copy this link: <br/>${verificationUrl}</p>
            <p style="color: #999; font-size: 12px;">This link expires in 24 hours.</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 MindFlow. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
