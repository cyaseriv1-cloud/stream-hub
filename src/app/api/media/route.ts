import { NextResponse } from 'next/server';
import { ALL_MEDIA_ITEMS } from '@data/mockData';

// Permite la exportación estática para compilación de APK en Capacitor
export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json({
    total: ALL_MEDIA_ITEMS.length,
    data: ALL_MEDIA_ITEMS,
  });
}
