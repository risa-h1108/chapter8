"use client";

import Link from "next/link";
import React from "react";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { supabase } from "@/app/untils/supabase";
import { useRouter } from "next/navigation";

export const Header: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/"); // ログアウト後にホームページにリダイレクト
  };

  const { session, isLoading } = useSupabaseSession();

  return (
    <header className="flex items-center justify-between bg-gray-800 p-6 font-bold text-white">
      <Link href="/" className="headerLink">
        Blog
      </Link>
      {!isLoading && (
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <Link href="/admin" className="headerLink">
                管理画面
              </Link>
              <button onClick={handleLogout}>ログアウト</button>
            </>
          ) : (
            <>
              <Link href="/contact" className="headerLink">
                お問い合わせ
              </Link>
              <Link href="/login" className="headerLink">
                ログイン
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};
