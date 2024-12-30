import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // PrismaClientのインスタンス生成

const main = async () => {
  // カテゴリデータの作成 (テーブルに対するレコードの挿入)
  const category1 = await prisma.category.create({
    data: { name: "カテゴリ1" },
  });
  const category2 = await prisma.category.create({
    data: { name: "カテゴリ2" },
  });
  const category3 = await prisma.category.create({
    data: { name: "カテゴリ3" },
  });

  // 投稿記事データの作成  (テーブルに対するレコードの挿入)
  const p1 = await prisma.post.create({
    data: {
      title: "投稿1",
      content: "投稿1の本文。<br/>投稿1の本文。投稿1の本文。",
      thumbnailUrl: "https://w1980.blob.core.windows.net/pg3/cover-img-red.jpg",
      postCategories: {
        create: [{ categoryId: category1.id }, { categoryId: category2.id }], // ◀◀ 注目
      },
    },
  });

  const p2 = await prisma.post.create({
    data: {
      title: "投稿2",
      content: "投稿2の本文。<br/>投稿2の本文。投稿2の本文。",
      thumbnailUrl:
        "https://w1980.blob.core.windows.net/pg3/cover-img-green.jpg",
      postCategories: {
        create: [{ categoryId: category2.id }, { categoryId: category3.id }], // ◀◀ 注目
      },
    },
  });

  console.log(JSON.stringify(p1, null, 2));
  console.log(JSON.stringify(p2, null, 2));
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
