import { useFetcher } from "react-router";
import { AdminButton } from "~/routes/admin";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useEffect } from "react";

export const PostFormModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose?: () => void;
}) => {
  const fetcher = useFetcher();
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };
    if (isOpen) {
      addEventListener("keydown", handleEsc);
    } else {
      removeEventListener("keydown", handleEsc);
    }
    return () => {
      removeEventListener("keydown", handleEsc);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <article className="fixed inset-0 flex items-center justify-center">
      <section className="absolute inset-0 backdrop-blur" />
      <section className="relative bg-slate-100 text-slate-900 min-h-[420px] w-[620px]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 text-5xl"
        >
          <IoIosCloseCircleOutline />
        </button>
        <h1>Nuevo post</h1>
        <fetcher.Form method="post" className="grid gap-3 px-12 bg-transparent">
          <Input name="title" />
          <Input type="textarea" name="body" />
          <Input name="image" />
          <Input name="description" />
          <p className="text-xs text-slate-500">Se publicará automáticamente</p>
          <AdminButton type="submit" name="intent" value="add_post">
            Crear
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
  required?: true;
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
