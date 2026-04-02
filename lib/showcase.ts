export interface ShowcaseItem {
  id: string;
  category: "design-magazines" | "photos" | "photography" | "reels" | "videography";
  title: string;
  description: string;
  type: "image" | "video" | "document";
  placeholder: true;
  aspectRatio: "16/9" | "9/16" | "4/5" | "1/1" | "3/4";
  href?: string;
}

export const showcaseCategories = [
  { id: "design-magazines", label: "Magazines" },
  { id: "photos", label: "Design Art" },
  { id: "photography", label: "Photography" },
  { id: "reels", label: "Reels" },
  { id: "videography", label: "Videography" },
] as const;

export const showcaseItems: ShowcaseItem[] = [
  { id: "dm-01", category: "design-magazines", title: "REECE AI", description: "Presentation document", type: "document", placeholder: true, aspectRatio: "3/4", href: "/showcase/magazines/mag-01-reece-ai.pptx" },
  { id: "dm-02", category: "design-magazines", title: "Movie Poster", description: "Magazine/Poster PDF", type: "document", placeholder: true, aspectRatio: "3/4", href: "/showcase/magazines/mag-02-movie-poster.pdf" },
  { id: "dm-03", category: "design-magazines", title: "GDS Final", description: "Magazine document", type: "document", placeholder: true, aspectRatio: "4/5", href: "/showcase/magazines/mag-03-gds-final.pdf" },
  { id: "dm-04", category: "design-magazines", title: "TeamBBC Plaksha", description: "Magazine document", type: "document", placeholder: true, aspectRatio: "3/4", href: "/showcase/magazines/mag-04-teambbc.pdf" },
  { id: "dm-05", category: "design-magazines", title: "Plaksha MUN & Debate", description: "Magazine document", type: "document", placeholder: true, aspectRatio: "3/4", href: "/showcase/magazines/mag-05-plaksha-mun.pdf" },
  { id: "dm-06", category: "design-magazines", title: "World of AI", description: "Magazine document", type: "document", placeholder: true, aspectRatio: "4/5", href: "/showcase/magazines/mag-06-world-of-ai.pdf" },
  { id: "ph-01", category: "photos", title: "Photo 01", description: "Photography work", type: "image", placeholder: true, aspectRatio: "4/5" },
  { id: "ph-02", category: "photos", title: "Photo 02", description: "Photography work", type: "image", placeholder: true, aspectRatio: "1/1" },
  { id: "ph-03", category: "photos", title: "Photo 03", description: "Photography work", type: "image", placeholder: true, aspectRatio: "16/9" },
  { id: "ph-04", category: "photos", title: "Photo 04", description: "Photography work", type: "image", placeholder: true, aspectRatio: "4/5" },
  { id: "ph-05", category: "photos", title: "Photo 05", description: "Photography work", type: "image", placeholder: true, aspectRatio: "3/4" },
  { id: "ph-06", category: "photos", title: "Photo 06", description: "Photography work", type: "image", placeholder: true, aspectRatio: "1/1" },
  { id: "ep-01", category: "photography", title: "Portrait 01", description: "Editorial photography", type: "image", placeholder: true, aspectRatio: "3/4" },
  { id: "ep-02", category: "photography", title: "Portrait 02", description: "Editorial photography", type: "image", placeholder: true, aspectRatio: "4/5" },
  { id: "ep-03", category: "photography", title: "Portrait 03", description: "Editorial photography", type: "image", placeholder: true, aspectRatio: "3/4" },
  { id: "ep-04", category: "photography", title: "Portrait 04", description: "Editorial photography", type: "image", placeholder: true, aspectRatio: "1/1" },
  { id: "re-01", category: "reels", title: "Reel 01", description: "Short-form video", type: "video", placeholder: true, aspectRatio: "9/16" },
  { id: "re-02", category: "reels", title: "Reel 02", description: "Short-form video", type: "video", placeholder: true, aspectRatio: "9/16" },
  { id: "re-03", category: "reels", title: "Reel 03", description: "Short-form video", type: "video", placeholder: true, aspectRatio: "9/16" },
  { id: "re-04", category: "reels", title: "Reel 04", description: "Short-form video", type: "video", placeholder: true, aspectRatio: "9/16" },
  { id: "vi-01", category: "videography", title: "Video Production 01", description: "Videography work", type: "video", placeholder: true, aspectRatio: "16/9" },
  { id: "vi-02", category: "videography", title: "Video Production 02", description: "Videography work", type: "video", placeholder: true, aspectRatio: "16/9" },
  { id: "vi-03", category: "videography", title: "Video Production 03", description: "Videography work", type: "video", placeholder: true, aspectRatio: "16/9" },
  { id: "vi-04", category: "videography", title: "Video Production 04", description: "Videography work", type: "video", placeholder: true, aspectRatio: "16/9" },
];
