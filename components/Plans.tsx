/* eslint-disable @next/next/no-img-element */
import { CheckIcon } from "@heroicons/react/24/solid";
import Head from "next/head";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import Table from "./Table";
import { Product } from "../constants/products";
import { useState } from "react";
import Loader from "./Loader";
import { useRecoilState } from "recoil";
import { subscriptionState } from "@/atoms/modalAtom";

interface Props {
  products: Product[];
}

const Plans = ({ products }: Props) => {
  const { logout } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<Product | null>(products[2]);
  const [isBillingLoading, setIsBillingLoading] = useState(false);
  const [subscription, setSubscription] = useRecoilState(subscriptionState);

  const subscribeToPlan = () => {
    // 01.) Check Whether user is availble

    setIsBillingLoading(true);

    setTimeout(() => {
      setIsBillingLoading(false);
    }, 2000);
    setSubscription(true);
  };

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

      <main className="pt-28 max-w-5xl mx-auto px-5 pb-12 transition-all md:px-10 ">
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

          <button
            disabled={!selectedPlan || isBillingLoading}
            className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${
              isBillingLoading && "opacity-60"
            }`}
            onClick={subscribeToPlan}
          >
            {isBillingLoading ? (
              <Loader color="dark:fill-gray-300" />
            ) : (
              "Subscribe"
            )}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Plans;
