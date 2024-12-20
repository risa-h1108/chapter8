import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (request: NextRequest) => {
  try {
    // prisma.post.findMany は、データベースから複数の投稿を取得するメソッド

    const posts = await prisma.post.findMany({
      //include オプションを使って、投稿に関連するカテゴリー情報も一緒に取得しています。
      include: {
        postCategories: {
          include: {
            category: {
              // select オプションで、カテゴリーの`id`と`name`のみを取得するように指定しています。
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      //orderBy オプションで、投稿の作成日時（`createdAt`）の降順でデータを取得します。つまり、新しい投稿が最初に来るように並べます。
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ status: "OK", posts: posts }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};

// 記事作成のリクエストボディの型
interface CreatePostRequestBody {
  title: string;
  content: string;
  categories: { id: number }[];
  thumbnailUrl: string;
}

// POSTという命名にすることで、POSTリクエストの時にこの関数が呼ばれる
export const POST = async (request: Request, context: any) => {
  try {
    // リクエストのbodyを取得
    const body = await request.json();

    // bodyの中からtitle, content, categories, thumbnailUrlを取り出す
    const { title, content, categories, thumbnailUrl }: CreatePostRequestBody =
      body;

    // 投稿をDBに生成
    //prisma.post.create を使って、新しい投稿をデータベースに作成
    const data = await prisma.post.create({
      data: {
        title,
        content,
        thumbnailUrl,
      },
    });

    // 記事とカテゴリーの中間テーブルのレコードをDBに生成
    // 本来複数同時生成には、createManyというメソッドがあるが、sqliteではcreateManyが使えないので、for文1つずつ実施
    //for...of`ループを使って、`categories` という配列を1つずつ反復処理するための構文
    //element は、`iterable` の現在の要素を表します。
    // iterable は、配列やその他のイテラブルオブジェクト
    for (const category of categories) {
      // カテゴリが存在するか確認
      const existingCategory = await prisma.category.findUnique({
        where: { id: category.id },
      });

      // カテゴリが存在しない場合はエラーを返す
      if (!existingCategory) {
        return NextResponse.json(
          {
            status: "error",
            message: `カテゴリID ${category.id} が存在しません。`,
          },
          { status: 400 }
        );
      }

      // categories に含まれる各カテゴリについて、`prisma.postCategory.create` を使って記事とカテゴリの関連をデータベースに保存
      // カテゴリが存在する場合は、記事とカテゴリの関連を作成
      await prisma.postCategory.create({
        data: {
          categoryId: category.id,
          postId: data.id,
        },
      });
    }

    // (作成された投稿のIDも含めて,新しい投稿が正常に作成されたことを示すJSON)レスポンスを返す
    return NextResponse.json({
      status: "OK",
      message: "作成しました",
      id: data.id,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
};
