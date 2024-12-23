"use client";
import type { Post } from "@/app/_types/Post";
import React, { useEffect, useState } from "react";
import Link from "next/link";

//src/app/_types/Post.tsのPost定義を型定義に使用している
//(単一の) 投稿記事 を受け取り、その title と content を表示するコンポーネントとなっている
interface Props {
  post: Post;
}

//<Props>は、[ PostSummary]のコンポーネントが受け取るプロパティ（データ）の型を定義するためのもの.
//(props)は、`PostSummary`コンポーネントが受け取るプロパティを指す。このプロパティには`post`というオブジェクトが含まれていることが前提
export const PostSummary: React.FC<Props> = (props) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts"
      );
      //分割代入でconst {posts}=...は書かれている。 { posts: Post[] } は { posts　}の型指定。
      //複数の投稿を扱うため、レスポンスが`{ posts: [...] }`という形式。だから、以下のようにかける。
      const { posts }: { posts: Post[] } = await res.json();
      setPosts(posts);
      setLoading(false);
    };

    fetcher();
  }, []);

  if (loading)
    return (
      <div className="m-5 mx-auto text-center text-sm font-bold">
        読み込み中…
      </div>
    );

  if (!posts)
    return <div className="text-gray-500">記事が見つかりませんでした。</div>;

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
              <li key={index}>{category}</li>
            ))}
          </ul>
        </div>

        <h2>{post.title}</h2>
        <p
          className="leading-[1.6]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </Link>
    </div>
  ));
};
