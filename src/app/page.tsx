"use client";
import { useState, useEffect } from "react";
import type { Post } from "@/app/types/Post";
import { PostSummary } from "./_components/PostSummary";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MicroCmsPost } from "./types/MicroCmsPost";

export default function Page() {
  // 投稿データを「状態」として管理 (初期値はnull)
  const [posts, setPosts] = useState<MicroCmsPost[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("https://2s94i47buf.microcms.io/api/v1/posts", {
        headers: {
          "X-MICROCMS-API-KEY": process.env
            .NEXT_PUBLIC_MICROCMS_API_KEY as string,
        },
      });

      //分割代入でconst {posts}=...は書かれている。 { posts: Post[] } は { posts　}の型指定。
      //複数の投稿を扱うため、レスポンスが`{ posts: [...] }`という形式。だから、以下のようにかける。
      const { contents }: { contents: MicroCmsPost[] } = await res.json();
      setPosts(contents);
      setLoading(false);
    };

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
            {post.categories.map((category, index) => (
              <li
                className="rounded border border-blue-500 px-2.5 py-[1.25] text-sm text-blue-600"
                key={index}
              >
                {category.name}
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
