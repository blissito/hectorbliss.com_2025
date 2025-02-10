import type { Post } from "@prisma/client";
import { useEffect } from "react";
import { Link, useFetcher } from "react-router";

export const AllPosts = () => {
  const fetcher = useFetcher();
  useEffect(() => {
    fetcher.load("/api?intent=home_page");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const posts: Post[] = fetcher.data?.posts || [];
  return (
    <article>
      <section className="grid gap-3 grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </article>
  );
};

const PostCard = ({ post }: { post: Post }) => {
  return (
    <Link
      to={`/post/${post.slug}`}
      className="py-3 px-4 border rounded-2xl hover:bg-gray-900"
    >
      {post.title}
    </Link>
  );
};
