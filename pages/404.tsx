import Head from "next/head";
import Link from "next/link";
import { courierPrime } from "@/utils/fonts";

export default function NotFoundPage() {
  return (
    <main className={`${courierPrime.className} flex min-h-screen items-center justify-center bg-[#020617] px-6 text-slate-100`}>
      <Head>
        <title>Page not found | Sathsara Ranasooriya</title>
        <meta name="robots" content="noindex,follow" key="robots" />
      </Head>
      <div className="max-w-xl">
        <p className="mb-4 text-sm text-cyan-300">404</p>
        <h1 className="text-3xl font-bold md:text-5xl">Page not found</h1>
        <p className="mt-6 leading-relaxed text-slate-300">This page is unavailable. Return to my portfolio to explore my current projects.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full border border-white/30 px-5 py-2 hover:bg-white hover:text-black">Back to portfolio &rarr;</Link>
      </div>
    </main>
  );
}