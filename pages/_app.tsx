import "@/app/globals.css";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import type { AppProps } from "next/app";
import { WebVitals } from "@/components/web-vitals";

export default function App({ Component, pageProps }: AppProps) {
    return <>
        <WebVitals />
        <Navbar />
        <Component {...pageProps} />
        <Footer />
    </>;
}
