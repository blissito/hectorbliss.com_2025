import { useState } from "react";
import { PostFormModal } from "~/components/PostFormModal";
import type { Route } from "./+types/admin";
import slugify from "slugify";
import { db } from "~/.server/db";

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "add_post") {
    const form = Object.fromEntries(formData);
    const data = {
      title: form.title as string,
      slug: slugify(form.title as string),
      image: form.image as string,
      description: form.description as string,
      body: form.body as string,
      youtubeLink: form.youtubeLink as string,
      authorName: "Héctorbliss",
      authorImage: "/me_logo.png",
      authorLink: "https://www.hectorbliss.com",
    };
    // @todo validation?
    await db.post.create({ data });
  }

  const data = Object.fromEntries(formData);
  console.log("DATA:", data);
  return null;
};

export default function AdminPage() {
  const [isPostFormOpen, setIsPostFormOpen] = useState(true);
  return (
    <>
      <PostFormModal
        onClose={() => setIsPostFormOpen(false)}
        isOpen={isPostFormOpen}
      />
      <article className="py-20">
        <h1 className="text-3xl">Administra tus posts y tus cursos</h1>
        <AdminButton onClick={() => setIsPostFormOpen(true)}>
          Añadir nuevo post
        </AdminButton>
      </article>
    </>
  );
}

export const AdminButton = ({ ...props }) => {
  return (
    <button
      className="bg-slate-500 py-3 px-6 hover:bg-slate-400 ml-auto block m-8"
      {...props}
    />
  );
};
