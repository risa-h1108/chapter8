"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Post } from "@/app/types/Post";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useSupabaseSession(); // 👈 useSupabaseSessionからtokenを取得

  useEffect(() => {
    const fetcher = async () => {
      if (!token) return; //tokenがない場合は何もしない
      setLoading(true); // 読み込み開始時にローディング状態をtrueに設定

      const res = await fetch("/api/admin/posts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // 👈 Header に token を付与
        },
      });

      //APIリクエストの結果をチェックし、リクエストが成功したかどうかを確認する
      if (!res.ok) {
        console.error("Failed to fetch posts");
        setLoading(false); //ローディング状態を解除するために使用（ユーザーに対して読み込み中の表示を終了し、適切なエラーメッセージを表示するため）
        return;
      }

      const { posts } = await res.json();
      setPosts([...posts]);
      setLoading(false); // 読み込み完了時にローディング状態をfalseに設定
    };
    fetcher();
  }, [token]);

  if (loading)
    return (
      <div className="m-5 mx-auto text-center text-sm font-bold">
        読み込み中...
      </div>
    ); // 読み込み中の表示

  if (!posts) return <div className="text-gray-500">まだ記事がありません</div>; // 記事がない場合の表示

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
