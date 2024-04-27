"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Caveat_Brush } from "next/font/google";
import logo from "@/public/jch.svg";

const style = Caveat_Brush({ weight: "400", subsets: ["latin"] });

export default function Header() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const handleScroll = () => {
    if (window.scrollY > 20) {
      setIsScrolled(true);
    } else setIsScrolled(false);
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header >
      <nav className={`fixed z-20 px-5 flex inset-x-0 mx-auto justify-between font-semibold duration-500 ${isScrolled?`w-11/12 py-1 top-2 bg-slate-100 shadow rounded-lg`:`w-full py-3`}`}>
        <span className="flex items-center space-x-1 text-jp-red">
          <Image src={logo} alt="JCH Logo" className="size-14" />
          <h1 className={`${style.className} text-4xl text-nowrap`}>Japan Career Hub</h1>
        </span>
        <div className="text-white flex items-center space-x-2">
          <Link
            href="/jobs"
            className={`inline-block w-28 text-center p-1 backdrop-blur-[2px] rounded-md hover:shadow-lg ${isScrolled?`text-black`:`bg-[#0005] hover:backdrop-blur-sm hover:bg-[#0008]`}`}
          >
            Jobs
          </Link>
          <Link
            href="/about"
            className={`inline-block w-28 text-center p-1 backdrop-blur-[2px] rounded-md hover:shadow-lg ${isScrolled?`text-black`:`bg-[#0005] hover:backdrop-blur-sm hover:bg-[#0008]`}`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`inline-block w-28 text-center p-1 backdrop-blur-[2px] rounded-md hover:shadow-lg ${isScrolled?`text-black`:`bg-[#0005] hover:backdrop-blur-sm hover:bg-[#0008]`}`}
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
