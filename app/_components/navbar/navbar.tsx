"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { DropdownMenuBasic } from "../dropDown/dropDown";

export default function Navbar() {
  const { status, data: session } = useSession();
  const pathname = usePathname();
  const [IsOpen, setIsOpen] = useState(false);

  // جلب بيانات السلة
  const { data: CartData } = useQuery({
    queryKey: ["get-cart"],
    queryFn: async () => {
      const response = await fetch("/api/cart");
      return await response.json();
    },
    enabled: status === "authenticated",
  });

  // جلب بيانات قائمة الأمنيات
  const { data: WishListData } = useQuery({
    queryKey: ["get-wishlist"],
    queryFn: async () => {
      const response = await fetch("/api/wishlist");
      return await response.json();
    },
    enabled: status === "authenticated",
  });

  const toggleNav = () => setIsOpen(!IsOpen);
  const closeComponent = () => setIsOpen(false);

  function LogOut() {
    signOut({ callbackUrl: "/auth/login" });
  }

  const path = [
    { href: "/", content: "home" },
    { href: "/products", content: "products" },
    { href: "/brands", content: "brands" },
    { href: "/categories", content: "categories" },
  ];

  const authpath = [
    { href: "/auth/login", content: "login" },
    { href: "/auth/register", content: "register" },
  ];

  return (
    <nav className="bg-green-500 w-full fixed top-0 z-50 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link href="/" onClick={closeComponent} className="flex items-center space-x-3 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
          <span className="self-center text-xl font-bold whitespace-nowrap">freshCart</span>
        </Link>

        {/* Icons & Mobile Toggle */}
        <div className="flex items-center md:order-2 space-x-3 md:space-x-5">
          {status === "authenticated" && (
            <>
              {/* Wishlist */}
              <Link href="/wishlist" className="relative text-white hover:text-gray-200">
                {WishListData?.count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-green-500">
                    {WishListData.count}
                  </span>
                )}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </Link>

              {/* Cart */}
              <Link href="/cart" className="relative text-white hover:text-gray-200">
                {CartData?.numOfCartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-green-500">
                    {CartData.numOfCartItems}
                  </span>
                )}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
              </Link>
              
              <DropdownMenuBasic LogOut={LogOut} closeComponent={closeComponent} />
            </>
          )}

          <button onClick={toggleNav} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-white rounded-lg md:hidden hover:bg-green-600 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={IsOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Links */}
        <div className={`${IsOpen ? "block" : "hidden"} w-full md:flex md:w-auto md:items-center flex-grow md:ml-10`}>
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 bg-green-600 md:bg-transparent rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
            {path.map((elem) => (
              <li key={elem.content}>
                <Link
                  href={elem.href}
                  onClick={closeComponent}
                  className={`block py-2 px-3 ${pathname === elem.href ? "text-yellow-300 font-bold" : "text-white"} hover:text-yellow-200 transition-colors capitalize`}
                >
                  {elem.content}
                </Link>
              </li>
            ))}
          </ul>

          {/* User Name or Auth Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-4 ml-auto">
            {status === "authenticated" ? (
              <span className="text-white font-medium">
                Hi, <span className="font-bold uppercase">{session?.user?.name}</span>
              </span>
            ) : (
              <div className="flex space-x-4">
                {authpath.map((elem) => (
                  <Link key={elem.content} href={elem.href} className="text-white hover:text-yellow-200 font-medium capitalize">
                    {elem.content}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}