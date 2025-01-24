import type { NextConfig } from "next";
const nextConfig: NextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: "https",
                hostname: "placehold.co",
            },
            {
                protocol: "https",
                hostname: 'm.media-amazon.com',
                port: "",
                // pathname: '/images/**'
            },
            {
                protocol: "https",
                hostname: 'ik.imagekit.io',
                port: "",
            },
        ],
    },
    typescript:{
        ignoreBuildErrors: true,
    },
    eslint:{
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;


