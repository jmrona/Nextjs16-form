import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

const interestsFilePath = path.join(process.cwd(), 'data', 'interests.json');

export async function GET(): Promise<NextResponse> {
  try {
    const fileContents = fs.readFileSync(interestsFilePath, 'utf8');
    const interests = JSON.parse(fileContents);

    return NextResponse.json(interests);
  } catch (error) {
    return NextResponse.json({ error: 'Error reading interests' }, { status: 500 });
  }
}