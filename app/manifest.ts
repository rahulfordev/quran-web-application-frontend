import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tarteel Reader",
    short_name: "Tarteel",
    description: "A modern Quran reading experience with searchable ayahs and personalized typography settings.",
    start_url: "/",
    display: "standalone",
    background_color: "#fcfaf6",
    theme_color: "#14532d",
    lang: "en",
    orientation: "portrait",
    categories: ["education", "books", "lifestyle"],
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ],
    shortcuts: [
      {
        name: "Search Ayahs",
        short_name: "Search",
        description: "Search the Quran by translation text",
        url: "/search",
        icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }]
      }
    ]
  };
}
