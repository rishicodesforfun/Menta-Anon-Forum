# MentaMind - Premium Mental Health Support Platform

A **world-class, visually stunning, and strictly private** mental health support platform.

![MentaMind](https://via.placeholder.com/800x400?text=MentaMind+Premium+Platform)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Navigate to the app directory
cd mentamind-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## ✨ Features

### 🔒 100% Anonymous
- No sign-ups, no emails, no tracking
- UUID-based identity stored locally
- No personal data ever collected

### 👥 Community Forum
- Share thoughts anonymously
- Like and reply to posts
- Report inappropriate content
- Rate-limited for safety

### 🤖 AI Companion
- 24/7 emotional support
- Crisis keyword detection
- Contextual responses
- Never replaces professional help

### 🎨 Premium Design
- Glassmorphism aesthetics
- Smooth Framer Motion animations
- Light/Dark mode support
- Mobile-responsive layout

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (Strict)
- **Styling:** TailwindCSS
- **Animations:** Framer Motion
- **Icons:** Lucide React

## 📁 Project Structure

```
mentamind-app/
├── src/
│   ├── app/
│   │   ├── api/          # API routes
│   │   │   ├── chat/     # AI chat endpoint
│   │   │   └── posts/    # Forum posts CRUD
│   │   ├── about/        # About page
│   │   ├── chat/         # AI chat interface
│   │   ├── community/    # Forum page
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Landing page
│   ├── components/
│   │   ├── forum/        # Forum components
│   │   ├── layout/       # Navbar, Footer
│   │   └── ui/           # Reusable UI components
│   └── lib/
│       ├── anonymous.ts  # UUID generation
│       ├── rate-limit.ts # Rate limiting
│       └── utils.ts      # Utility functions
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🔐 Privacy Promise

- ❌ No email or phone required
- ❌ No personal data collected
- ❌ No IP address logging
- ❌ No third-party tracking
- ✅ Encrypted connections only
- ✅ Session-based anonymity

## ⚠️ Crisis Resources

If you or someone you know is in crisis:

| Region | Number | Service |
|--------|--------|---------|
| **US** | 988 | Suicide & Crisis Lifeline |
| **UK** | 116 123 | Samaritans |
| **India** | 9152987821 | iCall |
| **Text** | HOME to 741741 | Crisis Text Line |

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🤝 Contributing

This is a private project. For feature requests or bug reports, please contact the maintainer.

## 📄 License

Private - All rights reserved.

---

**Made with ❤️ for mental wellness**
