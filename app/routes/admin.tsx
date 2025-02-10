import { useState } from "react";
import { PostFormModal } from "~/components/PostFormModal";
import type { Route } from "./+types/admin";
import { db } from "~/.server/db";
import type { Post } from "@prisma/client";
import { AdminButton, PostList } from "~/components/admin_components";

export const loader = async () => {
  const posts = await db.post.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });
  return { posts };
};

export default function AdminPage({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData;
  const [isPostFormOpen, setIsPostFormOpen] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const handlePostClick = (p: Post) => {
    setPost(p);
    setIsPostFormOpen(true);
  };
  const handleClose = () => {
    setIsPostFormOpen(false);
    setPost(null);
  };
  return (
    <>
      <PostFormModal
        post={post}
        onClose={handleClose}
        isOpen={isPostFormOpen}
      />
      <article className="max-w-3xl mx-auto">
        <nav className="py-20">
          <h1 className="text-5xl">Administra el blog</h1>
          <AdminButton onClick={() => setIsPostFormOpen(true)}>
            Añadir post
          </AdminButton>
        </nav>
        <PostList onClick={handlePostClick} posts={posts} />
      </article>
    </>
  );
}
