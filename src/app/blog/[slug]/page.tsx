import { sanityFetch } from "@/sanity/lib/live";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { data: post } = await sanityFetch({
    query: `*[_type == "post" && slug.current == $slug][0]{
      title,
      body,
      _createdAt,
      "authorName": author->name,
      "categories": categories[]->title,
      mainImage
    }`,
    params: { slug: params.slug },
  });

  if (!post) return notFound();

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-4 text-gray-900">{post.title}</h1>

      {/* Meta Info */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
        <time>
          {post._createdAt ? new Date(post._createdAt).toLocaleDateString() : "Unknown"}
        </time>
        {post.authorName && <span>• By {post.authorName}</span>}
        {post.categories?.length > 0 && (
          <span>• {post.categories.join(", ")}</span>
        )}
      </div>

      {/* Cover Image */}
      {post.mainImage && (
        <img
          src={urlFor(post.mainImage).width(1200).url()}
          alt={post.title}
          className="rounded-xl mb-8 shadow-md"
        />
      )}

      {/* Blog Body */}
      <div className="prose prose-lg prose-blue max-w-none">
        <PortableText
          value={post.body}
          components={{
            types: {
              image: ({ value }: any) => (
                <img
                  src={urlFor(value).width(800).url()}
                  alt={value.alt || "Blog image"}
                  className="rounded-lg my-6 shadow-sm"
                />
              ),
            },
            marks: {
              link: ({ value, children }: any) => (
                <a
                  href={value.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {children}
                </a>
              ),
            },
          }}
        />
      </div>
    </article>
  );
}
