import { Category } from "./Category";
import { CoverImage } from "./CoverImage";

export type Post = {
  id: number;
  title: string;
  thumbnailUrl: string;
  createdAt: string;
  postCategories: Category[];
  content: string;
  coverImage: CoverImage;
};
