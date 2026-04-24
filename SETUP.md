# 10 Years Later - SMP 2016 Memories

A modern nostalgic web app celebrating 10 years of friendship since middle school. Built with Next.js, TypeScript, Tailwind CSS, Prisma, and Supabase.

## 🌟 Features

### Core Pages
- **Landing Page** - Hero with floating polaroids and navigation
- **People Page** - Grid of friend profiles with polaroid cards
- **Profile Page** - Individual profile with "Then vs Now" photos
- **Albums Page** - Gallery of events and memories organized by date
- **Album Detail** - Masonry grid of photos with stories
- **Timeline Page** - Visual chronology from 2016 to 2026

### Design System
- **Gen Z Aesthetic** - Soft gradients (purple, pink, blue)
- **Scrapbook Style** - Polaroid cards, asymmetric layouts, grain textures
- **Nostalgic UI** - Rounded corners, soft shadows, smooth animations
- **Responsive** - Mobile-first, works on all devices

### Components
- `PolaroidCard` - Photo cards with hover fade effect
- `AlbumCard` - Event cards with overlay text
- `PersonCard` - Friend profile cards
- `NostalgicButton` - Styled buttons with hover effects
- `NostalgicNavbar` - Glassmorphism navbar
- `FloatingParticles` - Animated background particles

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: Prisma ORM + Supabase PostgreSQL
- **Storage**: Supabase Storage
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod

## 📋 Prerequisites

- Node.js 18+ (with pnpm)
- Supabase account
- PostgreSQL database (via Supabase)

## 🔧 Setup

### 1. Clone and Install

```bash
git clone <repo>
cd altwent
pnpm install
```

### 2. Environment Variables

Create `.env.local` based on the template:

```bash
# Database
DATABASE_URL="postgresql://[user]:[password]@[host]:[port]/[database]"
DIRECT_URL="postgresql://[user]:[password]@[host]:[port]/[database]"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://[project].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[your-anon-key]"
SUPABASE_SERVICE_KEY="[your-service-key]"
```

### 3. Setup Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and API keys
3. Create storage buckets:
   - `memories-photos` - for individual photos
   - `album-covers` - for album cover images

### 4. Database Setup

```bash
# Run migrations
pnpm dlx prisma migrate dev

# Generate Prisma Client
pnpm dlx prisma generate

# (Optional) Seed database
pnpm dlx prisma db seed
```

### 5. Start Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000`

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   ├── users/          # User endpoints
│   │   └── albums/         # Album endpoints
│   ├── people/             # People grid & profile pages
│   ├── albums/             # Album listing & detail pages
│   ├── timeline/           # Timeline visualization
│   ├── globals.css         # Global styles + nostalgic theme
│   └── layout.tsx          # Root layout
├── components/
│   ├── nostalgic/          # Custom nostalgic components
│   │   ├── polaroid-card.tsx
│   │   ├── album-card.tsx
│   │   ├── person-card.tsx
│   │   ├── navbar.tsx
│   │   ├── button.tsx
│   │   ├── floating-particles.tsx
│   │   └── index.ts
│   └── ui/                 # shadcn UI components
├── lib/
│   ├── db.ts              # Prisma client singleton
│   ├── supabase.ts        # Supabase clients
│   └── utils.ts           # Helper utilities
├── types/
│   └── index.ts           # TypeScript types
├── prisma/
│   └── schema.prisma      # Database schema
└── env.ts                 # Environment variables validation
```

## 📊 Database Schema

### User
- Personal info (name, bio, location)
- Then/Now photos
- Personal quote & message for friends
- Timestamps

### Album
- Title & description (story)
- Event date & cover image
- Relations to photos & participants

### Photo
- Image URL (from Supabase Storage)
- Caption
- Owner user
- Relations to albums

### AlbumPhoto (Junction)
- Connects photos to albums

### AlbumParticipant (Junction)
- Connects users to albums

### Message
- Personal messages from friends with timestamps

## 🎨 Design Tokens

### Colors
- **Primary Gradient**: Purple → Pink → Blue
- **Background**: Orange-50 / Purple-50 / Blue-50
- **Accents**: Pink-500, Purple-600, Blue-500

### Spacing
- **Border Radius**: 2xl (16px) for cards, full for buttons
- **Gap**: 8px base unit
- **Padding**: 4-8px for cards

### Typography
- **Display Font**: Fredoka (playful)
- **Serif Playful**: Caveat (handwriting)
- **Size Scale**: Balanced for mobile & desktop

## 🌐 API Endpoints

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create user
- `GET /api/users/[id]` - Get specific user
- `PUT /api/users/[id]` - Update user

### Albums
- `GET /api/albums` - Get all albums
- `POST /api/albums` - Create album
- `GET /api/albums/[id]` - Get album with photos
- `PUT /api/albums/[id]` - Update album

## 🔐 Security

- Supabase Row Level Security (RLS) enabled
- Public read access for memories
- Admin-only write operations
- Environment variables for sensitive keys
- No client-side secrets exposed

## 📱 Responsive Design

- **Mobile** (320px+) - Single column, optimized touch
- **Tablet** (640px+) - 2-column grid
- **Desktop** (1024px+) - 3-4 column grid
- **Masonry** - Adaptive layout for images

## 🚢 Deployment

### Vercel (Recommended)

```bash
pnpm run build
git push
# Push to GitHub and connect to Vercel
```

### Manual Deployment

```bash
# Build
pnpm run build

# Run migrations in production
DATABASE_URL="your-production-url" pnpm dlx prisma migrate deploy

# Start
NODE_ENV=production pnpm start
```

## 🛠️ Available Scripts

```bash
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm check            # Run code quality checks
pnpm format           # Format code
pnpm type-check       # TypeScript checks
```

## 🎭 Customization

### Add More Friends
1. Navigate to `/api/users` endpoint
2. Create user with POST request
3. Upload photos to Supabase Storage
4. User appears on People page

### Create Albums
1. POST to `/api/albums` with event data
2. Upload photos to Storage
3. Link photos to album via AlbumPhoto junction table
4. Album appears in listings and timeline

### Styling
- Edit `app/globals.css` for nostalgic theme
- Update Tailwind colors in `tailwind.config.ts`
- Modify `components/nostalgic/*` for design changes

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)

## 📝 License

MIT - Feel free to use this project for your own memory celebrations!

## 💝 Contributing

This project celebrates friendship and memories. Contributions, suggestions, and bug reports are welcome!

---

**Made with ❤️ for 10 years of friendship**
