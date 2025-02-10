import * as v from "valibot"; // 1.24 kB
import type { Route } from "./+types/home";
import { db } from "~/.server/db";
// este pattern se conoce como "modular".
const EmailSchema = v.pipe(
  v.string(),
  v.nonEmpty("Se necesita un email."),
  v.email("Esto no es un email."),
  v.maxLength(30, "No cabe tu email.")
);

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  // error si no es valido (usas bloques try, catch aquí)
  const email = v.parse(EmailSchema, formData.get("email"));
  // el schema va primero   👆🏼       ^el email después
  // guardamos en DB o lo que quieras.
  console.log("Nuevo suscriptor: ", email);
  // respondemos pidiendo confetti 🎊
  return { confetti: true };
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const intent = url.searchParams.get("intent");
  if (intent === "home_page") {
    const posts = await db.post.findMany({
      orderBy: { createdAt: "desc" },
      where: { published: true },
      select: {
        title: true,
        id: true,
        slug: true,
      },
    });
    return { posts };
  }
  // return "t(*_*t)";
  return null;
};
