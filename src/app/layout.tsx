import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'StreamHub - Streaming en Vivo y Películas HD',
  description: 'Plataforma de streaming en vivo y bajo demanda inspirada en Magis TV. Canales en directo, películas y series en alta definición.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'StreamHub',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0a0d14',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="bg-background text-gray-100 min-h-screen antialiased selection:bg-brand selection:text-white">
        {children}
      </body>
    </html>
  );
}
