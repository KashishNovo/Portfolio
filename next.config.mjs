/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: works on Vercel, Netlify and GitHub Pages
  output: "export",
  images: { unoptimized: true },
  // Exports /work/hellotrade/index.html so case-study URLs work on any static host
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
