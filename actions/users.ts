"use server";

import { insertUser } from '@/lib/insertUser';
import { validations } from '@/validations';
import { updateTag } from 'next/cache';
import {z} from 'zod';

export type User = z.infer<typeof validations.user> & { id: string };
export type FormState = {
  data: {
    fullname: string;
    age: string;
    country: string;
    interests: string[];
  }
  success?: boolean;
  errors: Record<string, string[]>;
}

export const submitUser = async (prevState: FormState, formData: FormData) => {
  const fullname = formData.get('fullname') as string;
  const age = formData.get('age') as string;
  const country = formData.get('country') as string;
  const interests = formData.getAll('interests') as string[];


  const validatedUser = validations.user.safeParse({
    fullname,
    age,
    country,
    interests
  })

  if (!validatedUser.success) {
    const validationErrors = z.flattenError(validatedUser.error);
    return {
      success: false,
      errors: validationErrors.fieldErrors,
      data: {
        fullname,
        age,
        country,
        interests
      }
    };
  }

  const userData = validatedUser.data;

  try {
    
    await insertUser({
      id: crypto.randomUUID(),
      ...userData
    });

    updateTag('users');
    
    return {
      success: true,
      errors: {},
      data: {
        fullname: "",
        age: "",
        country: "",
        interests: []
      }
    };
  } catch (error) {
    return {
      success: false,
      errors: { general: ['An unexpected error occurred. Please try again.'] },
      data: {
        fullname,
        age,
        country,
        interests
      }
    };
  }
}