import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

//prisma という名前でPrismaクライアントを作成。このクライアントを使ってデータベース操作を行うことができる
//Prismaクライアント:PrismaというORM（オブジェクトリレーショナルマッピング）ツールを使ってデータベースにアクセスするためのクライアント
const prisma = new PrismaClient();

// GETという命名にすることで、GETリクエストの時にこの関数が呼ばれる
export const GET = async (request: NextRequest) => {
  //try...(実施/取得内容)catch...（エラー内容）
  try {
    // Postの一覧をDBから取得
    //posts: Post[] のままでは「型」の不一致によるエラーが発生する可能性があるため
    const posts = await prisma.post.findMany({
      include: {
        // カテゴリーも含めて取得
        postCategories: {
          include: {
            category: {
              // カテゴリーのidとnameだけ取得
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      // 作成日時の降順で取得
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log(posts);

    // レスポンスを返す
    return NextResponse.json({ status: "OK", posts: posts }, { status: 200 });
  } catch (error) {
    //[error instanceof Error]はおまじないみたいなもの
    //エラーが必ずしも Error オブジェクトではない場合もあるため、エラーハンドリングの際に instanceof を使って確認することが重要
    if (error instanceof Error)
      //status: 400 はHTTPステータスコードで、クライアントのリクエストに問題があったことを示す
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};
