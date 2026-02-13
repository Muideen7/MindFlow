// Email service - placeholder for future implementation
// Current implementation uses mock data to avoid dependency conflicts

export async function sendEmail(
  to: string,
  subject: string,
  html: string
) {
  console.log(`Email sent to ${to}: ${subject}`);
  // In production, integrate with your email service (SendGrid, Mailgun, etc.)
}

export async function sendVerificationEmail(
  email: string,
  name: string,
  verificationUrl: string
) {
  console.log(`Verification email sent to ${email}`);
  // In production, send actual verification email
}

export async function sendWelcomeEmail(email: string, name: string) {
  console.log(`Welcome email sent to ${email}`);
  // In production, send actual welcome email
}
