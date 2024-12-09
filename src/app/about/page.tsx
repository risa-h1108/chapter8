"use client";
import Image from "next/image";
//"tailwind-merge"はTailwind CSSのクラスをマージするための便利なツールで、重複するスタイルを一つにまとめてくれます。
import { twMerge } from "tailwind-merge";

const Page: React.FC = () => {
  return (
    <main>
      {/*`mb-5`はマージンボトムを設定し、`text-2xl`はフォントサイズを大きくし、`font-bold`はフォントを太字にします。*/}
      <div className="mb-5 text-2xl font-bold">About</div>

      {/*twMerge`関数を使ってクラスをマージしています。`mx-auto`は水平方向のマージンを自動に設定し、
      `mb-5`はマージンボトムを設定、`w-full`は幅を100%に、`md:w-2/3`は中サイズ以上のスクリーンで幅を2/3に設定します。
      `flex justify-center`はフレックスボックスを使ってコンテンツを中央に配置します。 */}
      <div
        className={twMerge(
          "mx-auto mb-5 w-full md:w-2/3",
          "flex justify-center"
        )}
      >
        <Image
          src="/images/avatar.png"
          alt="Sample Image"
          width={350}
          height={350}
          priority
          className="rounded-full border-4 border-slate-500 p-1.5"
        />
      </div>
    </main>
  );
};

export default Page;
