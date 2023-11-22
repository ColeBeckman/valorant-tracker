import React from "react";
import Link from "next/link";
import { UserButton, SignedOut, SignInButton, SignedIn } from "@clerk/nextjs";
import { useRouter } from "next/router";

export const NavBar = () => {
  const router = useRouter();

  return (
    <nav className="space-x-4 h-16 flex items-center justify-between">
      <Link className="text-gray-800 dark:text-white" href="/">
        Home
      </Link>
      <SignedIn>
        <UserButton afterSignOutUrl={router.asPath} />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal" afterSignInUrl={router.asPath} />
      </SignedOut>
    </nav>
  );
};
