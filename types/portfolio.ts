export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: "AI/ML" | "Enterprise" | "Backend";
  /** Where it was built, e.g. "Personal project" or "Built at Primesoft · private code". */
  context?: string;
  highlights: string[];
  /** Public source code; omitted for company work that isn't open source. */
  repoUrl?: string;
  liveUrl?: string;
  metrics?: string[];
  architecture?: string[];
}

export interface ExperienceProject {
  name: string;
  description: string;
  technologies: string[];
  responsibilities: string[];
  metrics?: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  /** Company logo under /public/logos, and the company site. */
  logo?: string;
  website?: string;
  /** Logo already has its own background (a filled square icon). */
  logoFill?: boolean;
  /** Intrinsic size of the logo file, so wide wordmarks keep their shape. */
  logoSize?: [number, number];
  role: string;
  duration: string;
  location: string;
  current: boolean;
  projects: ExperienceProject[];
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  /** Issuer logo under /public/logos, with its intrinsic size. */
  logo?: string;
  logoSize?: [number, number];
  status: string;
  inProgress: boolean;
  credentialUrl?: string;
  highlights?: string[];
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  duration: string;
  score: string;
}

export interface MusicArtist {
  name: string;
  /** What they're known for, one short line. */
  known: string;
  spotifyId: string;
  /** Artist photo served by Spotify's image CDN (from Spotify's oEmbed). */
  image: string;
}

export interface GalleryPhoto {
  /** Path under /public, e.g. /images/gallery/hampi.jpg */
  src: string;
  alt: string;
  /** Handwritten caption under the print. */
  caption: string;
  /** Pixel size of the file, so each print keeps its own shape. */
  width: number;
  height: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
}
