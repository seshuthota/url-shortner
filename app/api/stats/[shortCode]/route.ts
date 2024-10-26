import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { UrlMapping } from '@/models/UrlMapping';

export async function GET(
  request: Request,
  { params }: { params: { shortCode: string } }
) {
  try {
    const { shortCode } = params;

    await connectToDatabase();

    const urlMapping = await UrlMapping.findOne({ shortCode });

    if (!urlMapping) {
      return NextResponse.json({ error: 'Short URL not found' }, { status: 404 });
    }

    const stats = {
      originalUrl: urlMapping.originalUrl,
      shortCode: urlMapping.shortCode,
      clicks: urlMapping.clicks,
      createdAt: urlMapping.createdAt,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error retrieving URL statistics:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

