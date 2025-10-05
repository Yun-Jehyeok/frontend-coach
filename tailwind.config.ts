import type { Config } from "tailwindcss";

export default {
    content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            fontFamily: {
                poppins: ["var(--font-poppins)"],
                dmsans: ["var(--font-dm-sans)"],
            },
            boxShadow: {
                dropshadow: "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
            },
        },
    },
    plugins: [],
} satisfies Config;
