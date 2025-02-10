import { nanoid } from "nanoid";
import slugify from "slugify";
import { db } from "~/.server/db";

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "add_post") {
    const form = Object.fromEntries(formData);
    const data = {
      title: form.title as string,
      slug: slugify(form.title as string) + "_" + nanoid(4),
      image: form.image as string,
      description: form.description as string,
      body: form.body as string,
      youtubeLink: form.youtubeLink as string,
      authorName: "Héctorbliss",
      authorImage: "/me_logo.png",
      authorLink: "https://www.hectorbliss.com",
    };
    // @todo validation? and slug uniqueness
    await db.post.create({ data });
  }

  if (intent === "update_post") {
    const data = Object.fromEntries(formData);
    // @todo validate
    await db.post.update({
      where: {
        id: data.id as string,
      },
      data: { ...data, id: undefined, intent: undefined },
    });
  }

  return null;
};
