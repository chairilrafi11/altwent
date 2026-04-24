# Customization Guide - 10 Years Later

Quick reference for common customizations to make the app your own.

## 🎨 Styling & Theme

### Change Color Scheme
Edit `app/globals.css`:
```css
/* Primary gradient colors */
from-purple-600 via-pink-500 to-blue-500

/* Change to your colors, e.g., teal-orange-pink: */
from-teal-600 via-orange-500 to-pink-500
```

### Modify Background Gradient
Edit `app/layout.tsx`, `className`:
```tsx
// Current
from-orange-50 via-purple-50 to-blue-50

// Try
from-rose-50 via-amber-50 to-yellow-50
```

### Custom Fonts
Edit `app/globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap');
```

## 👥 Update Site Copy

### Title & Metadata
Edit `app/layout.tsx`:
```tsx
export const metadata: Metadata = {
  title: "Your Custom Title",
  description: "Your custom description",
};
```

### Landing Page Text
Edit `app/page.tsx`:
```tsx
<h1>Your Title</h1>
<p>Your subtitle and story</p>
```

### Navigation Card Copy
Edit `app/page.tsx`, `navigationCards` array:
```tsx
{
  title: 'Your Custom Title',
  description: 'Your description',
  href: '/your-path',
  emoji: '📍',
}
```

## 🖼️ Images & Media

### Replace Mock Images
Mock images use Unsplash URLs. Replace with your Supabase URLs:

1. Upload photo to Supabase Storage
2. Get public URL from Supabase console
3. Replace in component/page files

Example:
```tsx
// Before
photoNow: 'https://images.unsplash.com/photo-xxx'

// After
photoNow: 'https://xxxxx.supabase.co/storage/v1/object/public/memories-photos/chairil-2026.jpg'
```

## 👫 Add Real Users

### Via API

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Friend Name",
    "nickname": "Cool Nickname",
    "bio": "Their bio",
    "zodiac": "Pisces",
    "hobby": "Photography",
    "favoriteFood": "Sushi",
    "location": "City, Country",
    "photoNow": "https://...",
    "photoThen": "https://...",
    "personalQuote": "Their quote"
  }'
```

### Via Database Seed
Edit `prisma/seed.ts`, add to users array, then run:
```bash
pnpm db:seed
```

## 📸 Add Photos

### Via API

```bash
curl -X POST http://localhost:3000/api/photos \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://...",
    "caption": "Photo caption",
    "userId": "user-id"
  }'
```

## 🎞️ Create Albums

### Via API

```bash
curl -X POST http://localhost:3000/api/albums \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Album Title",
    "description": "Story about this event",
    "eventDate": "2022-06-15",
    "coverImage": "https://..."
  }'
```

### Link Photos to Album

Create entry in `AlbumPhoto` table:
```sql
INSERT INTO "AlbumPhoto" ("albumId", "photoId")
VALUES ('album-id', 'photo-id');
```

## 🎭 Component Customization

### Modify PolaroidCard Size
Edit `components/nostalgic/polaroid-card.tsx`:
```tsx
style={{
  width: '240px',      // Change this
  aspectRatio: '3/4',  // Or this
}}
```

### Change Button Variants
Edit `components/nostalgic/button.tsx`:
```tsx
const variantStyles = {
  primary: 'your-tailwind-classes',
  secondary: 'your-tailwind-classes',
  ghost: 'your-tailwind-classes',
};
```

### Customize Particle Animation
Edit `components/nostalgic/floating-particles.tsx`:
```tsx
const particleCount = 30;  // More/less particles
const particle = {
  speedX: Math.random() * 0.5 - 0.25,  // Faster/slower
  opacity: Math.random() * 0.5 + 0.2,  // Brighter/dimmer
};
```

## 📄 Page Layout Tweaks

### Change Grid Columns
Edit any page with `grid-cols-*`:
```tsx
// 4 columns on desktop
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"

// Change to 3 columns
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
```

### Adjust Spacing
Edit any section with `gap-*`, `py-*`, `px-*`:
```tsx
// Current
className="gap-8 py-20 px-4"

// More spacing
className="gap-12 py-32 px-6"

// Less spacing
className="gap-4 py-12 px-2"
```

### Change Animation Duration
Edit any motion component's `transition`:
```tsx
// Current
transition={{ duration: 0.5 }}

// Faster
transition={{ duration: 0.2 }}

// Slower
transition={{ duration: 1 }}
```

## 🎯 Timeline Customization

Edit `app/timeline/page.tsx`:
- Add/remove years in `timelineEvents` array
- Change event descriptions and emojis
- Modify gradient colors per event

```tsx
{
  year: 2024,
  title: 'Your Event',
  description: 'Event details',
  emoji: '🎉',
  color: 'from-red-400',  // Change color
}
```

## 🔐 Security & Privacy

### Enable Row Level Security (RLS)
In Supabase console:
1. Go to "Authentication" → "Policies"
2. Create policies for public read, authenticated write
3. Example for public read:
```sql
CREATE POLICY "Public read access"
  ON users
  FOR SELECT
  USING (true);
```

### Add Authentication
Install Supabase Auth:
```bash
pnpm add @supabase/auth-helpers-nextjs
```

## 🚀 Deployment Tweaks

### Change App Name
Edit `package.json`:
```json
{
  "name": "your-app-name"
}
```

### Production Environment
Update `.env.production`:
```
DATABASE_URL="your-production-db"
NEXT_PUBLIC_SUPABASE_URL="your-production-url"
```

### Custom Domain
In Vercel dashboard:
1. Project Settings → Domains
2. Add your custom domain
3. Update Supabase CORS settings

## 📱 Mobile Customization

### Adjust Mobile Grid Layout
Edit responsive breakpoint in components:
```tsx
// Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns
className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
```

### Change Mobile Typography
Edit text sizes:
```tsx
// Current
className="text-5xl md:text-6xl"

// More mobile-optimized
className="text-3xl md:text-6xl"
```

## 🔧 API Customization

### Add Authentication to API Routes
Edit `/app/api/users/route.ts`:
```tsx
import { auth } from '@/lib/auth';

export async function POST(request: Request) {
  const session = await auth();
  if (!session) return new Response('Unauthorized', { status: 401 });
  
  // Handle request
}
```

### Add Rate Limiting
Use package like `upstash/ratelimit`:
```bash
pnpm add @upstash/ratelimit
```

## 📊 Database Customization

### Add New Fields to User
Edit `prisma/schema.prisma`:
```prisma
model User {
  // ... existing fields
  instagramHandle  String?
  favoriteMemory   String?
  phone            String?
}
```

Then run:
```bash
pnpm dlx prisma migrate dev --name add_new_fields
```

### Create New Model
Add to schema and migrate:
```prisma
model Reaction {
  id        String @id @default(uuid())
  emoji     String
  photoId   String
  photo     Photo @relation(fields: [photoId], references: [id])
  userId    String
  user      User @relation(fields: [userId], references: [id])
}
```

## 🎬 Animation Tweaks

### Slower Stagger Effect
Edit any `containerVariants`:
```tsx
transition: {
  staggerChildren: 0.2,  // Increase for slower stagger
  delayChildren: 0.3,
}
```

### Change Spring Physics
Edit`itemVariants` transitions:
```tsx
transition: { 
  type: 'spring', 
  stiffness: 100,  // Lower = slower bounce
  damping: 20      // Higher = less bouncy
}
```

### Disable Animations (for performance)
Edit components to use `initial` without `animate`:
```tsx
// Or use prefers-reduced-motion
if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Disable animations
}
```

## 🧪 Testing Customizations Locally

```bash
# Build to catch errors early
pnpm build

# Type check
pnpm dlx tsc --noEmit

# Format code
pnpm format

# Run dev with your changes
pnpm dev
```

## 💡 Pro Tips

1. **Use Tailwind CSS IntelliSense** - VS Code extension for class suggestions
2. **Save color palette** - Create a `colors.ts` file for consistent colors
3. **Component variants** - Use `cva` (class-variance-authority) for button variants
4. **Responsive mobile** - Test with `pnpm dev` and browser DevTools
5. **Dark mode** - Add `dark:` prefixes to enable dark mode support
6. **Animation performance** - Use `transform` and `opacity` for smooth animations
7. **Images** - Optimize with `next/image` for best performance

## 🆘 Common Issues

### Images not showing
- Check Supabase URL is public
- Verify CORS is configured in Supabase
- Check file exists in storage bucket

### API returning 500
- Check `DATABASE_URL` is correct
- Run `pnpm dlx prisma generate`
- Check server logs: `pnpm dev`

### Build failing
- Run `pnpm dlx tsc --noEmit` to check types
- Clear `.next` folder: `rm -rf .next`
- Reinstall: `rm -rf node_modules && pnpm install`

### Animations not smooth
- Check Framer Motion is installed: `pnpm ls framer-motion`
- Verify GPU acceleration: Use `transform` not `left`/`top`

---

**Happy customizing! 🎉**
