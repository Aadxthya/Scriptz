import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/ui/ModeToggle";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";


import Image from "next/image";

export default function Home() {
  return (
    <ClerkProvider>
      <div className="m-4">
      <SignedOut>
        <SignInButton mode="modal">
          <Button>Sign in</Button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>

      <Button variant={"secondary"}>Click me</Button>
    </div>
    <ModeToggle/>

    </ClerkProvider>
  );
}
