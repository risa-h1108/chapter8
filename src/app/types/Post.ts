import { CoverImage } from "./CoverImage";
import { PostCategory } from "./PostCategory";

export type Post = {
  id: number;
  title: string;
  thumbnailUrl: string;
  createdAt: string;
  postCategories: PostCategory[];
  content: string;
  coverImage: CoverImage;
};
