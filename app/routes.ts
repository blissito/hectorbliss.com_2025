import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.mdx"),
  route("api", "routes/api.tsx"),
  route("admin", "routes/admin.tsx"),
] satisfies RouteConfig;
