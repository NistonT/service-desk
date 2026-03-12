export const GENDER = {
  MALE: "male",
  FEMALE: "female",
} as const;
export type Gender = (typeof GENDER)[keyof typeof GENDER];

export const ADDRESS_TYPE = {
  REGISTRATION: "registration",
  RESIDENCE: "residence",
  TEMPORARY: "temporary",
} as const;
export type AddressType = (typeof ADDRESS_TYPE)[keyof typeof ADDRESS_TYPE];

export const PHONE_TYPE = {
  MOBILE: "mobile",
  HOME: "home",
  WORK: "work",
} as const;
export type PhoneType = (typeof PHONE_TYPE)[keyof typeof PHONE_TYPE];

export const EMAIL_TYPE = {
  PERSONAL: "personal",
  WORK: "work",
} as const;
export type EmailType = (typeof EMAIL_TYPE)[keyof typeof EMAIL_TYPE];

export const EDUCATION_LEVEL = {
  SECONDARY: "secondary",
  VOCATIONAL: "vocational",
  BACHELOR: "bachelor",
  MASTER: "master",
  POSTGRADUATE: "postgraduate",
} as const;
export type EducationLevel = (typeof EDUCATION_LEVEL)[keyof typeof EDUCATION_LEVEL];

export const EMPLOYMENT_TYPE = {
  FULL_TIME: "full_time",
  PART_TIME: "part_time",
  SELF_EMPLOYED: "self_employed",
  UNEMPLOYED: "unemployed",
  PENSIONER: "pensioner",
  STUDENT: "student",
} as const;
export type EmploymentType = (typeof EMPLOYMENT_TYPE)[keyof typeof EMPLOYMENT_TYPE];

export const NOTE_TYPE = {
  GENERAL: "general",
  IMPORTANT: "important",
  PRIVATE: "private",
  SYSTEM: "system",
} as const;
export type NoteType = (typeof NOTE_TYPE)[keyof typeof NOTE_TYPE];

export interface Address {
  id: string;
  type: AddressType;
  country: string;
  region: string;
  city: string;
  district?: string;
  street: string;
  building: string;
  apartment?: string;
  postalCode: string;
  isActual: boolean;
  comment?: string;
}

export interface Phone {
  id: string;
  type: PhoneType;
  value: string;
  isPrimary: boolean;
  isVerified: boolean;
  comment?: string;
}

export interface Email {
  id: string;
  type: EmailType;
  value: string;
  isPrimary: boolean;
  isVerified: boolean;
  comment?: string;
}

export interface Education {
  id: string;
  level: EducationLevel;
  institutionName: string;
  institutionType: "school" | "college" | "university" | "academy" | "other";
  faculty?: string;
  specialty?: string;
  qualification?: string;
  startDate: string;
  endDate?: string;
  documentNumber?: string;
  documentDate?: string;
  isCurrent: boolean;
  comment?: string;
}

export interface Employment {
  id: string;
  organizationName: string;
  organizationInn?: string;
  position: string;
  department?: string;
  employmentType: EmploymentType;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  salary?: number;
  currency: "RUB" | "USD" | "EUR";
  workSchedule: "full" | "part" | "shift" | "remote";
  address?: string;
  supervisorName?: string;
  supervisorPhone?: string;
  responsibilities?: string;
  comment?: string;
}

export interface Note {
  id: string;
  content: string;
  type: NoteType;
  createdById: string;
  isPinned: boolean;
  tags: string[];
}

export interface Citizen {
  id: string;
  createdAt: string;
  updatedAt: string;

  lastName: string;
  firstName: string;
  middleName?: string;
  fullName: string;
  dateOfBirth: string;
  placeOfBirth?: string;
  gender: Gender;
  age: number;
  inn?: string;
  snils?: string;
  citizenship: string;

  addresses: Address[];

  phones: Phone[];
  emails: Email[];
  preferredContactMethod: "phone" | "email" | "sms" | "messenger";

  educationLevel: EducationLevel;
  educations: Education[];

  employmentType: EmploymentType;
  employments: Employment[];
  currentOrganization?: string;
  currentPosition?: string;

  notes: Note[];

  maritalStatus: "single" | "married" | "divorced" | "widowed";
  hasChildren: boolean;
  childrenCount?: number;
  isPensioner: boolean;
  isDisabled: boolean;
  disabilityGroup?: "1" | "2" | "3";

  status: "active" | "archived" | "pending" | "blocked";
  category: "individual" | "entrepreneur" | "legal_entity";
  isVIP: boolean;
  isBlacklisted: boolean;

  responsibleUserId: string;
  responsibleUserName: string;
  departmentName?: string;

  comment?: string;
  tags: string[];
}

export interface CitizenFilters {
  search?: string;
  status?: string[];
  gender?: string[];
  dateOfBirthFrom?: string;
  dateOfBirthTo?: string;
  createdAtFrom?: string;
  createdAtTo?: string;
  city?: string[];
  employmentType?: string[];
  educationLevel?: string[];
  isVIP?: boolean;
  hasChildren?: boolean;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: keyof Citizen;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
}
