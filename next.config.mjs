const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // For static export
  },
  output: 'export', // Static site generation for Cloudflare Pages
  // Disable server components for Cloudflare compatibility
  experimental: {
    appDir: true,
  },
  // Ensure trailing slashes for better compatibility
  trailingSlash: true,
}

export default nextConfig
