# Notably_Final_Version
A final version of the Notably App in Next Js , Supabase , Typescript , Tailwind and React Query.

# 🚀 Next.js + Supabase + Tailwind CSS Starter

A modern, full-stack web application built with Next.js, Supabase, and Tailwind CSS. This project provides a complete foundation for building scalable web applications with authentication, database, and beautiful UI components.

## ✨ Features

- 🔥 **Next.js 14** with TypeScript
- 💎 **Tailwind CSS** for beautiful, responsive styling
- 🗄️ **Supabase** for authentication and database
- 🎨 **Shadcn/ui** for premium UI components
- 📱 **Responsive Design** that works on all devices
- 🔐 **Authentication** with email confirmation
- ⚡ **Fast Development** with modern tooling

## 🛠️ Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Backend:** Supabase (Auth, Database, Storage)
- **UI Components:** Shadcn/ui
- **Package Manager:** Bun
- **Styling:** Tailwind CSS with glassmorphism effects

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Bun](https://bun.sh/) (recommended) or bun

### 1. Create the Next.js Application

```bash
bunx create-next-app@latest my-app --typescript --tailwind --eslint
cd my-app
```

### 2. Install Supabase Dependencies

```bash
bun install @supabase/supabase-js @supabase/ssr
```

### 3. Initialize Shadcn/ui

```bash
bunx shadcn@latest init
```

### 4. Environment Setup

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Configure Supabase Auth

In your Supabase dashboard, set up the email confirmation template:

#### Email Confirmation Template

```html
<h2>Confirm your signup</h2>

<p>Follow this link to confirm your user:</p>
<p><a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=signup">Confirm your mail</a></p>
```

### 6. Start Development

```bash
bun dev
# or
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
my-app/
├── app/                    # Next.js 14 App Router
│   ├── (auth)/            # Authentication routes
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   └── ui/               # Shadcn/ui components
├── lib/                  # Utility functions
├── public/               # Static assets
├── .env.local           # Environment variables
├── tailwind.config.js   # Tailwind configuration
└── next.config.js       # Next.js configuration
```

## 🎨 Features Included

### Authentication
- User registration and login
- Email confirmation
- Protected routes
- Session management

### UI Components
- Modern glassmorphic design
- Responsive navigation
- Beautiful forms and modals
- Interactive buttons and inputs

### Database Integration
- Real-time data synchronization
- CRUD operations
- File storage with Supabase Storage

## 🔧 Configuration

### Tailwind CSS

The project uses a custom Tailwind configuration with:
- Custom color palette (emerald theme)
- Glassmorphism utilities
- Responsive breakpoints
- Custom animations

### Supabase

Configure your Supabase project with:
- Authentication providers
- Database tables and relationships
- Row Level Security (RLS) policies
- Storage buckets

## 📝 Scripts

```bash
# Development
bun dev

# Build for production
bun build

# Start production server
bun start

# Lint code
bun lint

# Add UI components
bunx shadcn@latest add button
bunx shadcn@latest add input
bunx shadcn@latest add textarea
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your environment variables
4. Deploy!

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Supabase](https://supabase.com/) - The open source Firebase alternative
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Shadcn/ui](https://ui.shadcn.com/) - Beautiful and accessible UI components

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the [documentation](https://nextjs.org/docs)
- Visit the [Supabase docs](https://supabase.com/docs)

---

**Happy coding!** 🎉

