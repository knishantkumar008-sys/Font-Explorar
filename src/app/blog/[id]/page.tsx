
import { blogPosts } from '@/lib/blog-posts';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find((p) => p.id === params.id);

  if (!post || !post.content) {
    notFound();
  }

  const image = PlaceHolderImages.find((img) => img.id === post.imageId);

  return (
    <div className="p-4 md:p-6 space-y-8">
      <Card className="overflow-hidden rounded-2xl shadow-lg">
        {image && (
          <Image
            src={image.imageUrl}
            alt={post.title}
            width={800}
            height={400}
            className="w-full rounded-t-lg object-cover max-h-80"
            data-ai-hint={image.imageHint}
          />
        )}
        <article className="prose prose-lg max-w-none dark:prose-invert p-6 md:p-8 prose-h2:font-bold prose-h2:text-3xl prose-h3:font-bold prose-h3:text-2xl prose-p:my-4 prose-ul:my-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">{post.title}</h1>
          <div 
              className="text-muted-foreground whitespace-pre-wrap leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </Card>
    </div>
  );
}

// Optional: Generate static pages for each blog post for better SEO
export async function generateStaticParams() {
  return blogPosts.filter(post => post.content).map((post) => ({
    id: post.id,
  }));
}
