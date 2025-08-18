// src/app/blog/page.tsx
import { getAllPosts, SanityLive } from "@/sanity/lib/live";

export const dynamic = "force-dynamic"; // always fresh

export default async function BlogPage() {
  const posts = (await getAllPosts()) || []; // always an array

  return (
    <>
      <SanityLive /> {/* Required for live updates */}

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Main blog posts column (left) */}
          <div className="md:w-2/3">
            {posts.length === 0 ? (
              <p className="text-gray-600">No posts available.</p>
            ) : (
              <ul className="space-y-6">
                {posts.map(post => (
                  <li key={post._id} className="border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <a
                      href={`/blog/${post.slug?.current ?? "#"}`}
                      className="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition-colors"
                    >
                      {post.title ?? "Untitled"}
                    </a>
                    {post.excerpt && (
                      <p className="mt-3 text-gray-600 leading-relaxed">
                        {post.excerpt}
                      </p>
                    )}
                    <p className="mt-3 text-sm text-gray-500">
                      Published: {post._createdAt ? new Date(post._createdAt).toLocaleDateString() : "Unknown"}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Recent sidebar (right) */}
          <div className="md:w-1/3">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
                Recent Posts
              </h2>
              {posts.length > 0 ? (
                <ul className="space-y-3">
                  {posts.slice(0, 5).map(post => (
                    <li key={`recent-${post._id}`}>
                      <a
                        href={`/blog/${post.slug?.current ?? "#"}`}
                        className="font-semibold text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        {post.title ?? "Untitled"}
                      </a>
                      <p className="text-xs text-gray-500 mt-1">
                        {post._createdAt ? new Date(post._createdAt).toLocaleDateString() : "Unknown"}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No recent posts</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Optional: metadata for SEO
export async function generateMetadata() {
  const posts = (await getAllPosts()) || [];
  return {
    title: `Blog (${posts.length})`,
    description: "A collection of blog posts from Sanity",
  };
}