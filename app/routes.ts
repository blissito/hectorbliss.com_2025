import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.mdx"),
  route("admin", "routes/admin.tsx"),
  route("api", "routes/api.tsx"),
  route("api/posts", "routes/api/posts.ts"),
  route("post/:slug", "routes/post_detail.mdx"),
] satisfies RouteConfig;
