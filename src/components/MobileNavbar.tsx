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
import { useAuth, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import Link from "next/link";

function MobileNavbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isSignedIn } = useAuth();
  const { theme, setTheme } = useTheme();
  const { user } = useUser();

  return (
    <div className="flex md:hidden items-center space-x-2">
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

      {/* Mobile Menu Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <MenuIcon className="h-5 w-5" />
      </Button>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 bg-black flex justify-end"> 
          {/* Changed bg-black bg-opacity-95 to bg-black */}
          <div className="w-[260px] p-4">
            <h2 className="text-lg font-semibold mb-4 text-white">Menu</h2>
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                className="flex items-center gap-2 text-white hover:bg-gray-700 rounded-md p-2 transition-all"
              >
                <HomeIcon className="w-5 h-5" />
                Home
              </Link>
              {isSignedIn ? (
                <>
                  <Link
                    href="/notifications"
                    className="flex items-center gap-2 text-white hover:bg-gray-700 rounded-md p-2 transition-all"
                  >
                    <BellIcon className="w-5 h-5" />
                    Notifications
                  </Link>
                  <Link
                    href={`/profile/${user?.username || user?.emailAddresses[0]?.emailAddress.split("@")[0]}`}
                    className="flex items-center gap-2 text-white hover:bg-gray-700 rounded-md p-2 transition-all"
                  >
                    <UserIcon className="w-5 h-5" />
                    Profile
                  </Link>
                  <SignOutButton>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 text-white hover:bg-gray-700 rounded-md p-2 transition-all"
                    >
                      <LogOutIcon className="w-5 h-5" />
                      Logout
                    </Button>
                  </SignOutButton>
                </>
              ) : (
                <SignInButton mode="modal">
                  <Button variant="default" className="w-full">
                    Sign In
                  </Button>
                </SignInButton>
              )}
            </nav>
            <Button
              variant="ghost"
              className="mt-6 w-full text-white hover:bg-gray-700 rounded-md p-2 transition-all"
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