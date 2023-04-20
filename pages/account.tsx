/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import React from "react";

const Account = () => {
  return (
    <div>
      <Head>
        <title>Home - Netflix</title>
        <link
          rel="icon"
          href="https://res.cloudinary.com/dorssd7la/image/upload/v1681974433/Netflix-Logo-PNG-TITLE_meolqw.png"
        />
      </Head>

      <header className="bg-[#141414]">
        <Link href="/">
          <img
            src="https://rb.gy/ulxxee"
            width={120}
            height={120}
            className="cursor-pointer object-contain"
            alt="logo"
          />
        </Link>
        <Link href="/account">
          <img
            src="https://rb.gy/g1pwyx"
            alt=""
            className="cursor-pointer rounded"
          />
        </Link>
      </header>

      <main className="pt-24">
        <div>
          <h1 className="text-3xl md:text-4xl">Account</h1>
          <div className="-ml-0.5 flex items-center gap-x-1.5">
            <img src="" alt="" />
            <p className="text-xs font-semibold text-[#555]">
              Member since Sun, 01st April 2023
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Account;
