"use client"; //ファイルがクライアントサイド（ユーザーのブラウザ上）で実行される

import { useState } from "react";
import { useRouter } from "next/navigation"; //Next.jsの機能のひとつで、ページ間の移動をプログラムで制御するために使う
import { PostForm } from "@/app/admin/_components/PostForm"; //`PostForm`という名前のコンポーネントを持ってくるため
import { Category } from "@/app/types/Category"; //Category`という名前の型（TypeScriptの型）を持ってくるため

export default function Page() {
  const [title, setTitle] = useState(""); //`title`という状態（変数）と、その状態を更新するための関数`setTitle`を定義.("")は初期値で、ここでは空の文字列を設定
  const [content, setContent] = useState(""); //ブログの本文などを管理するため
  const [thumbnailUrl, setThumbnailUrl] = useState(
    "https://placehold.jp/800x400.png"
  ); //サムネイル画像のURLを管理するための状態.初期値として、`https://placehold.jp/800x400.png`というダミーの画像URLが設定
  //カテゴリー情報を管理するための状態.Category[]は「カテゴリーの配列」という型を示しており、初期値は空の配列`[]`です。
  // これにより、複数のカテゴリーを管理できるようになる
  const [categories, setCategories] = useState<Category[]>([]);

  const router = useRouter(); //`router`を使うことでボタンをクリックしたときに別のページに移動する、といった操作ができる

  //e:フォームが送信されるときに発生するイベントの情報
  //`React.FormEvent`は、このイベントがフォームに関するものであることを示している
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); //フォームの「デフォルトの動作」をキャンセル

    // サーバーにデータを送信して記事を作成します。
    //`res`は、`fetch`関数が返すレスポンス（応答）を受け取るための変数
    //fetch('/api/admin/posts', { ... }):記事を作成するためのリクエストを送る
    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST", //POSTメソッドは、サーバーに新しいデータを送信するときに使う。ここでは記事のデータをサーバーに送って新しい記事を作成
        //headers:リクエストに関する追加情報を指定するため
        headers: {
          "Content-Type": "application/json", //送信するデータがJSON形式であることを示す
        },
        //body:サーバーに送信するデータの内容
        //JSON.stringify:JavaScriptのオブジェクトをJSON形式の文字列に変換する関数
        body: JSON.stringify({ title, content, thumbnailUrl, categories }), //`title`（タイトル）、`content`（内容）、`thumbnailUrl`（サムネイルのURL）、`categories`（カテゴリー）を含むオブジェクトをJSON形式に変換して送信
      });

      // レスポンスから作成した記事のIDを取得します。
      // ここで取得している`id`は、サーバーが(POSTで)返してきた新しく作成された記事のID.
      const { id } = await res.json(); //レスポンスから取得したデータの中から`id`というプロパティを取り出している

      // 作成した記事の編集ページに遷移します。
      //router.push():Next.jsの`useRouter`フックで提供されるメソッドで、指定したURL「()内のURL」にページを移動させるために使う
      router.push(`/admin/posts/${id}`);

      //alert():ブラウザでポップアップメッセージを表示するための関数
      //「記事を作成しました。」というメッセージを表示して、ユーザーに記事が無事に作成されたことを知らせている
      alert("記事を作成しました。");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("記事の作成に失敗しました。もう一度実施してください。");
    }
  };

  return (
    //`container`は中央にコンテンツを配置するためのクラスで、
    // `mx-auto`は左右のマージンを自動で設定して中央寄せにします。
    // `px-4`は、左右にパディング（内側の余白）を4単位分設定します。
    <div className="container mx-auto px-4">
      {/*mb-8は、margin-bottomなので下に8単位分のマージン（外側の余白）を設定します。
        これにより、次の要素(title,content etc)との間にスペースを作ります。*/}
      <div className="mb-8">
        {/*mb-4は下に4単位分のマージンを設定し、
          `text-2xl`はフォントサイズを大きく（2倍）設定します。
          `font-bold`は、文字を太字にします。*/}
        <h1 className="mb-4 text-2xl font-bold">記事作成</h1>
      </div>
      <PostForm //別のコンポーネント`PostForm`を使って、記事作成フォームを表示
        mode="new" //フォームが新しい記事を作成するモードであることを示しています
        //↓`PostForm`内で｛　｝の状態を使って、ユーザーの入力を管理することができます
        title={title} //`title`という状態を`PostForm`のコンポーネントに渡しています
        setTitle={setTitle} //`setTitleという状態を`PostForm`のコンポーネントに渡しています
        content={content}
        setContent={setContent}
        thumbnailUrl={thumbnailUrl}
        setThumbnailUrl={setThumbnailUrl}
        categories={categories}
        setCategories={setCategories}
        //onSubmit={handleSubmit}：フォームが送信されたときに実行する関数を指定しています。`
        // handleSubmit`は、記事を作成するための処理を行う関数（22行目-50行目の処理が走る）
        onSubmit={handleSubmit}
      />
    </div>
  );
}
