/* eslint-disable @next/next/no-img-element */
import { CheckIcon } from "@heroicons/react/24/solid";
import Head from "next/head";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import Table from "./Table";
import { Product } from "../constants/products";
import { useState } from "react";

interface Props {
  products: Product[];
}

const Plans = ({ products }: Props) => {
  const { logout } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<Product | null>(products[2]);
  return (
    <div>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="border-b border-white/10 bg-[#141414]">
        <Link href="/">
          <img
            src="https://rb.gy/ulxxee"
            width={100}
            height={100}
            alt="netflix-logo"
            className="cursor-pointer object-contain"
          />
        </Link>
        <button
          onClick={logout}
          className="text-lg font-medium hover:underline "
        >
          Sign Out
        </button>
      </header>

      <main className="pt-28 max-w-5xl px-5 pb-12 transition-all md:px-10 ">
        <h1 className="mb-3 text-3xl font-medium ">
          Choose the plan that&apos;s right for you
        </h1>
        <ul>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Watch all you want.
            Ad-free.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Recommendations
            just for you.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Change or cancel
            your plan anytime.
          </li>
        </ul>
        <div className=" mt-4 flex flex-col space-y-4">
          <div className="flex w-full  items-center self-end md:w-3/5">
            {products.map((product) => (
              <div
                className={`planBox ${
                  selectedPlan?.id === product.id ? "opacity-100" : "opacity-60"
                }`}
                key={product.id}
                onClick={() => setSelectedPlan(product)}
              >
                {product.name}
              </div>
            ))}
            {/* <div className="planBox">Basic</div>
            <div className="planBox">Standard</div>
            <div className="planBox">Premium</div> */}
          </div>

          <Table products={products} selectedPlan={selectedPlan} />
        </div>
      </main>
    </div>
  );
};

export default Plans;
