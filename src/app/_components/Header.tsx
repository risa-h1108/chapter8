//Home>Header部分
"use client";

import Link from "next/link";
import { supabase } from "@/app/untils/supabase";
import { useAuth } from "@/app/_hooks/useAuth";
import { useRouter } from "next/navigation";

export const Header: React.FC = () => {
  const router = useRouter();
  const { isLoading, session } = useAuth();
  const logout = async () => {
    await supabase.auth.signOut();
    router.replace("/");
  };
  return (
    <header className="header">
      <div className="headerLinkWrapper">
        <Link href="/" className="headerLink">
          Blog
        </Link>
        <div className="authLinks">
          {!isLoading &&
            (session ? (
              <button onClick={logout} className="headerLink">
                Logout
              </button>
            ) : (
              <Link href="/login" className="headerLink">
                Login
              </Link>
            ))}
        </div>

        <Link href="/contact" className="headerLink">
          お問い合わせ
        </Link>
      </div>
    </header>
  );
};
