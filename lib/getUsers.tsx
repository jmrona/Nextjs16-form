import fs from 'fs/promises';
import path from 'path';
import { type User } from '@/actions/users';
import { cacheLife, cacheTag } from 'next/cache';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'users.json');

export const getUsers = async () => {
  "use cache"

  cacheTag('users');
  cacheLife('hours');

  try {
    const data = await fs.readFile(DATA_FILE_PATH, 'utf-8');

    const users = JSON.parse(data) as User[];
    return users;
  } catch (error) {
    console.error("Error reading users:", error);
    return [];
  }
}