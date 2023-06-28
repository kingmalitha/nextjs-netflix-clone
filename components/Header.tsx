/* eslint-disable @next/next/no-img-element */
import useAuth from "@/hooks/useAuth";
import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import BasicMenu from "./BasicMenu";
import { IoMdArrowDropdown } from "react-icons/io";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <header className={`${isScrolled && "bg-[#141414]"}`}>
      <div className='flex items-center space-x-2 md:space-x-10'>
        <img
          src='https://rb.gy/ulxxee'
          width={100}
          height={100}
          alt='netflix-logo'
          className='cursor-pointer object-contain'
        />

        <BasicMenu />

        <ul className='hidden space-x-4 md:flex'>
          <li className='headerLink'>Home</li>
          <li className='headerLink'>TV Shows</li>
          <li className='headerLink'>Movies</li>
          <li className='headerLink'>New & Popular</li>
          <li className='headerLink'>My List</li>
        </ul>
      </div>

      <div className='flex items-center space-x-4 text-sm font-[400]'>
        <MagnifyingGlassIcon className='hidden h-6 w-6 sm:inline' />
        <p className='hidden lg:inline'>Kids</p>
        <BellIcon className='h-6 w-6' />
        <Link href='/account'>
          <img
            src='https://rb.gy/g1pwyx'
            alt=''
            className='cursor-pointer rounded'
          />
        </Link>
        <div className='relative'>
          <button onClick={toggleDropdown}>
            <IoMdArrowDropdown size={20} />
          </button>

          {dropdown && (
            <div className='absolute bg-red-400 top-[40px]  -left-[80px] w-[100px]  z-[6] flex flex-col'>
              <button className='bg-[#141414] w-full px-6 py-2'>Profile</button>

              <button
                className='bg-[#141414] w-full px-6 py-2 hover:bg-[#141414]/90'
                onClick={logout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
