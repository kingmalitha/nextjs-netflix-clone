import { Inter } from "next/font/google";
import Head from "next/head";
import Header from "../components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home - Netflix</title>
      </Head>
      <Header />
      <main>{/* Banner */}</main>
    </div>
  );
}
