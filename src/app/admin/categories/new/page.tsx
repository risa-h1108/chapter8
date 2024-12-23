"use client";

import { useState } from "react";
import { Post } from "@/app/types/Post";
import { useRouter } from "next/navigation";
import { CategoryForm } from "@/app/admin/categories/_components/CategoryForm";

export default function Page() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); //フォームのデフォルトの動作をなしにする

    try {
      const res = await fetch(
        "/api/admin/categories", //データを送る先のURL
        {
          method: "POST", //「新しいものを作りたいよ」という意味
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }), //送るデータの中身
        }
      );
      if (!res.ok) {
        throw new Error("Failed to create category");
      }

      // レスポンスから作成したカテゴリーのIDを取得します。
      const { id } = await res.json();
      router.push(`/admin/categories/${id}`);
      alert("カテゴリーを作成しました。");
    } catch (error) {
      console.error("Error creating category:", error);
      alert("カテゴリーの作成に失敗しました。もう一度ご実施ください。");
    }
  };

  return (
    //auto：ブラウザにをマージン（外側の余白）を自動調整させる値
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="mb-4 text-2xl font-bold">カテゴリー作成</h1>
      </div>

      <CategoryForm
        mode="new"
        name={name}
        setName={setName}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
