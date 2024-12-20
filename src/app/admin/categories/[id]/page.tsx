//カテゴリー編集ページ admin/categories/[id]

import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Page() {
  const [name, setName] = useState("");
  const { id } = useParams();
  const router = useRouter();
}
