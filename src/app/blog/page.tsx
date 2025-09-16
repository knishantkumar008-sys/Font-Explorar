
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/lib/blog-posts';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function BlogPage() {
  const fontPosts = blogPosts.filter((post) => post.category === 'Font Blog');
  const trendingPosts = blogPosts.filter((post) => post.category === 'Trending News');

  const getImage = (id: string) => {
    return PlaceHolderImages.find((img) => img.id === id);
  };

  return (
    <div className="p-4 md:p-6 space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Our Blog</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Welcome to our little corner of the internet! Here, we dive deep into the world of typography and keep you updated on the latest design trends. Whether you're a font fanatic or just looking for some creative inspiration, you've come to the right place.
        </p>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-6">Font Blog</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {fontPosts.map((post) => {
            const image = getImage(post.imageId);
            return (
              <Card key={post.id} className="flex flex-col overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
                {image && (
                  <Image
                    src={image.imageUrl}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                    data-ai-hint={image.imageHint}
                  />
                )}
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{post.description}</p>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button asChild>
                    <Link href="#">Read More</Link>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-6">Trending News</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {trendingPosts.map((post) => {
            const image = getImage(post.imageId);
            return (
              <Card key={post.id} className="flex flex-col overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
                {image && (
                  <Image
                    src={image.imageUrl}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                    data-ai-hint={image.imageHint}
                  />
                )}
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{post.description}</p>
                </CardContent>
                <div className="p-6 pt-0">
                   <Button asChild>
                    <Link href="#">Read More</Link>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
        {trendingPosts.length === 0 && (
            <p className="text-muted-foreground text-center col-span-full">
              More trending topics coming soon!
            </p>
        )}
      </div>
    </div>
  );
}
