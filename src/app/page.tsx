import { Button } from "@/components/ui/button";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <ClerkProvider>
      <div className="m-4">
        <h1>home page content</h1>
        </div>
    </ClerkProvider>
  );
}
