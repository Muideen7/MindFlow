# Nexus - Modern Team Collaboration Platform

<div align="center">

![Nexus](https://img.shields.io/badge/Nexus-Team%20Collaboration-orange)
![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)
![React](https://img.shields.io/badge/React-19.0.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue)
![License](https://img.shields.io/badge/License-MIT-green)

A production-ready SaaS platform for team collaboration and productivity. Built with modern technologies and best practices.

[Live Demo](https://nexus.vercel.app) • [Documentation](./DEPLOYMENT.md) • [Report Bug](https://github.com/Muideen7/nexus/issues)

</div>

---

## 🚀 Features

### Authentication & Security
- ✅ Email/Password authentication with bcrypt hashing
- ✅ Google OAuth integration
- ✅ Email verification flow
- ✅ Password reset functionality
- ✅ JWT-based session management
- ✅ Protected routes with middleware

### Landing Page
- ✅ Hero section with CTA
- ✅ Features showcase
- ✅ Testimonials section
- ✅ Statistics display
- ✅ System theme detection (respects OS preference)
- ✅ Light/Dark mode toggle
- ✅ Responsive design

### Dashboard
- ✅ Task management with slide-over panel
- ✅ Real-time statistics cards
- ✅ Revenue charts with Recharts
- ✅ Project progress tracking
- ✅ Schedule management
- ✅ Glassmorphic design components
- ✅ Yellow accent color scheme

### Design System
- ✅ Nexus design language
- ✅ Glassmorphism components
- ✅ Consistent color tokens
- ✅ Responsive layouts
- ✅ Professional typography
- ✅ Smooth animations with Framer Motion

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.1.6 (Turbopack)
- **UI Library**: React 19.0.0
- **Language**: TypeScript 5.7.2
- **Styling**: Tailwind CSS 3.4.15
- **Animations**: Framer Motion 11.11.17
- **Charts**: Recharts 3.7.0
- **Icons**: Lucide React 0.460.0
- **Forms**: React Hook Form 7.53.2 + Zod validation

### Backend & Database
- **ORM**: Prisma 6.3.1
- **Database**: MongoDB Atlas
- **Authentication**: NextAuth 4.24.13
- **Password Hashing**: bcryptjs 2.4.3

### DevTools
- **Linting**: ESLint 9.15.0
- **CSS Processing**: PostCSS 8.4.49
- **Build Tool**: Turbopack

---

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn
- MongoDB Atlas account (free tier available)
- Google OAuth credentials

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Muideen7/nexus.git
cd nexus
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

```bash
cp .env.example .env.local
```

Fill in the required variables:
- `DATABASE_URL` - MongoDB connection string
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `NEXTAUTH_URL` - http://localhost:3000
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`
- `NEXT_PUBLIC_APP_URL` - http://localhost:3000

### 4. Sync Database

```bash
npx prisma db push
```

### 5. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
nexus/
├── app/
│   ├── (auth)/              # Authentication pages
│   │   ├── login/
│   │   ├── signup/
│   │   └── forgot-password/
│   ├── (main)/              # Landing page
│   ├── api/                 # API routes
│   │   ├── auth/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   └── verify-email/
│   ├── dashboard/           # Dashboard pages
│   └── layout.tsx           # Root layout
├── components/
│   ├── auth/                # Auth components
│   ├── email/               # Email templates
│   ├── layout/              # Layout components
│   ├── sections/            # Landing page sections
│   ├── providers/           # Context providers
│   └── ui/                  # Reusable UI components
├── lib/
│   ├── auth.ts              # NextAuth configuration
│   ├── email.ts             # Email service
│   └── prisma.ts            # Prisma client
├── prisma/
│   └── schema.prisma        # Database schema
├── public/
│   ├── manifest.json        # PWA manifest
│   ├── robots.txt           # SEO robots
│   └── sitemap.xml          # SEO sitemap
└── package.json
```

---

## 🔐 Environment Variables

```env
# Database
DATABASE_URL=mongodb+srv://user:password@cluster.mongodb.net/db

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Google OAuth
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret

# Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=Nexus <noreply@nexus.com>

# Public URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 📦 Available Scripts

```bash
# Development
npm run dev              # Start dev server with Turbopack

# Production
npm run build            # Build for production
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript type checking

# Database
npx prisma db push       # Sync database schema
npx prisma studio       # Open Prisma Studio
```

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### Other Platforms

The project can be deployed to any Node.js hosting platform:
- AWS Amplify
- Railway
- Render
- Heroku
- DigitalOcean

---

## 🔑 Key Features Explained

### Authentication Flow
1. User signs up with email/password or Google OAuth
2. Email verification is sent
3. User verifies email and gains access
4. Session is managed via JWT tokens
5. Protected routes redirect unauthenticated users

### Theme System
- Detects system theme preference on first load
- Users can manually override theme preference
- Theme preference is persisted in localStorage
- Auth pages always display in light mode

### Dashboard
- Real-time statistics cards with yellow accent
- Interactive charts for revenue tracking
- Task management interface
- Responsive sidebar with yellow border
- User profile and settings

---

## 🎨 Design System

### Colors
- **Primary**: Orange (#FFA500)
- **Light Background**: #F8F8F8
- **Dark Background**: #0A0E27
- **Accent**: Yellow (#EABB08)

### Typography
- **Display Font**: Playfair Display (headings)
- **Body Font**: Inter (content)

### Components
- Glassmorphic cards
- Smooth animations
- Responsive grid layouts
- Accessible form inputs

---

## 🧪 Testing

```bash
# Run tests (when configured)
npm test

# Run tests in watch mode
npm test -- --watch
```

---

## 📊 Performance

- ✅ Image optimization with Next.js Image
- ✅ Code splitting and lazy loading
- ✅ Turbopack for fast builds
- ✅ CSS-in-JS with Tailwind
- ✅ Optimized bundle size

---

## 🔒 Security

- ✅ HTTPS enforced
- ✅ CSRF protection via NextAuth
- ✅ XSS protection
- ✅ SQL injection prevention (Prisma)
- ✅ Secure password hashing (bcrypt)
- ✅ Environment variables not exposed
- ✅ Security headers configured

---

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

**FrontendGeek**
- GitHub: [@Muideen7](https://github.com/Muideen7)
- LinkedIn: [Muideen7](https://linkedin.com/in/Muideen7)
- Twitter: [@OlayeyeMuideen](https://x.com/OlayeyeMuideen)

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- MongoDB for the database
- All open-source contributors

---

## 📞 Support

For support, email support@nexus.com or open an issue on GitHub.

---

## 🗺️ Roadmap

- [ ] Real-time collaboration features
- [ ] Advanced analytics dashboard
- [ ] Team management system
- [ ] API documentation
- [ ] Mobile app
- [ ] Slack integration
- [ ] Custom branding

---

<div align="center">

Made with ❤️ by FrontendGeek

[⬆ Back to top](#nexus---modern-team-collaboration-platform)

</div>
