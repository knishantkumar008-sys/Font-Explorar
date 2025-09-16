
export type BlogPost = {
  id: string;
  title: string;
  description: string;
  category: 'Font Blog' | 'Trending News';
  imageId: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Psychology of Fonts: How Typefaces Influence Perception',
    description: 'Explore how different font styles can evoke specific emotions and influence how your audience perceives your message.',
    category: 'Font Blog',
    imageId: 'blog-psychology',
  },
  {
    id: '2',
    title: '5 Tips for Perfect Font Pairing',
    description: 'Learn the art of combining fonts to create a harmonious and professional look for your social media profiles and designs.',
    category: 'Font Blog',
    imageId: 'blog-pairing',
  },
  {
    id: '3',
    title: 'The Rise of Fancy Text in Social Media',
    description: 'A deep dive into why unique and stylish fonts have become a major trend for creators and brands on social platforms.',
    category: 'Font Blog',
    imageId: 'blog-social-media',
  },
  {
    id: '4',
    title: 'Design Trends to Watch This Year',
    description: 'From bold typography to minimalist layouts, discover the top design trends that are shaping the digital landscape.',
    category: 'Trending News',
    imageId: 'blog-trends',
  },
  {
    id: '5',
    title: 'Creating a Strong Visual Identity for Your Brand',
    description: 'Learn how to use fonts, colors, and symbols to build a memorable and consistent brand identity online.',
    category: 'Trending News',
    imageId: 'blog-branding',
  },
];
