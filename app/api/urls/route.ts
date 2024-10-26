import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { UrlMapping } from '@/models/UrlMapping';

export async function GET() {
  try {
    await connectToDatabase();
    const urls = await UrlMapping.find().sort({ createdAt: -1 }).limit(10);
    return NextResponse.json(urls);
  } catch (error) {
    console.error('Error fetching URLs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
