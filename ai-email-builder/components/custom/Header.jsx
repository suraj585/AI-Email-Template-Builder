"use client";
import { useUserDetail } from "@/app/provider";
import Image from "next/image";
import { Button } from "../ui/button";
import SignInButton from "./SignInButton";
import Link from "next/link";

function Header() {
  const { userDetail, setUserDetail } = useUserDetail();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#00D4FF] to-[#FF007A] p-4 shadow-[0_0_15px_rgba(0,212,255,0.7)] px-10 flex justify-between items-center animate-fade-in-down">
      {/* Logo */}
      <Link href="/">
        <Image
          src={"/logo.svg"}
          alt="logo"
          width={180}
          height={140}
          className="hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_10px_rgba(0,212,255,0.5)]"
        />
      </Link>

      {/* User Actions */}
      <div className="flex items-center gap-4">
        {userDetail?.email ? (
          <>
            <Link href={"/dashboard"}>
              <Button className="bg-[#1A1A2E]/90 text-[#B2FF59] font-semibold hover:bg-[#1A1A2E] hover:text-[#CCFF99] rounded-full px-6 py-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_10px_rgba(178,255,89,0.5)]">
                Dashboard
              </Button>
            </Link>
            <Image
              src={userDetail?.picture}
              alt="user"
              width={35}
              height={35}
              className="rounded-full border-2 border-[#B2FF59] hover:scale-110 transition-transform duration-300 hover:shadow-[0_0_10px_rgba(178,255,89,0.5)]"
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
