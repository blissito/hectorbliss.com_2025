import { useFetcher } from "react-router";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useEffect, useRef, type FormEvent } from "react";
import type { Post } from "@prisma/client";
import { AdminButton } from "./admin_components";

export const PostFormModal = ({
  isOpen,
  onClose,
  post,
}: {
  post?: Post | null;
  isOpen: boolean;
  onClose?: () => void;
}) => {
  const fetcher = useFetcher();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    addEventListener("keydown", handleEsc);
    return () => {
      removeEventListener("keydown", handleEsc);
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = new FormData(formRef.current || undefined);
    body.set("intent", post?.id ? "update_post" : "add_post");
    post?.id && body.set("id", post.id);
    fetcher.submit(body, { method: "post", action: "/api/posts" });
    handleClose();
  };

  const handleClose = () => {
    onClose?.();
  };

  const isLoading = fetcher.state !== "idle";

  if (!isOpen) return null;

  return (
    <article className="fixed inset-0 flex items-center justify-center">
      <section className="absolute inset-0 backdrop-blur" />
      <section className="relative bg-slate-100 text-slate-900 min-h-[420px] w-[620px]">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-50 text-5xl"
        >
          <IoIosCloseCircleOutline />
        </button>
        {post?.id ? <h1>Edita el post</h1> : <h1>Nuevo post</h1>}
        <fetcher.Form
          ref={formRef}
          onSubmit={handleSubmit}
          className="grid gap-3 px-12 bg-transparent pb-6"
        >
          <Input name="title" defaultValue={post?.title} />
          <Input type="textarea" name="body" defaultValue={post?.body} />
          <Input required={false} name="image" defaultValue={post?.image} />
          <Input
            required={false}
            name="description"
            defaultValue={post?.description}
          />
          <p className="text-xs text-slate-500">Se publicará automáticamente</p>
          <AdminButton disabled={isLoading} type="submit">
            {post?.id ? "Guardar" : "Crear"}
          </AdminButton>
        </fetcher.Form>
      </section>
    </article>
  );
};

const Input = ({
  type,
  label,
  required = true,
  ...props
}: {
  required?: boolean;
  label?: string;
  [x: string]: unknown;
}) => {
  return (
    <>
      <label className="grid">
        <span>{label || (props.name as string)}</span>
        {type === "textarea" ? (
          <textarea
            required={required}
            rows={8}
            className="bg-white border border-black shadow"
            {...props}
          />
        ) : (
          <input
            required={required}
            className="bg-white border border-black shadow py-2 px-3"
            {...props}
          />
        )}
      </label>
    </>
  );
};
