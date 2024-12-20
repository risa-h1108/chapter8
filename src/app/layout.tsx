import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/app/_components/Header";

export const metadata: Metadata = {
  title: "BlogApp",
  description: "Built to learn Next.js and modern web development.",
};

type Props = {
  children: React.ReactNode;
};

const RootLayout: React.FC<Props> = (props) => {
  const { children } = props;
  return (
    //ページの言語を日本語に設定
    <html lang="ja">
      <body>
        <Header />
        {/*mx-4: 左右に4単位の余白を設定します
       mt-2:上に2単位の余白を設定します。 
        max-w-2xl:最大幅を設定し、ページの幅を制限します。 
        md:mx-auto:画面が中サイズ以上のときに、左右の余白を自動調整して中央に配置します。*/}
        <div className="mx-4 mt-2 max-w-2xl md:mx-auto">{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
