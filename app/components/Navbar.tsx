import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/public/logo.png";
import AuthModal from "./AuthModal";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="Logo" className="size-10" />
        <h4 className="text-3xl font-semibold">Calendar</h4>
      </Link>
      <AuthModal />
    </div>
  );
};

export default Navbar;
