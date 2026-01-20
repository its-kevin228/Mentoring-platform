// Types partagés entre le frontend et le backend

export enum UserRole {
  STUDENT = 'student',
  MENTOR = 'mentor',
  ADMIN = 'admin'
}

export enum AcademicStatus {
  HIGHSCHOOL = 'lyceen',
  FIRST_YEAR = 'etudiant_l1',
  SECOND_YEAR = 'etudiant_l2',
  THIRD_YEAR = 'etudiant_l3',
  MASTER = 'master',
  PHD = 'doctorat',
  GRADUATED = 'diplome'
}

export enum MentorshipStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface User {
  id: number;
  email: string;
  role: UserRole;
  isVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Profile {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  profilePictureUrl?: string;
  bio?: string;
  phone?: string;
  
  // Academic info
  currentStatus: AcademicStatus;
  institution?: string;
  fieldOfStudy?: string;
  specialization?: string;
  yearOfStudy?: number;
  expectedGraduationYear?: number;
  
  // Mentor specific
  isAvailableForMentoring?: boolean;
  mentoringExperience?: string;
  skills?: string[];
  availability?: string;
  
  createdAt: Date;
  updatedAt: Date;
}

export interface Mentor extends Profile {
  user: User;
  mentorshipCount: number;
  averageRating?: number;
}

export interface Student extends Profile {
  user: User;
  activeMentorships: number;
}

export interface Mentorship {
  id: number;
  mentorId: number;
  studentId: number;
  status: MentorshipStatus;
  requestedAt: Date;
  startedAt?: Date;
  endedAt?: Date;
  goals?: string;
  notes?: string;
  
  // Relations
  mentor?: Mentor;
  student?: Student;
}

export interface Message {
  id: number;
  mentorshipId: number;
  senderId: number;
  content: string;
  isRead: boolean;
  sentAt: Date;
  
  // Relations
  sender?: Profile;
}

export interface Field {
  id: number;
  name: string;
  description?: string;
  category: string;
}

export interface Institution {
  id: number;
  name: string;
  type?: string;
  city?: string;
  website?: string;
}

// Request/Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Auth types
export interface RegisterRequest {
  email: string;
  password: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  currentStatus: AcademicStatus;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  profile: Profile;
  token: string;
}