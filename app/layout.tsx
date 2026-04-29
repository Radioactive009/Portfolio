import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kislay Kumar — AI Engineer",
  description:
    "AI Engineer specializing in production-ready AI systems, RAG pipelines, multi-agent orchestration, and NLP intelligence. Building systems that convert unstructured data into actionable intelligence.",
  keywords: [
    "AI Engineer",
    "NLP",
    "RAG",
    "LangChain",
    "FAISS",
    "Multi-Agent",
    "LLM",
    "Kislay Kumar",
    "Machine Learning",
    "Python",
  ],
  authors: [{ name: "Kislay Kumar" }],
  openGraph: {
    title: "Kislay Kumar — AI Engineer",
    description:
      "Building production-ready AI systems that convert unstructured data into actionable intelligence.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}
    >
      <body className="bg-void text-white antialiased">
        <SmoothScroll>
          <Navigation />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
