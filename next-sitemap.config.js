/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://18design.vn",
    generateRobotsTxt: true,
    changefreq: "daily",
    priority: 0.7,
    sitemapSize: 5000,
    exclude: ["/sitemap-18design.xml"],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/danh-muc/[category]",
                    "/chi-tiet/[slug]",
                    "/san-pham/[tag]",
                    "/san-pham/chi-tiet/[slug]",
                ],
            },
        ],
        additionalSitemaps: ["https://18design.vn/sitemap-18design.xml"],
    },
};
