"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouteGuard } from "@/app/admin/_hooks/useRouteGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useRouteGuard();

  const pathname = usePathname();
  const isSelected = (href: string) => {
    return pathname.includes(href);
  };

  return (
    <>
      {/* サイドバー */}
      <aside className="fixed bottom-0 left-0 top-[72px] w-[280px] bg-gray-100">
        <Link
          href="/admin/posts"
          className={`block p-4 hover:bg-blue-100 ${
            isSelected("/admin/posts") && "bg-blue-100"
          }`}
        >
          記事一覧
        </Link>
        <Link
          href="/admin/categories"
          className={`block p-4 hover:bg-blue-100 ${
            isSelected("/admin/categories") && "bg-blue-100"
          }`}
        >
          カテゴリー一覧
        </Link>
      </aside>

      {/* メインエリア */}
      <div className="ml-[280px] p-4">{children}</div>
    </>
  );
}
