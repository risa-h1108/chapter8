"use client";

import Link from "next/link";
import React from "react";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { supabase } from "@/app/untils/supabase";

export const Header: React.FC = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
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
