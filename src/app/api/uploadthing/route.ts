import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Export GET and POST routes for the App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  // Optionally, apply a custom config
  // config: { ... },
});
