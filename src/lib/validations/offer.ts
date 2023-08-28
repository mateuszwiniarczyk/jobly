import {
  EmploymentType,
  ExperienceLevel,
  FlexibleHours,
  JobType,
  OnlineInterview,
  PaidHoliday,
  RemoteOption,
  Skill,
} from '@prisma/client';
import { z } from 'zod';

export const offerSchema = z
  .object({
    position: z
      .string()
      .min(3, {
        message: 'Position must be at least 3 characters long',
      })
      .max(50, {
        message: 'Position must be less than 50 characters long',
      }),
    experienceLevel: z.nativeEnum(ExperienceLevel, {
      invalid_type_error: 'Experience level is required',
    }),
    description: z
      .string()
      .min(3, {
        message: 'Description must be at least 3 characters long',
      })
      .max(150, {
        message: 'Description must be less than 150 characters long',
      }),
    location: z.string().min(3).max(25),
    remoteOption: z.nativeEnum(RemoteOption, {
      invalid_type_error: 'Remote option is required',
    }),
    jobType: z.nativeEnum(JobType, {
      invalid_type_error: 'Job type is required',
    }),
    employmentType: z.nativeEnum(EmploymentType, {
      invalid_type_error: 'Employment type is required',
    }),
    skills: z.array(
      z.nativeEnum(Skill, {
        invalid_type_error: 'Skills are required',
      }),
    ),
    onlineInterview: z.nativeEnum(OnlineInterview, {
      invalid_type_error: 'Online interview option is required',
    }),
    paidHoliday: z.nativeEnum(PaidHoliday, {
      invalid_type_error: 'Paid holiday option is required',
    }),
    flexibleHours: z.nativeEnum(FlexibleHours, {
      invalid_type_error: 'Flexible hours option is required',
    }),
    minSalary: z
      .number()
      .min(100, {
        message: 'Min salary must be at least 100',
      })
      .max(1000000),
    maxSalary: z
      .number()
      .min(0, {
        message: 'Max salary must be at least 0',
      })
      .max(1000000),
    contactEmail: z.string().email({
      message: 'Invalid email',
    }),
    contactPhone: z
      .string()
      .min(9, {
        message: 'Phone number must be at least 9 characters long',
      })
      .max(9, {
        message: 'Phone number must be less than 9 characters long',
      }),
  })
  .refine((data) => data.minSalary < data.maxSalary, {
    message: 'Min Salary must be less than max salary',
    path: ['maxSalary'],
  });
