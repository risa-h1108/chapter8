//カテゴリー編集ページ admin/categories/[id]
"use client";

import { useEffect, useState } from "react";
import { Post } from "@/app/types/Post";
import { useParams, useRouter } from "next/navigation";
import { CategoryForm } from "@/app/admin/categories/_components/CategoryForm";
import { useSupabaseSession } from "@/app/_hooks/useSupaSession";

export default function Page() {
  const [name, setName] = useState("");
  const { id } = useParams();
  const router = useRouter();

  const { token } = useSupabaseSession(); // useSupabaseSessionからトークンを取得

  //async(e)=>{e()}の形になる。e：の後にどんな情報なのかを示している
  //`e`は、フォームが送信されたときに自動的に渡される情報を保持
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); //フォームが送信されたときに、ブラウザが持っている「デフォルトの動作」を止めるため

    // カテゴリーを作成します。
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token || "",
        },
        body: JSON.stringify({ name }), //カテゴリー名を表示
      });

      if (!res.ok) {
        throw new Error("Failed to update category");
      }

      alert("カテゴリーを更新しました。");
    } catch (error) {
      console.error("Error updating category:", error);
      alert("カテゴリーの更新に失敗しました。もう一度お試しください。");
    }
  };

  const handleDeletePost = async () => {
    //ユーザーがキャンセルする場合、「!confirm（確認内容の否定）」になるから、削除しないことになる。つまり、returnで処理終了。
    if (!confirm("カテゴリーを削除しますか？")) return;

    try {
      //ユーザーが削除（OK）する場合、「confirm（確認内容の否定「＝！」の否定「＝削除」で肯定）」になる。なので、await fetch以降の処理が走る。
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete category");
      }

      alert("カテゴリーを削除しました。");
      router.push("/admin/categories");
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("カテゴリーの削除に失敗しました。もう一度お試しください。");
    }
  };

  //`id`が変わるたびにデータを取得するように設定
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`/api/admin/categories/${id}`);
      const { category } = await res.json();
      // 取得したカテゴリーの名前(category.name)を`setName`関数で状態に保存
      setName(category.name);
    };

    fetcher();
  }, [id]);

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="mb-4 text-2xl font-bold">カテゴリー編集</h1>
      </div>

      <CategoryForm
        mode="edit"
        name={name}
        setName={setName}
        onSubmit={handleSubmit} //フォームの送信
        onDelete={handleDeletePost} //削除の処理
      />
    </div>
  );
}
