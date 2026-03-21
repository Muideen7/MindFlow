export default function WelcomeEmail({ name }: { name: string }) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 0; }
          .header { background: linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%); color: white; padding: 40px 20px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; }
          .content { background: #ffffff; padding: 40px 20px; }
          .section { margin-bottom: 30px; }
          .section h2 { color: #FF6B35; font-size: 18px; margin-top: 0; }
          .feature-list { list-style: none; padding: 0; }
          .feature-list li { padding: 10px 0; padding-left: 30px; position: relative; }
          .feature-list li:before { content: "✓"; position: absolute; left: 0; color: #FF6B35; font-weight: bold; }
          .cta-button { display: inline-block; background: #FF6B35; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
          .divider { border-top: 1px solid #eee; margin: 30px 0; }
          .footer { background: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #666; }
          .highlight { background: #fff3e0; padding: 15px; border-left: 4px solid #FF6B35; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to MindFlow, ${name}! 🚀</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Your journey to better collaboration starts now</p>
          </div>

          <div class="content">
            <p>Hi ${name},</p>
            <p>Thank you for joining MindFlow! We're thrilled to have you on board. Your email has been verified, and your account is now fully activated.</p>

            <div class="section">
              <h2>What You Can Do Now</h2>
              <ul class="feature-list">
                <li>Access your personalized dashboard</li>
                <li>Create and manage projects</li>
                <li>Collaborate with your team in real-time</li>
                <li>Track progress with advanced analytics</li>
                <li>Integrate with your favorite tools</li>
              </ul>
            </div>

            <div class="highlight">
              <strong>🎯 Pro Tip:</strong> Complete your profile to unlock advanced features and help your team recognize you better.
            </div>

            <div class="section">
              <h2>Getting Started</h2>
              <p>Here's what we recommend you do first:</p>
              <ol style="padding-left: 20px;">
                <li><strong>Set up your profile</strong> - Add a photo and bio to personalize your account</li>
                <li><strong>Create your first project</strong> - Start organizing your work</li>
                <li><strong>Invite your team</strong> - Collaboration is where MindFlow shines</li>
                <li><strong>Explore integrations</strong> - Connect your favorite tools</li>
              </ol>
            </div>

            <div class="section">
              <h2>Key Features You'll Love</h2>
              <ul class="feature-list">
                <li><strong>Real-time Collaboration</strong> - Work together seamlessly with your team</li>
                <li><strong>Advanced Analytics</strong> - Get insights into your project performance</li>
                <li><strong>Customizable Workflows</strong> - Tailor MindFlow to match your process</li>
                <li><strong>Enterprise Security</strong> - Your data is protected with bank-level encryption</li>
                <li><strong>24/7 Support</strong> - Our team is always here to help</li>
              </ul>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="cta-button">Go to Your Dashboard</a>
            </div>

            <div class="divider"></div>

            <div class="section">
              <h2>Need Help?</h2>
              <p>We've created comprehensive guides to help you get the most out of MindFlow:</p>
              <ul style="padding-left: 20px;">
                <li><a href="${process.env.NEXT_PUBLIC_APP_URL}/docs" style="color: #FF6B35; text-decoration: none;">📚 Documentation</a> - Learn all the features</li>
                <li><a href="${process.env.NEXT_PUBLIC_APP_URL}/tutorials" style="color: #FF6B35; text-decoration: none;">🎓 Video Tutorials</a> - Step-by-step guides</li>
                <li><a href="mailto:support@mindflow.com" style="color: #FF6B35; text-decoration: none;">💬 Contact Support</a> - We're here to help</li>
              </ul>
            </div>

            <div class="highlight">
              <strong>🎁 Special Offer:</strong> Invite 3 friends to MindFlow and unlock premium features for free for 1 month!
            </div>

            <p style="margin-top: 30px; color: #666;">
              Best regards,<br>
              <strong>The MindFlow Team</strong><br>
              <em>Making collaboration effortless</em>
            </p>
          </div>

          <div class="footer">
            <p>&copy; 2024 MindFlow. All rights reserved.</p>
            <p>
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/privacy" style="color: #FF6B35; text-decoration: none; margin: 0 10px;">Privacy Policy</a> |
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/terms" style="color: #FF6B35; text-decoration: none; margin: 0 10px;">Terms of Service</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}
