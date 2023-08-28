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
};

module.exports = nextConfig;
