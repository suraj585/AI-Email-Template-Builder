"use client";
import { useUserDetail } from "@/app/provider";
import Image from "next/image";
import { Button } from "../ui/button";
import SignInButton from "./SignInButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const { userDetail, setUserDetail } = useUserDetail();
  const pathname = usePathname(); // Get current route

  // Check if we're on the /dashboard/create page
  const isCreatePage = pathname === "/dashboard/create";

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 p-4 px-10 flex justify-between items-center animate-fade-in-down ${
        isCreatePage
          ? "bg-gradient-to-r from-[#00D4FF] to-[#FF007A] shadow-[0_0_15px_rgba(0,212,255,0.7)]"
          : "bg-white shadow-sm"
      }`}
    >
      {/* Logo */}
      <Link href="/">
        <Image
          src={"/logo.svg"}
          alt="logo"
          width={180}
          height={140}
          className={`hover:scale-105 transition-transform duration-300 ${
            isCreatePage ? "hover:shadow-[0_0_10px_rgba(0,212,255,0.5)]" : ""
          }`}
        />
      </Link>

      {/* User Actions */}
      <div className="flex items-center gap-4">
        {userDetail?.email ? (
          <>
            <Link href={"/dashboard"}>
              <Button
                className={`font-semibold rounded-full px-6 py-2 transition-all duration-300 hover:scale-105 ${
                  isCreatePage
                    ? "bg-[#1A1A2E]/90 text-[#B2FF59] hover:bg-[#1A1A2E] hover:text-[#CCFF99] hover:shadow-[0_0_10px_rgba(178,255,89,0.5)]"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Dashboard
              </Button>
            </Link>
            <Image
              src={userDetail?.picture}
              alt="user"
              width={35}
              height={35}
              className={`rounded-full hover:scale-110 transition-transform duration-300 ${
                isCreatePage
                  ? "border-2 border-[#B2FF59] hover:shadow-[0_0_10px_rgba(178,255,89,0.5)]"
                  : "border-0"
              }`}
            />
          </>
        ) : (
          <SignInButton />
        )}
      </div>
    </div>
  );
}

export default Header;
