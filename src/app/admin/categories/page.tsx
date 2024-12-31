//カテゴリー一覧ページ admin/categories

"use client";

import Link from "next/link"; //Next.jsでページ間を移動するときに使う道具.ウェブページのリンクを簡単に作ることができる
import { useEffect, useState } from "react"; //useState:ボタンをクリックした回数を数えるような場合(表),useEffect:データの取得や、タイマーの設定など、コンポーネントの表示以外で何かを行うときに使う（裏）
import { Post } from "@/app/types/Post"; //Postという型（型というのは、データの形を定義）をインポート
import { Category } from "@/app/types/Category"; //`Category`という型をインポート(データの形を定義)
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

export default function Page() {
  //categories: 現在のカテゴリーのリストを保持するための変数
  //Category[]: `Category`という型の配列であることを示す。カテゴリーのリストを表しています。
  //([]): 初期状態として空の配列を設定しています。つまり、最初はカテゴリーが何もない状態
  const [categories, setCategories] = useState<Category[]>([]);

  const { token } = useSupabaseSession(); // useSupabaseSessionからトークンを取得

  //useEffect:コンポーネントが画面に表示されたときに実行される処理を定義するためのフック
  useEffect(() => {
    if (!token) return;
    const fetcher = async () => {
      //`/api/admin/categories`というURLからカテゴリーのデータを取得しています。
      const res = await fetch("/api/admin/categories", {
        headers: {
          //JSONから受け取ったデータの中から`categories`というプロパティを取り出しています。
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const { categories } = await res.json(); //`fetch`関数を使って取得したレスポンス（`res`）をJSON形式に変換
      //`useState`フックで定義した`setCategories`関数を使って、取得した`categories`のデータをセットしています。
      // categories`という状態が更新され、ページが再レンダリングされることで、最新のカテゴリー情報が画面に表示されます。
      setCategories(categories);
    };

    fetcher(); //先ほど定義した`fetcher`という非同期関数を呼び出しています。これにより、実際にデータの取得と状態の更新が行われます。
  }, [token]); //空の配列を渡すことで、この`useEffect`はコンポーネントの最初のレンダリング時に一度だけ実行される

  //カテゴリーの一覧を表示するためのページを作成しています。
  // ユーザーはカテゴリーの名前をクリックして、その詳細ページに移動することができます。
  // また、新しいカテゴリーを追加するためのボタンも用意されています。

  return (
    <>
      {/*justify-between: 子要素を両端に配置します。 */}
      <div className="mb-8 flex items-center justify-between">
        {/*text-xlは、文字のサイズを「エクストララージ（extra large）=20ピクセル（px）」に相当」に設定するクラス */}
        <h1 className="text-xl font-bold">カテゴリー一覧</h1>
        <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
          {/*href="/admin/categories/new": クリックすると新しいカテゴリーを作成するページに移動します */}
          <Link href={"/admin/categories/new"}>新規作成</Link>
        </button>
      </div>

      <div>
        {/*categoriesの配列をループして、各カテゴリーを表示します。
          categoryは配列の各要素を指します。 */}
        {categories.map((category) => {
          return (
            //href={`/admin/categories/${category.id}`}:各カテゴリーをクリックすると、そのカテゴリーの詳細ページに移動
            //key={category.id}: Reactが要素を効率的に更新するために必要な一意の識別子
            <Link href={`/admin/categories/${category.id}`} key={category.id}>
              {/*border-b border-gray-300: 下に灰色の境界線を引きます。 
                cursor-pointer: マウスカーソルを指の形にします（クリックできることを示します）。*/}
              <div className="cursor-pointer border-b border-gray-300 p-4 hover:bg-gray-100">
                {/*category.name: カテゴリーの名前を表示するためのもの.各カテゴリーのデータから名前を取り出して表示*/}
                <div className="text-xl font-bold">{category.name}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
