"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Post } from "@/app/types/Post";

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("/api/admin/posts");
      const { posts } = await res.json();
      setPosts(posts);
    };
    fetcher();
  }, []);

  return (
    <div>
      <div>
        {/* 「justify-between」は左右に要素を広げ、「items-center」は上下中央に配置します。「mb-8」は下に少し余白を作っています。*/}
        <div className="mb-8 flex items-center justify-between">
          {/*「text-xl」は文字を大きくし、「font-bold」は文字を太くします。 */}
          <h1 className="text-xl font-bold ">記事一覧</h1>
          {/*「bg-blue-500」は青色の背景を指定し、「hover:bg-blue-700」はマウスを乗せたときに色を変えます。
          「text-white」は文字を白くし、「font-bold」は文字を太くします。「py-2 px-4」は上下左右の内側に余白を作り、「rounded」は角を丸くします。 */}
          <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
            <Link href="/admin/posts/new">新規作成</Link>
          </button>
        </div>
      </div>

      <div>
        {posts.map((post) => {
          return (
            <Link href={`/admin/posts/${post.id}`} key={post.id}>
              {/* 記事のボックスです。「border-b」は下に線を引き、「border-gray-300」はその線を灰色にします。「p-4」は内側に余白を作り、
              「hover:bg-gray-100」はマウスを乗せたときに背景色を変えます。「cursor-pointer」はマウスを乗せたときにポインターを手の形にします。*/}
              <div className="cursor-pointer border-b border-gray-300 p-4 hover:bg-gray-100">
                {/*text-xl は、文字のサイズを「エクストララージ（Extra Large）」 */}
                <div className="text-xl font-bold">{post.title}</div>

                {/*「text-gray-500」は文字を灰色にします。
                `{new Date(post.createdAt).toLocaleDateString()}`はJavaScriptのコードで、記事の作成日を日付形式で表示 */}
                <div className="text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
