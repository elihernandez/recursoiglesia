/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['mtracks.azureedge.net', 'm.media-amazon.com', 'ik.imagekit.io', 'files.sundaysocial.tv'],
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    typescript: {
        ignoreBuildErrors: true
    },
    productionBrowserSourceMaps: true
}

module.exports = nextConfig
