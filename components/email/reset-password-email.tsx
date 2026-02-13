export function ResetPasswordEmailTemplate(
  name: string,
  resetLink: string
) {
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
          .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Reset Your Password</h1>
          </div>
          <div class="content">
            <p>Hi ${name},</p>
            <p>We received a request to reset your password. Click the button below to create a new password.</p>
            <a href="${resetLink}" class="button">Reset Password</a>
            <div class="warning">
              <strong>Security Notice:</strong> This link expires in 1 hour. If you didn't request this, please ignore this email.
            </div>
            <p style="color: #666; font-size: 14px;">Or copy this link: <br/>${resetLink}</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 Nexus. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
