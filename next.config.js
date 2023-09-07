/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        styledComponents: {
            displayName: true,
            fileName: false,
        },
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

module.exports = nextConfig;
