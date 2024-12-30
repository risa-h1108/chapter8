"use client";

import { useEffect, useState } from "react";
//useParams はURLの情報を取得します。
//useRouter はページを移動するために使います。
import { useParams, useRouter } from "next/navigation";
import { PostForm } from "@/app/admin/_components/PostForm";
import { Category } from "@/app/types/Category";
import { Post } from "@/app/types/Post";
import { useSupabaseSession } from "@/app/_hooks/useSupaSession";

export default function Page() {
  //useState(""):初期値を空の文字列に設定
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnailImageKey, setThumbnailImageKey] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  //URLに含まれる`id`というパラメータを取得
  const { id } = useParams();

  //ページ移動をするための典型文、特定のウェブページの状態管理やルーティングに関連する処理を行うための準備
  const router = useRouter();
  const { token } = useSupabaseSession(); // useSupabaseSessionからトークンを取得

  //`React.FormEvent`:TypeScriptを使っている場合に、`e`がReactのフォームイベントであることを型注釈として指定
  const handleSubmit = async (e: React.FormEvent) => {
    // フォームのデフォルトの動作をキャンセルします。
    e.preventDefault();
    try {
      // 記事を作成します。
      await fetch(`/api/admin/posts/${id}`, {
        //記事の情報を更新するために`PUT`を使用
        method: "PUT",
        headers: {
          Authorization: token || "", //tokenがnullの場合は空文字列を使う
          //送信するデータ(Content-Type コンテンツタイプ)がJSON形式であることを示す
          "Content-Type": "application/json",
        },
        //`JSON.stringify`を使ってJavaScriptオブジェクトをJSON文字列に変換
        body: JSON.stringify({ title, content, thumbnailImageKey, categories }),
      });
      alert("記事を更新しました。");
    } catch (error) {
      console.error("Error fetching post:", error);
      alert("失敗しました。もう一度お試しください。");
    }
  };
  //記事を削除する
  //### 以下コードの全体の流れ
  //1. ユーザーに記事を削除するかどうかを確認します。
  //2. ユーザーが「OK」を選択した場合、指定した記事を削除するために`DELETE`リクエストを送信します。
  //3. 削除が完了したことをアラートで通知します。
  //4. 投稿一覧ページにリダイレクトします。

  const handleDeletePost = async () => {
    //confirm: ブラウザの組み込み関数で、確認ダイアログを表示
    // ユーザーが「OK」をクリックすると`true`を返し、「キャンセル」をクリックすると`false`を返します。
    if (!confirm("記事を削除しますか？"))
      // return:ユーザーが削除をキャンセルした場合、関数を終了させる
      return;
    try {
      await fetch(`/api/admin/posts/${id}`, {
        //指定したリソースを削除するリクエストを送信
        method: "DELETE",
      });

      alert("記事を削除しました。");
    } catch (error) {
      console.error("Error deleting posts:", error);
      alert("記事の削除に失敗しました。再度実施してください。");
    }

    // ページ遷移を行うための関数
    //削除後に管理者用の投稿一覧ページ`/admin/posts`にリダイレクトする
    router.push("/admin/posts");
  };

  //### 以下コードの流れ
  //1. コンポーネントがマウントされたとき、または`id`が変化したときに`useEffect`が実行されます。
  //2. fetcher関数が呼び出され、APIから記事データを取得します。
  //3. 取得したデータを使って、コンポーネントの状態を更新します。
  //このコードは、記事の編集ページや詳細ページで、特定の記事情報を表示するために必要なデータを取得し、状態に反映させるために使われます。
  // これにより、ユーザーがページを開いたときに最新の情報が表示されます。
  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch(`/api/admin/posts/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        console.log(data); // 全体のデータを確認

        if (data.post) {
          const { post }: { post: Post } = data;
          console.log(post.postCategories); // カテゴリがあるか確認

          setTitle(post.title);
          setContent(post.content);
          setThumbnailImageKey(post.thumbnailImageKey);

          // post.postCategories（サーバーからのレスポンス）からCategory[]（フロントエンドの期待の型）への変換
          const categories = post.postCategories.map((pc) => pc.category);
          setCategories(categories);
        } else {
          console.error("Post data is missing");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        alert("記事の更新に失敗しました。もう一度お試しください。");
      }
    };

    fetcher();
  }, [id]);

  return (
    //mx-auto:横方向の中央揃え
    <div className="container mx-auto px-4">
      <div className="mb-8">
        {/*mb:margin-button  
            text-2xl :フォントサイズ(=text)*/}
        <h1 className="mb-4 text-2xl font-bold">記事編集</h1>
      </div>

      {/*記事を編集するためのフォームを表示
          PostForm:別のReactコンポーネント*/}
      <PostForm
        mode="edit" //フォームが編集モード
        title={title} //{title}:`PostForm` コンポーネント内で props.title として使用できるようになる
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        thumbnailImageKey={thumbnailImageKey}
        setThumbnailImageKey={setThumbnailImageKey}
        categories={categories}
        setCategories={setCategories}
        onSubmit={handleSubmit} //ユーザーがフォームを送信
        onDelete={handleDeletePost} //記事を削除
      />
    </div>
  );
}
