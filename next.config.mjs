/** @type {import('next').NextConfig} */
const isCapacitorExport = process.env.IS_CAPACITOR === 'true' && process.env.npm_lifecycle_event === 'build';

const nextConfig = {
  reactStrictMode: true,
  // Solo activar exportación estática durante el build de producción para Capacitor
  ...(isCapacitorExport ? { output: 'export' } : {}),
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
