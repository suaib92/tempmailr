// src/sanity/lib/live.ts
import { defineLive } from "next-sanity";
import { client } from './client';

export const { sanityFetch, SanityLive } = defineLive({ 
  client: client.withConfig({ apiVersion: 'vX' }) // replace vX with your version
});

export const getAllPosts = async () => {
  try {
    const { data } = await sanityFetch({
      query: `*[_type == "post"] | order(_createdAt desc)`,
    });
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error fetching posts:", err);
    return [];
  }
};
