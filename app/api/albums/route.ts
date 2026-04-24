import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const albums = await prisma.album.findMany({
      include: {
        _count: {
          select: { photos: true, participants: true },
        },
      },
      orderBy: {
        eventDate: 'desc',
      },
    });

    return NextResponse.json(albums);
  } catch (error) {
    console.error('Error fetching albums:', error);
    return NextResponse.json(
      { error: 'Failed to fetch albums' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, eventDate, coverImage } = body;

    const album = await prisma.album.create({
      data: {
        title,
        description: description || null,
        eventDate: eventDate ? new Date(eventDate) : null,
        coverImage: coverImage || null,
      },
    });

    return NextResponse.json(album, { status: 201 });
  } catch (error) {
    console.error('Error creating album:', error);
    return NextResponse.json(
      { error: 'Failed to create album' },
      { status: 500 }
    );
  }
}
