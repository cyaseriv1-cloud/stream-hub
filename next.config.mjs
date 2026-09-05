/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Si se compila para Capacitor/APK, exporta HTML estático a /out
  ...(process.env.IS_CAPACITOR === 'true' ? { output: 'export' } : {}),
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
