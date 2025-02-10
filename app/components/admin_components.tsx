import type { Post } from "@prisma/client";
import { Link } from "react-router";
import { cn } from "~/utils/cn";
import { IoOpenOutline } from "react-icons/io5";

export const PostList = ({
  posts,
  onClick,
}: {
  onClick?: (post: Post) => void;
  posts: Post[];
}) => {
  return (
    <section>
      {posts.map((post) => (
        <PostCard onClick={onClick} post={post} key={post.id} />
      ))}
    </section>
  );
};

export const PostCard = ({
  onClick,
  post,
}: {
  post: Post;
  onClick?: (post: Post) => void;
}) => {
  return (
    <div
      className={cn(
        "hover:text-slate-500 text-left px-12 transition-all",
        "flex items-center justify-between",
        "hover:bg-slate-100 w-full"
      )}
    >
      <button
        className="text-4xl text-left py-3"
        onClick={() => onClick?.(post)}
      >
        {post.title}
      </button>
      <Link
        to={`/post/${post.slug}`}
        className="rounded-full p-3 bg-gray-800 active:bg-ragy-900"
      >
        <IoOpenOutline />
      </Link>
    </div>
  );
};

export const AdminButton = ({ ...props }) => {
  return (
    <button
      className={cn(
        "font-bold text-2xl ml-auto block mt-12",
        "py-3 px-12",
        "bg-slate-500 text-slate-300 hover:bg-slate-600 active:shadow-inner active:bg-slate-700 shadow"
      )}
      {...props}
    />
  );
};
