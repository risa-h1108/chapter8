import { Category } from "./Category";

export type PostCategory = {
  id: number;
  postId: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  category: Category; // 関連するCategoryオブジェクトs
};
