"use client";
import { MicroCmsPost } from "@/app/_types/MicroCmsPost";
import React, { useEffect, useState } from "react";
// Next.jsのフックで、現在のページのURLパラメータを取得するために使います。例えば、URLが`/posts/1`の場合、`1`というパラメータを取得できます。
import { useParams } from "next/navigation";
//Imageは、Next.jsが提供する画像表示用のコンポーネントです。パフォーマンスを最適化し、レスポンシブな画像を簡単に実装できます。
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Detail: React.FC = () => {
  const { id } = useParams();
  //ここで返ってきたデータを入れる、MicroCmsPost[]で返ってくるので、postsではなくこれを入れる。
  const [post, setPost] = useState<MicroCmsPost | null>(null);
  const [loading, setLoading] = useState(false);

  // APIでpostsを取得する処理をuseEffectで実行します。
  useEffect(() => {
    const fetcher = async () => {
      setLoading(true);
      const res = await fetch(
        `https://2s94i47buf.microcms.io/api/v1/posts/${id}`,
        {
          headers: {
            "X-MICROCMS-API-KEY": process.env
              .NEXT_PUBLIC_MICROCMS_API_KEY as string,
          },
        }
      );

      //Home.tsxと異なり、Detailでは特定の投稿1件を扱うため、レスポンスが`{ post: {...} }`という形式。
      //そのため、`const { posts }`と書くことはできない
      const data: MicroCmsPost = await res.json();
      setPost(data);
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
      <div className="mx-auto my-0 w-96 max-w-3xl">
        <Image
          src={post.thumbnail.url}
          alt="sampleImage"
          //ここで画像の高さと幅を書かないとエラーがでる。
          width={800}
          height={400}
        />
        <div className="mb-[10px] flex items-center justify-between">
          <div className="mr-1 text-sm text-[#888888]">
            {new Date(post.createdAt).toLocaleDateString()}
          </div>
          <ul className="m-0 mb-2.5 flex list-none gap-2.5 p-0">
            {post.categories.map((category, id) => (
              <li
                className="rounded border border-blue-500 px-2.5 py-[1.25] text-sm text-blue-600"
                key={id}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>
        <h2 className="mb-10 text-xl font-bold leading-7 ">{post.title}</h2>
        <p
          className="leading-[1.6] "
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </Link>
  );
};

export default Detail;
