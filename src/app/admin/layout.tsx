"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout(
  //children:コンポーネントの中に表示されるコンテンツを指す
  { children }: { children: React.ReactNode }
) {
  //usePathname:現在のページのURLパスを取得
  const pathname = usePathname();
  //isSelected:現在のページが特定のリンクに一致しているかを確認するための関数
  const isSelected = (href: string) => {
    return pathname.includes(href);
  };

  return (
    <div>
      {/* サイドバー */}
      {/*     <aside className="fixed bottom-0 left-0 top-[72px] w-[280px] bg-gray-100"></aside>のところ↓*/}
      {/*aside:主に補助的なコンテンツを示すために使われる*/}
      {/*left-0: サイドバーを画面の左端に配置 
    bottom-0: サイドバーの下端を画面の下端に揃える*/}

      {/*    className={`block p-4 hover:bg-blue-100 ${
            isSelected("/admin/posts") && "bg-blue-100"のところ↓*/}
      {/*p-4:上下左右に同じ量(16px)の余白を適用 */}
      {/*hover:bg-blue-100: マウスカーソルがリンクの上にあるときに、背景色が薄い青色に変わる */}
      {/*  isSelected関数を使って、現在のページが`/admin/posts`である場合に背景色を青色にします。*/}
      {/* `isSelected('/admin/posts')`が`true`の場合、`bg-blue-100`が適用されます*/}
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
          className={`block p-4 hover:bg-blue-100 ${isSelected("/admin/categories") && "bg-blue-100"}`}
        >
          カテゴリー一覧
        </Link>
      </aside>

      {/* メインエリア */}
      {/*ml-[280px]:margin leftを280pxで適用 */}
      <div className="ml-[280px] p-4">{children}</div>
    </div>
  );
}
