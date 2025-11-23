import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

const countriesFilePath = path.join(process.cwd(), 'data', 'countries.json');

export async function GET() {
  try {
    const fileContents = fs.readFileSync(countriesFilePath, 'utf8');
    const countries = JSON.parse(fileContents);
    return NextResponse.json(countries);
  } catch (error) {
    return NextResponse.json({ error: 'Error reading countries' }, { status: 500 });
  }
}