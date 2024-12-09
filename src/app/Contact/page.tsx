"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch(
        "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const result = await res.json();
      console.log("送信できました", result);
      alert("送信しました");
      reset();
    } catch (error) {
      console.log("送信エラー", error);
      alert("送信エラーです");
    }
  };

  return (
    <>
      <div>
        {/* 通常、フォームのバリデーションや送信時の処理を管理するための関数
       onSubmitは、フォームが送信されたときに呼び出されるイベントハンドラーを指定する
       handleSubmit(onSubmit)の(onSubmit)で呼び出している*/}
        <form className="mx-auto max-w-lg" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="mb-10 text-xl font-bold leading-7">
            問い合わせフォーム
          </h1>
          <div className="mb-6 flex items-center justify-between">
            <label className="block w-60">お名前</label>
            <div className="w-full">
              <input
                className="w-full rounded-md border border-gray-300 p-4"
                type="text"
                {...register("name", {
                  required: "お名前は必須です。",
                  maxLength: {
                    value: 30,
                    message: "お名前は30文字以内で入力してください。",
                  },
                })}
                disabled={isSubmitting}
              />

              {errors.name && (
                <p className="text-sm leading-5 text-red-700">
                  {errors.name?.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <label className="block w-60">メールアドレス</label>
            <div className="w-full">
              <input
                className="w-full rounded-md border border-gray-300 p-4"
                type="email"
                {...register("email", {
                  required: "メールアドレスは必須です。",
                  pattern: {
                    value: /([a-z\d+\-.]+)@([a-z\d-]+(?:\.[a-z]+)*)/i, //正規表現で、メールアドレスの形式を定義している。
                    message: "正しいメールアドレスを入力してください。",
                  },
                })}
                //送信中には入力やボタンを無効化する
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-sm leading-5 text-red-700">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex ">
            <label className=" w-80 border-gray-300 p-4">本文</label>
            <div className="flex w-full">
              <textarea
                className="w-96 rounded-md border border-gray-300 p-4"
                rows={8} //rows={8}は、テキストエリアの高さを8行分に設定しています。
                {...register("message", {
                  required: "本文は必須です。",
                  maxLength: {
                    value: 500,
                    message: "本文は500文字以内で入力してください。",
                  },
                })}
                //送信中には入力やボタンを無効化する
                disabled={isSubmitting}
              />
              {errors.message && (
                <p className="text-sm leading-5 text-red-700">
                  {errors.message.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              className="mr-4 rounded-md bg-gray-800 px-4 py-2 font-bold text-white"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "送信中" : "送信"}
            </button>

            <button
              className="rounded-md bg-gray-300 px-4 py-2 font-bold"
              //type="button":このボタンが通常のボタンであることを示す
              type="button"
              //ボタンがクリックされたときに`reset()`という関数を呼び出す.フォームをリセットする
              onClick={() => reset()}
              //送信中はtype="button" のボタンも無効化
              disabled={isSubmitting}
            >
              クリア
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Contact;
