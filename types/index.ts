// Type definitions for the app
// Note: These are intentionally separated from Prisma types for flexibility

export interface User {
  id: string;
  name: string;
  nickname?: string;
  bio?: string;
  zodiac?: string;
  hobby?: string;
  favoriteFood?: string;
  location?: string;
  photoNow?: string;
  photoThen?: string;
  personalQuote?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Photo {
  id: string;
  url: string;
  caption?: string;
  userId?: string;
  createdAt?: Date;
}

export interface Album {
  id: string;
  title: string;
  description?: string;
  eventDate?: Date;
  coverImage?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Message {
  id: string;
  content: string;
  userId: string;
  createdAt?: Date;
}

export interface UserWithPhotos extends User {
  photos?: Photo[];
  messages?: Message[];
}

export interface AlbumWithPhotos extends Album {
  photos?: AlbumPhoto[];
  participants?: UserAlbumParticipant[];
}

export interface PhotoWithAlbums extends Photo {
  albums?: AlbumPhoto[];
}

export interface UserAlbumParticipant {
  id: string;
  albumId: string;
  userId: string;
  user?: User;
}

export interface AlbumPhoto {
  id: string;
  albumId: string;
  photoId: string;
  photo?: Photo;
}

export interface NostalgicUITheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}
