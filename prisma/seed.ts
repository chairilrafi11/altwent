// Prisma seed script - only runs with pnpm db:seed
require('dotenv/config');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || process.env.DIRECT_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database with example data...');

  // Clear existing data
  await prisma.albumPhoto.deleteMany();
  await prisma.albumParticipant.deleteMany();
  await prisma.photo.deleteMany();
  await prisma.album.deleteMany();
  await prisma.message.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Chairil',
        nickname: 'The Storyteller',
        bio: 'Photography enthusiast, coffee lover, eternal optimist',
        zodiac: 'Scorpio',
        hobby: 'Photography',
        favoriteFood: 'Nasi Goreng',
        location: 'Jakarta, Indonesia',
        photoNow: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        photoThen: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
        personalQuote: 'Ten years ago, I never imagined how much our friendship would mean to me today.',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Rara',
        nickname: 'Forever Cheerful',
        bio: 'Singer, dreamer, spreads joy wherever I go',
        zodiac: 'Leo',
        hobby: 'Singing',
        favoriteFood: 'Mie Ayam',
        location: 'Bandung, Indonesia',
        photoNow: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
        photoThen: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
        personalQuote: 'Friendship is having someone who believes in you when you stop believing in yourself.',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Dita',
        nickname: 'The Adventurer',
        bio: 'Always seeking new adventures and experiences',
        zodiac: 'Sagittarius',
        hobby: 'Traveling',
        favoriteFood: 'Sushi',
        location: 'Surabaya, Indonesia',
        photoNow: 'https://images.unsplash.com/photo-1517070213202-1e1b37765cbd?w=400&h=400&fit=crop',
        photoThen: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
        personalQuote: 'Life is an adventure. Best lived with the right people by your side.',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Aisya',
        nickname: 'The Artist',
        bio: 'Creating beauty through art, one stroke at a time',
        zodiac: 'Libra',
        hobby: 'Drawing',
        favoriteFood: 'Satay',
        location: 'Yogyakarta, Indonesia',
        photoNow: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
        photoThen: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
        personalQuote: 'True friends are like stars that guide you through the darkest nights.',
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} users`);

  // Create albums
  const albums = await Promise.all([
    prisma.album.create({
      data: {
        title: 'SMP Days - 2016',
        description: 'Where it all began. Our first moments together as a friend group.',
        eventDate: new Date('2016-06-15'),
        coverImage: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=600&fit=crop',
      },
    }),
    prisma.album.create({
      data: {
        title: 'High School Adventures',
        description: 'The golden years of laughter, growth, and unforgettable moments.',
        eventDate: new Date('2018-09-10'),
        coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=600&fit=crop',
      },
    }),
    prisma.album.create({
      data: {
        title: 'Summer Trip 2022 - Bali',
        description: 'A week-long adventure to Bali. Sun, sea, and sisterhood.',
        eventDate: new Date('2022-07-01'),
        coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
      },
    }),
    prisma.album.create({
      data: {
        title: 'Reunion 2024',
        description: 'After years apart, we finally got together again.',
        eventDate: new Date('2024-12-25'),
        coverImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=600&fit=crop',
      },
    }),
  ]);

  console.log(`✅ Created ${albums.length} albums`);

  // Create photos
  const photos = await Promise.all([
    prisma.photo.create({
      data: {
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
        caption: 'Beach sunset in Bali',
        userId: users[0].id,
      },
    }),
    prisma.photo.create({
      data: {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=600&fit=crop',
        caption: 'All of us together',
        userId: users[1].id,
      },
    }),
    prisma.photo.create({
      data: {
        url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop',
        caption: 'Group photo adventure',
        userId: users[2].id,
      },
    }),
    prisma.photo.create({
      data: {
        url: 'https://images.unsplash.com/photo-1506704720897-c6b0b8ef6dba?w=500&h=500&fit=crop',
        caption: 'Road trip memories',
        userId: users[3].id,
      },
    }),
  ]);

  console.log(`✅ Created ${photos.length} photos`);

  // Link photos to albums
  await Promise.all([
    prisma.albumPhoto.create({
      data: {
        albumId: albums[2].id,
        photoId: photos[0].id,
      },
    }),
    prisma.albumPhoto.create({
      data: {
        albumId: albums[2].id,
        photoId: photos[1].id,
      },
    }),
    prisma.albumPhoto.create({
      data: {
        albumId: albums[3].id,
        photoId: photos[2].id,
      },
    }),
    prisma.albumPhoto.create({
      data: {
        albumId: albums[3].id,
        photoId: photos[3].id,
      },
    }),
  ]);

  console.log(`✅ Linked photos to albums`);

  // Add users to albums as participants
  await Promise.all(
    albums.map((album) =>
      Promise.all(
        users.map((user) =>
          prisma.albumParticipant.create({
            data: {
              albumId: album.id,
              userId: user.id,
            },
          })
        )
      )
    )
  );

  console.log(`✅ Added users as album participants`);

  // Create some messages
  await Promise.all([
    prisma.message.create({
      data: {
        content: 'To all my best friends: Thank you for being the constant in my life. Here\'s to 10 more years of adventures!',
        userId: users[0].id,
      },
    }),
    prisma.message.create({
      data: {
        content: 'This friendship means the world to me. I\'m so grateful for every memory we\'ve created together.',
        userId: users[1].id,
      },
    }),
    prisma.message.create({
      data: {
        content: 'I love you guys so much! Let\'s make more unforgettable memories together.',
        userId: users[2].id,
      },
    }),
    prisma.message.create({
      data: {
        content: 'Best friends forever! No matter where life takes us, we\'ll always have each other.',
        userId: users[3].id,
      },
    }),
  ]);

  console.log(`✅ Created messages from users`);

  console.log('🎉 Database seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
