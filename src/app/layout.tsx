import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { profile } from "@/data/profile";
import "./base.css";
import "./orchestration.css";
import "./systems.css";
import "./workflow.css";
import "./polish.css";
import "./ambient.css";
const geist = localFont({ src: "./fonts/geist-latin.woff2", variable: "--font-display", display: "swap", weight: "100 900" });
export const metadata:Metadata={metadataBase:new URL(profile.siteUrl),title:"Kushal Shah — AI Developer · Agentic Systems · FinTech",description:"AI developer building agentic systems, data applications and fintech tools.",alternates:{canonical:"/"},openGraph:{title:"Kushal Shah — AI Developer",description:"Agentic systems, data applications and fintech engineering.",url:"/",siteName:"Kushal Shah",type:"website"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" className={geist.variable}><body>{children}<Analytics/></body></html>}
