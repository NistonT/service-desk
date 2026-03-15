import { z } from "zod";

export const citizenPersonalSchema = z.object({
  lastName: z.string().min(2, "Фамилия должна быть не менее 2 символов").max(100),
  firstName: z.string().min(2, "Имя должно быть не менее 2 символов").max(100),
  middleName: z.string().max(100).optional(),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), "Некорректная дата"),
  gender: z.enum(["male", "female"]),
  placeOfBirth: z.string().max(200).optional(),
  citizenship: z.string().min(2, "Укажите гражданство"),

  inn: z
    .string()
    .regex(/^\d{10,12}$/, "ИНН должен содержать 10 или 12 цифр")
    .optional(),
  snils: z
    .string()
    .regex(/^\d{3}-\d{3}-\d{3} \d{2}$/, "Некорректный формат СНИЛС")
    .optional(),

  maritalStatus: z.enum(["single", "married", "divorced", "widowed"]),
  hasChildren: z.boolean(),
  childrenCount: z.number().min(0).max(20).optional(),

  isPensioner: z.boolean(),
  isDisabled: z.boolean(),
  disabilityGroup: z.enum(["1", "2", "3"]).optional(),
  isVIP: z.boolean(),
  isBlacklisted: z.boolean(),

  category: z.enum(["individual", "entrepreneur", "legal_entity"]),
  status: z.enum(["active", "archived", "pending", "blocked"]),

  preferredContactMethod: z.enum(["phone", "email", "sms", "messenger"]),

  employmentType: z.enum(["full_time", "part_time", "self_employed", "unemployed", "pensioner", "student"]),
  currentOrganization: z.string().max(200).optional(),
  currentPosition: z.string().max(200).optional(),

  educationLevel: z.enum(["secondary", "vocational", "bachelor", "master", "postgraduate"]),

  comment: z.string().max(2000).optional(),
  tags: z.array(z.string()).optional(),
});

export type CitizenPersonalFormData = z.infer<typeof citizenPersonalSchema>;
