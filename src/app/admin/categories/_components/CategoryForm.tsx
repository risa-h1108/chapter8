//src\app\admin\categories\[id]\page.tsx
// src\app\admin\categories\new\page.tsx
// 上記で使う表示の枠組みの部分

import React from "react";

//型定義
interface Props {
  mode: "new" | "edit"; //文字列型で、「new」（新規）か「edit」（編集）のどちらかの値を保持できる
  name: string;
  setName: (title: string) => void; //返り値なし、setName：名前を設定するための関数
  onSubmit: (e: React.FormEvent) => void; //フォームを送信する時に使用
  onDelete?: () => void; //削除の操作を行うために使用、 onDelete?：何も引数を受け取らず（?：あってもなくても良いを示す）、何も返さない（void）
}

//CategoryFormの型定義にReact.FCと先程定義した<Props>を付与
export const CategoryForm: React.FC<Props> = ({
  //部品(コンポーネント)が受け取る「データや関数」のリスト
  mode,
  name,
  setName,
  onSubmit,
  onDelete,
}) => {
  //form:ユーザーが情報を入力するための部分
  //onSubmit={onSubmit}:フォームが送信されたときに何をするかを決める部分
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="title" //htmlFor：右側のラベルがどの入力欄に対応しているかを示す(title部分を示す)。
          className="block text-sm font-medium text-gray-700" //ラベルを「ブロック要素」として扱う。ラベルがその行全体を占有するようになる
        >
          カテゴリー名
        </label>
        {/*ユーザーがテキストを入力できる「入力欄」を作成 */}
        <input
          type="text" //入力欄がテキストを入力するためのもの
          id="title"
          value={name} //入力欄に表示される初期のテキストの値を設定,`name`という変数に入っている値が表示
          //入力欄の内容が変わるたびに実行される関数
          //入力欄の新しい値を`setName`という関数を使って更新する
          //`e.target.value`:入力欄に現在入力されている内容
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-200 p-3"
        />
      </div>
      <button
        type="submit"
        //shadow-sm: 小さな影をつけてボタンを立体的に見せる
        //focus:フォーカスされたときの見た目を指定
        className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {mode === "new" ? "作成" : "更新"}
      </button>
      {mode === "edit" && (
        <button
          type="button"
          className="ml-2 rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          //ボタンがクリックされたときに削除する処理を実施
          onClick={onDelete}
        >
          削除
        </button>
      )}
    </form>
  );
};
