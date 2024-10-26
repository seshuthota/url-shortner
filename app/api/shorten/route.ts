import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { nanoid } from 'nanoid';
import { UrlMapping } from '@/models/UrlMapping';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    await connectToDatabase();

    const shortCode = nanoid(8); // Generate a short code
    const newUrlMapping = new UrlMapping({
      originalUrl: url,
      shortCode,
    });

    await newUrlMapping.save();

    return NextResponse.json({ shortCode }, { status: 201 });
  } catch (error) {
    console.error('Error in /api/shorten:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
