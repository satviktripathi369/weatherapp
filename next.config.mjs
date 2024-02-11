// Using ES6 export syntax

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['images.unsplash.com', 'openweathermap.org', 'media.istockphoto.com', 'static.vecteezy.com'],
    },
  };
  
  export default nextConfig;
  