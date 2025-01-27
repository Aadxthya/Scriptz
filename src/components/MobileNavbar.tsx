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
import { useState } from "react";
import { useAuth, SignInButton, SignOutButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import Link from "next/link";

function MobileNavbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isSignedIn } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex md:hidden items-center space-x-2">
      {/* Theme Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="mr-2"
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      {/* Mobile Menu */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <MenuIcon className="h-5 w-5" />
      </Button>
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end">
          <div className="w-[300px] bg-white p-6 shadow-lg">
            <h2 className="text-lg font-bold">Menu</h2>
            <nav className="mt-4 flex flex-col space-y-4">
              <Link href="/" className="text-blue-500 flex items-center gap-2">
                <HomeIcon className="w-4 h-4" />
                Home
              </Link>
              {isSignedIn ? (
                <>
                  <Link
                    href="/notifications"
                    className="text-blue-500 flex items-center gap-2"
                  >
                    <BellIcon className="w-4 h-4" />
                    Notifications
                  </Link>
                  <Link
                    href="/profile"
                    className="text-blue-500 flex items-center gap-2"
                  >
                    <UserIcon className="w-4 h-4" />
                    Profile
                  </Link>
                  <SignOutButton>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <LogOutIcon className="w-4 h-4" />
                      Logout
                    </Button>
                  </SignOutButton>
                </>
              ) : (
                <SignInButton mode="modal">
                  <Button variant="default">Sign In</Button>
                </SignInButton>
              )}
            </nav>
            <Button
              variant="ghost"
              className="mt-6 w-full"
              onClick={() => setShowMobileMenu(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileNavbar;