import { Category } from "./Category";
import { CoverImage } from "./CoverImage";

export type Post = {
  id: number;
  title: string;
  thumbnailUrl: string;
  createdAt: string;
  categories: string[];
  content: string;
  coverImage: CoverImage;
};
