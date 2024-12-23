"use client";
import { useState, useEffect } from "react";
import type { Post } from "@/app/types/Post";
import Link from "next/link";

export default function Page() {
  // 投稿データを「状態」として管理 (初期値はnull)
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`/api/posts`);

      const data = await res.json();
      console.log(data);

      setPosts(data.posts);
      setLoading(false);
    };
    console.log(posts);

    fetcher();
  }, []);

  //loadingがtrueだったら,28行目が処理される。
  if (loading) return <div className="text-gray-500">読み込み中…</div>;

  //loadingがfalseかつpostsが空なら,31行目が処理される。
  if (!posts) return <div className="text-gray-500">投稿がありません、、</div>;

  //loadingがfalseかつpostsがあるなら, 34行目が処理される。
  return posts.map((post) => (
    <div key={post.id} className="mb-5 rounded-lg bg-white p-5 shadow-md">
      <Link href={`/posts/${post.id}`} className="text-black no-underline">
        {/* `/posts/${post.id}`の``は、JSの書き方。`post.id`の値が`/posts/の後に続くURLを動的に作成しています。例えば、post.id`が`123`なら、リンク先は`/posts/123`になる*/}

        <div className="mb-[10px] flex items-center justify-between">
          <p className="mr-1 text-sm text-[#888888]">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <ul className="m-0 mb-2.5 flex list-none gap-2.5 p-0">
            {post.postCategories?.map((category, index) => (
              <li
                className="rounded border border-blue-500 px-2.5 py-[1.25] text-sm text-blue-600"
                key={index}
              >
                {category.id}
              </li>
            ))}
          </ul>
        </div>

        <h2 className="mb-10 text-xl font-bold leading-7">{post.title}</h2>
        <p
          className="line-clamp-3 leading-[1.6]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </Link>
    </div>
  ));
}
