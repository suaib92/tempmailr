import { sanityFetch } from "@/sanity/lib/live";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

// ---------- Types ----------
interface ImageValue {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

interface LinkMarkDefinition {
  _type: "link";
  href: string;
  blank?: boolean;
}

interface PortableTextImageProps {
  value: ImageValue;
}

interface PortableTextLinkProps {
  value?: LinkMarkDefinition;
  children: React.ReactNode;
  text?: string;
}

interface BlogPageProps {
  params: {
    slug: string;
  };
}

// ---------- Generate static params ----------
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const { data: posts } = await sanityFetch({
    query: `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`,
  });

  return (posts || []).map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

// ---------- Generate Metadata ----------


export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { data: post } = await sanityFetch({
    query: `*[_type == "post" && slug.current == $slug][0]{
      title,
      excerpt,
      mainImage
    }`,
    params: { slug: params.slug },
  });

  if (!post) return {};

  let ogImage = "/default-og.png";
  if (post.mainImage?.asset) {
    ogImage = urlFor(post.mainImage).width(1200).height(630).url();
  }

  return {
    title: post.title || "Temp Mail Blog",
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

// ---------- Blog Post Page ----------
export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { data: post } = await sanityFetch({
    query: `*[_type == "post" && slug.current == $slug][0]{
      title,
      body,
      _createdAt,
      "authorName": author->name,
      "categories": coalesce(categories[]->title, []),
      mainImage,
      excerpt
    }`,
    params: { slug: params.slug },
  });

  if (!post) return notFound();

  return (
    <div className="bg-white">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
          >
            TempMail
          </Link>
          <nav className="flex gap-6">
            <Link href="/blog" className="font-medium hover:text-blue-600 transition-colors">
              Blog
            </Link>
            <Link href="/about" className="font-medium hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="font-medium hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        {/* Article Header */}
        <header className="mb-12">
          {Array.isArray(post.categories) && post.categories.length > 0 && (
            <div className="flex gap-2 mb-4">
              {post.categories.map((category: string) => (
                <span
                  key={category}
                  className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>
          )}

          <div className="flex items-center gap-4 text-gray-500">
            <time className="text-sm">
              {post._createdAt
                ? new Date(post._createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Unknown date"}
            </time>
            {post.authorName && (
              <>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="text-sm">By {post.authorName}</span>
              </>
            )}
          </div>
        </header>

        {/* Cover Image */}
        {post.mainImage && post.mainImage.asset && (
          <figure className="mb-12">
            <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-md">
              <Image
                src={urlFor(post.mainImage).width(1200).quality(85).url()}
                alt={post.mainImage.alt || "Blog cover image"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              />
            </div>
            {post.mainImage.alt && (
              <figcaption className="mt-2 text-center text-sm text-gray-500">
                {post.mainImage.alt}
              </figcaption>
            )}
          </figure>
        )}

        {/* Article Content */}
        <article
          className="prose prose-lg max-w-none 
          prose-headings:font-semibold prose-headings:text-gray-900
          prose-p:text-gray-700 prose-p:leading-relaxed
          prose-a:text-blue-600 prose-a:font-medium prose-a:underline-offset-4
          prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:px-6 prose-blockquote:py-3 prose-blockquote:rounded-r-lg
          prose-ul:list-disc prose-ol:list-decimal
          prose-img:rounded-lg prose-img:shadow-md
          prose-hr:border-gray-200
          prose-pre:bg-gray-900 prose-pre:rounded-lg"
        >
          <PortableText
            value={post.body}
            components={{
              types: {
                image: ({ value }: PortableTextImageProps) => {
                  if (!value || !value.asset) return null;

                  try {
                    const imageUrl = urlFor(value).width(1200).quality(85).url();
                    return (
                      <figure>
                        <div className="relative w-full h-96 rounded-xl overflow-hidden my-8 shadow-md">
                          <Image
                            src={imageUrl}
                            alt={value.alt || "Blog image"}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                          />
                        </div>
                        {value.alt && (
                          <figcaption className="text-center text-sm text-gray-500 mt-2">
                            {value.alt}
                          </figcaption>
                        )}
                      </figure>
                    );
                  } catch (error) {
                    console.error("Error generating image URL:", error);
                    return null;
                  }
                },
              },
              marks: {
                link: ({ value, children }: PortableTextLinkProps) => {
                  if (!value?.href) return <span>{children}</span>;

                  const isExternal = value.href.startsWith("http");

                  if (isExternal) {
                    return (
                      <a
                        href={value.href}
                        target={value.blank ? "_blank" : "_self"}
                        rel={value.blank ? "noopener noreferrer" : undefined}
                        className="hover:text-blue-700 transition-colors"
                      >
                        {children}
                      </a>
                    );
                  }

                  return (
                    <a href={value.href} className="hover:text-blue-700 transition-colors">
                      {children}
                    </a>
                  );
                },
              },
            }}
          />
        </article>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-100">
          <div className="flex justify-between items-center">
            {post.authorName && (
              <p className="text-sm text-gray-500">Written by {post.authorName}</p>
            )}
          </div>
        </footer>
      </main>
    </div>
  );
}
