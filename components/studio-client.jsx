"use client";
import dynamic from "next/dynamic";
const StudioApplication = dynamic(() => import("./studio-application"), {
  ssr: false,
  loading: () => <p style={{ padding: 32 }}>جاري تحميل لوحة الإدارة…</p>,
});
export default function StudioClient() {
  return <StudioApplication />;
}
