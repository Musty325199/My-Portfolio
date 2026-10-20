import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mustapha Lawal — Full-Stack Developer",
    short_name: "Musty Portfolio",
    description: "Full-stack developer (MERN & Next.js) in Lagos building real-time apps.",
    start_url: "/",
    display: "standalone",
    background_color: "#0E0D0B",
    theme_color: "#0E0D0B",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "32x32",
        type: "image/x-icon",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
