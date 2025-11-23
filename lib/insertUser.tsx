import { User } from "@/actions/users";
import fs from 'node:fs/promises';
import path from 'node:path';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'users.json');

export const insertUser = async (userData: User) => {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    const users = JSON.parse(data) as User[];

    users.push(userData);
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(users, null, 2), 'utf-8');
  } catch (error) {
    console.error("Error inserting user:", error);
    throw new Error('Failed to insert user');
  }
}