"use client";

import {
  BellIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useAuth, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import Link from "next/link";

function MobileNavbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isSignedIn } = useAuth();
  const { theme, setTheme } = useTheme();
  const { user } = useUser();

  return (
    <div className="flex md:hidden items-center gap-2">
      {/* Theme Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      {/* Mobile Menu */}
      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        
        <SheetContent side="right" className="w-[280px]">
          <SheetHeader className="text-left">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          
          <nav className="flex flex-col gap-2 mt-6">
            <Button 
              asChild
              variant="ghost" 
              className="w-full justify-start gap-3 px-4 py-6"
              onClick={() => setShowMobileMenu(false)}
            >
              <Link href="/">
                <HomeIcon className="h-5 w-5" />
                Home
              </Link>
            </Button>

            {isSignedIn ? (
              <>
                <Button 
                  asChild
                  variant="ghost" 
                  className="w-full justify-start gap-3 px-4 py-6"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Link href="/notifications">
                    <BellIcon className="h-5 w-5" />
                    Notifications
                  </Link>
                </Button>

                <Button 
                  asChild
                  variant="ghost" 
                  className="w-full justify-start gap-3 px-4 py-6"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Link href={`/profile/${user?.username || user?.emailAddresses[0]?.emailAddress.split("@")[0]}`}>
                    <UserIcon className="h-5 w-5" />
                    Profile
                  </Link>
                </Button>

                <SignOutButton>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start gap-3 px-4 py-6 text-destructive hover:text-destructive/80"
                  >
                    <LogOutIcon className="h-5 w-5" />
                    Logout
                  </Button>
                </SignOutButton>
              </>
            ) : (
              <SignInButton mode="modal">
                <Button 
                  variant="default" 
                  className="w-full mt-4"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Sign In
                </Button>
              </SignInButton>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNavbar;