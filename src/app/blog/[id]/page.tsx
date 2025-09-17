
import { blogPosts } from '@/lib/blog-posts';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find((p) => p.id === params.id);

  if (!post || !post.content) {
    notFound();
  }

  const image = PlaceHolderImages.find((img) => img.id === post.imageId);

  return (
    <div className="p-4 md:p-6 space-y-8">
      <article className="prose prose-lg mx-auto dark:prose-invert bg-card p-6 md:p-8 rounded-2xl shadow-lg">
        {image && (
          <Image
            src={image.imageUrl}
            alt={post.title}
            width={800}
            height={400}
            className="w-full rounded-lg mb-8 object-cover max-h-96"
            data-ai-hint={image.imageHint}
          />
        )}
        <h1 className="text-4xl font-bold tracking-tight text-foreground">{post.title}</h1>
        <div 
            className="text-muted-foreground whitespace-pre-wrap leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
        />
      </article>
    </div>
  );
}

// Optional: Generate static pages for each blog post for better SEO
export async function generateStaticParams() {
  return blogPosts.filter(post => post.content).map((post) => ({
    id: post.id,
  }));
}

    