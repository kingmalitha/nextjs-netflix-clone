import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../hooks/useAuth";
import { RecoilRoot } from "recoil";
import ToastProvider from "@/providers/ToastProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthProvider>
        <ToastProvider />
        <Component {...pageProps} />
      </AuthProvider>
    </RecoilRoot>
  );
}
