import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { UrlMapping } from '@/models/UrlMapping';

export async function GET(
  request: Request,
  { params }: { params: { shortCode: string } }
) {
  try {
    const shortCode = params.shortCode;

    await connectToDatabase();

    const urlMapping = await UrlMapping.findOne({ shortCode });

    if (!urlMapping) {
      return NextResponse.json({ error: 'Short URL not found' }, { status: 404 });
    }

    return NextResponse.redirect(urlMapping.originalUrl);
  } catch (error) {
    console.error('Error in /api/[shortCode]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
