import { ObjectId } from "mongodb";

export interface BlogPost {
  _id?: ObjectId;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Tournament {
  _id?: ObjectId;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  entryFee: string;
  status: "upcoming" | "ongoing" | "completed";
  featured: boolean;
  registrationOpen: boolean;
  registrationFormId?: string;
  ageCategories: string[];
  prizes: string;
  logo: string;
  pdfUrl: string;
  whatsappLink: string;
  registrationLink: string;
  venueMapLink: string;
  createdAt: string;
  updatedAt: string;
}

export interface Player {
  _id?: ObjectId;
  name: string;
  photo: string;
  title: string;
  titleShort: string;
  subtitle: string;
  standard: number | null;
  rapid: number | null;
  blitz: number | null;
  fideId: string;
  arenaProfileUrl: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Coach {
  _id?: ObjectId;
  name: string;
  photo: string;
  title: string;
  rating: string;
  email: string;
  phone: string;
  external: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface RegistrationForm {
  _id?: ObjectId;
  title: string;
  tournamentId: string;
  tournamentTitle: string;
  fields: FormField[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FormField {
  id: string;
  label: string;
  type: "text" | "email" | "phone" | "number" | "select" | "textarea" | "date";
  required: boolean;
  options?: string[];
  placeholder?: string;
}

export interface RegistrationSubmission {
  _id?: ObjectId;
  formId: string;
  formTitle: string;
  tournamentTitle: string;
  data: Record<string, string>;
  submittedAt: string;
}
