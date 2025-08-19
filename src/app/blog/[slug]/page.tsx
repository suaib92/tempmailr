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
          <h1 className="text-2xl font-bold text-gray-900">TempMail</h1>
          <nav className="flex gap-6">
            <a href="#" className="font-medium hover:text-blue-600 transition-colors">Blog</a>
            <a href="#" className="font-medium hover:text-blue-600 transition-colors">About</a>
            <a href="#" className="font-medium hover:text-blue-600 transition-colors">Contact</a>
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
              {post._createdAt ? new Date(post._createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : "Unknown date"}
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
        {post.mainImage && (
          <figure className="mb-12">
            <img
              src={urlFor(post.mainImage).width(1600).quality(90).url()}
              alt={post.title}
              className="w-full h-auto rounded-xl object-cover shadow-lg"
            />
            {post.mainImage.alt && (
              <figcaption className="mt-2 text-center text-sm text-gray-500">
                {post.mainImage.alt}
              </figcaption>
            )}
          </figure>
        )}

        {/* Article Content */}
        <article className="prose prose-lg max-w-none 
          prose-headings:font-semibold prose-headings:text-gray-900
          prose-p:text-gray-700 prose-p:leading-relaxed
          prose-a:text-blue-600 prose-a:font-medium prose-a:underline-offset-4
          prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:px-6 prose-blockquote:py-3 prose-blockquote:rounded-r-lg
          prose-ul:list-disc prose-ol:list-decimal
          prose-img:rounded-lg prose-img:shadow-md
          prose-hr:border-gray-200
          prose-pre:bg-gray-900 prose-pre:rounded-lg
          ">
          <PortableText
            value={post.body}
            components={{
              types: {
                image: ({ value }: any) => (
                  <figure>
                    <img
                      src={urlFor(value).width(1200).quality(85).url()}
                      alt={value.alt || "Blog image"}
                      className="rounded-xl my-8 shadow-md"
                    />
                    {value.alt && (
                      <figcaption className="text-center text-sm text-gray-500 mt-2">
                        {value.alt}
                      </figcaption>
                    )}
                  </figure>
                ),
              },
              marks: {
                link: ({ value, children }: any) => (
                  <a
                    href={value.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-700 transition-colors"
                  >
                    {children}
                  </a>
                ),
              },
            }}
          />
        </article>

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              {post.authorName && (
                <p className="text-sm text-gray-500">
                  Written by {post.authorName}
                </p>
              )}
            </div>
            <div className="flex gap-4">
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}