"use client";
import type { Post } from "@/app/_types/Post";
import React, { useEffect, useState } from "react";
// Next.jsのフックで、現在のページのURLパラメータを取得するために使います。例えば、URLが`/posts/1`の場合、`1`というパラメータを取得できます。
import { useParams } from "next/navigation";
//Imageは、Next.jsが提供する画像表示用のコンポーネントです。パフォーマンスを最適化し、レスポンシブな画像を簡単に実装できます。
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Page: React.FC = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);

  // APIでpostsを取得する処理をuseEffectで実行します。
  useEffect(() => {
    const fetcher = async () => {
      setLoading(true);
      const res = await fetch(
        `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`
      );
      //Home.tsxと異なり、Detailでは特定の投稿1件を扱うため、レスポンスが`{ post: {...} }`という形式。
      //そのため、`const { posts }`と書くことはできない
      const data = await res.json();
      setPost(data.post);
      setLoading(false);
    };

    fetcher();
  }, [id]);

  if (loading)
    return (
      <div className="m-5 mx-auto text-center text-sm font-bold">
        読み込み中...
      </div>
    );
  if (!post)
    return <div className="text-gray-500">記事が見つかりませんでした。</div>;

  return (
    <Link href={`/posts/${post.id}`}>
      <div className="mb-1 text-lg font-bold">{post.title}</div>
      <div
        className="line-clamp-3"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="mx-auto my-0 max-w-3xl">
        <Image src={post.thumbnailUrl} alt="sampleImage" />
        <div className="mb-[10px] flex items-center justify-between">
          <div className="mr-1 text-sm text-[#888888]">
            {new Date(post.createdAt).toLocaleDateString()}
          </div>
          <ul className="m-0 mb-2.5 flex list-none gap-2.5 p-0">
            {post.categories.map((category, id) => (
              <li key={id}>{category}</li>
            ))}
          </ul>
        </div>
        <h2>{post.title}</h2>
        <p
          className="leading-[1.6]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </Link>
  );
};
