/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['dl.airtable.com', 'images.pexels.com'],
  },
  env: {
    AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
    AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID,
  },
}

module.exports = nextConfig