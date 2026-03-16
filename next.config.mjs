/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    async redirects() {
        return [
            {
                source: '/week',
                destination: '/the-week-that-wasnt',
                permanent: true,
            },
            {
                source: '/week/:year/:weekNumber',
                destination: '/the-week-that-wasnt/:year/:weekNumber',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
