import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { profile } from "@/data/profile";
import "./globals.css";
import "./font-fallback.css";
import "./rebuild.css";
export const metadata:Metadata={metadataBase:new URL(profile.siteUrl),title:"Kushal Shah — AI Developer · Agentic Systems · FinTech",description:"AI developer building agentic systems, data applications and fintech tools.",alternates:{canonical:"/"},openGraph:{title:"Kushal Shah — AI Developer",description:"Agentic systems, data applications and fintech engineering.",url:"/",siteName:"Kushal Shah",type:"website"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}<Analytics/></body></html>}
