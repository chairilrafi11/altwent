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
  spotifyTrackUrl?: string;
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
  photos?: AlbumPhoto[];
  participants?: UserAlbumParticipant[];
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

// Extended types for pages
export interface UserWithRelations extends User {
  photos?: Photo[];
  messages?: Message[];
  albumParticipants?: AlbumParticipantWithAlbum[];
}

export interface AlbumParticipantWithAlbum extends UserAlbumParticipant {
  album?: Album;
}

// Component Props
export interface NostalgicButtonProps extends React.PropsWithChildren {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export interface ProfilePageProps {
  params: Promise<{
    id: string;
  }>;
}

export interface AlbumDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

// UI Configuration Types
export interface NavigationCard {
  title: string;
  description: string;
  href: string;
  emoji: string;
}

export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  emoji: string;
}

export interface PolaroidCardProps {
  image: string;
  caption?: string;
  rotation?: number;
  alt?: string;
  onClick?: () => void;
  hoverImage?: string;
  layoutId?: string;
}

export interface PersonCardProps {
  user: User;
}

export interface NavbarProps {
  className?: string;
}

export interface AlbumCardProps {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  eventDate?: Date;
  participantCount?: number;
}
