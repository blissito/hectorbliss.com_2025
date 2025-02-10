import { useLoaderData } from "react-router";
import Markdown from "./MarkDown";

export const PostBody = () => {
  const { post } = useLoaderData();
  return (
    <article className="mx-auto max-w-3xl px-4">
      <p>By: {post.authorName}</p>
      <Markdown>{post.body}</Markdown>
    </article>
  );
};
