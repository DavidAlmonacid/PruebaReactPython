import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("device:id", "routes/device-detail.tsx")
] satisfies RouteConfig;
