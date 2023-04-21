/* eslint-disable @next/next/no-img-element */
import useAuth from "@/hooks/useAuth";
import useSubscription from "@/hooks/useSubscription";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { GetStaticProps } from "next";
import { Product, products } from "@/constants/products";
import Membership from "@/components/Membership";

interface Props {
  products: Product[];
}

const Account = ({ products }: Props) => {
  console.log(products);
  const { user, logout } = useAuth();

  // const subscription = useSubscription(user);
  const subscription = 1;

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

      <main className="pt-24 mx-auto max-w-6xl px-5 pb-12 transition-all md:px-10">
        <div className="flex flex-col gap-x-4 md:flex-row md:items-center">
          <h1 className="text-3xl md:text-4xl">Account</h1>
          <div className="-ml-0.5 flex items-center gap-x-1.5">
            <img src="https://rb.gy/4vfk4r" alt="" className="h-7 w-7" />
            <p className="text-xs font-semibold text-[#555]">
              Member since Sun, 01st April 2023
            </p>
          </div>
        </div>
        <Membership />

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
          <div>
            <h4 className="text-lg text-[gray]">PLAN DETAILS</h4>
          </div>
          <div className="col-span-3">
            <div className="flex flex-col justify-between border-b border-white/10  md:flex-row py-4">
              <div className="font-medium">
                {/* {
              products.filter(
                (product) => product.id === subscription?.product
              )[0]?.name
            } */}
                Basic
              </div>
              <div className="md:text-right">
                <p className="membershipLink">Change Plan</p>
              </div>
            </div>
            <div className="flex flex-col justify-between pt-4 pb-4 md:flex-row md:pb-0">
              <div>
                <p>No DVD plan</p>
              </div>
              <div className="md:text-right">
                <p className="membershipLink">Add DVD plan</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
          <h4 className="text-lg text-[gray] pb-4">SECURITY & PRIVACY</h4>
          <p className="font-medium">
            Controls access to this account, view the most recently active
            devices and more.
          </p>

          <div className="md:text-right md:col-span-2">
            <p className="membershipLink">Manage access and devices</p>
            <p className="membershipLink">Sign out of all devices</p>
            <p className="membershipLink">Download your personal information</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Account;

export const getStaticProps: GetStaticProps = async () => {
  // const products = await getProducts(payments, {
  //   includePrices: true,
  //   activeOnly: true,
  // })
  //   .then((res) => res)
  //   .catch((error) => console.log(error.message))

  return {
    props: {
      products,
    },
  };
};
