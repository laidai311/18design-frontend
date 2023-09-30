// require("dotenv").config();

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
    env: {
        API_URL: process.env.NEXT_PUBLIC_API_URL,
        SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
        SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
        USER_NAME: process.env.NEXT_PUBLIC_USER_NAME,
        USER_PASSWORD: process.env.NEXT_PUBLIC_USER_PASSWORD,
        FORM_API_KEY: process.env.NEXT_PUBLIC_FORM_API_KEY,
        FORM_API_SECRET: process.env.NEXT_PUBLIC_FORM_API_SECRET,
    },
};

module.exports = nextConfig;
