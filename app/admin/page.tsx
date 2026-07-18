"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/admin/login");
  }, [router]);
  return (
    <div className="min-h-screen bg-chess-950 flex items-center justify-center">
      <div className="text-chess-accent animate-pulse">Redirecting...</div>
    </div>
  );
}
