import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

// Initialize Uploadthing
const f = createUploadthing();

// Example auth function, replace with real auth logic
const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth for dev

// Define FileRouter for your app
export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB", // Max file size
      maxFileCount: 1,    // Max number of files
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);  // Ensure real auth logic here
      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.id }; // Attach user info to the upload
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);

      return { uploadedBy: metadata.userId }; // Send metadata back to client
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
