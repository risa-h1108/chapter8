import { useState } from "react";
import { Category } from "./Category";
import { CoverImage } from "./CoverImage";

export interface MicroCmsPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  categories: { id: number; name: string }[] | undefined;
  thumbnailUrl: string | undefined;
}
