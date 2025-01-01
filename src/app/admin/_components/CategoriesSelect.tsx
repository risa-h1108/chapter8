import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Category } from "@/app/types/Category";
import { useEffect } from "react";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

interface Props {
  //selectedCategories: Category 型の配列,現在どのカテゴリーが選ばれているかを示す
  selectedCategories: Category[];
  //void は、この関数が何も返さない（戻り値がない）ことを示しています。
  //setSelectedCategories: 選択されたカテゴリーを更新するための関数
  setSelectedCategories: (categories: Category[]) => void;
}

export const CategoriesSelect: React.FC<Props> = ({
  //分割代入
  //selectedCategories: この変数には、`Props` インターフェースで定義されている selectedCategories プロパティの値が入ります。
  //setSelectedCategories: この変数には、`Props` インターフェースで定義されている setSelectedCategories プロパティの値が入ります。
  selectedCategories,
  setSelectedCategories,
}) => {
  //React.useState<Category[]>([]): 初期値は空の配列で、カテゴリーのデータは後でサーバーから取得
  const [categories, setCategories] = React.useState<Category[]>([]);
  const { token } = useSupabaseSession(); // useSupabaseSessionからトークンを取得

  useEffect(() => {
    const fetcher = async () => {
      if (!token) return;
      try {
        const res = await fetch("/api/admin/categories", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        const { categories } = await res.json();

        console.log(categories);
        setCategories(categories);
      } catch (error) {
        console.error(error);
        alert("カテゴリーの取得に失敗しました。再度試してください");
      }
    };
    fetcher();
  }, [token]);

  const handleChange = (event: SelectChangeEvent<number[]>) => {
    const selectedIds = event.target.value as number[]; // 選択されたIDの配列を取得
    const newSelectedCategories = categories.filter((category) =>
      selectedIds.includes(category.id)
    );
    setSelectedCategories(newSelectedCategories); // 新しい選択状態を更新
  };

  return (
    //FormControl:MUIのコンポーネントで、フォーム要素をラップして一貫したスタイルを提供
    <FormControl className="w-full">
      {/* Select:複数選択が可能なドロップダウンメニューを提供するMUIのコンポーネント*/}
      <Select
        /*multiple:複数の項目を選択できるようになる */
        multiple
        value={selectedCategories.map((category) => category.id)} // 現在選択されているカテゴリーのオブジェクト配列
        // /* onChange:ユーザーが選択を変更したときに呼ばれる関数
        // e.target.value:ユーザーが選択した値を取得
        // `e.target.value` の型を number[]（数値の配列）にinしている*/
        onChange={handleChange} // 型を明示
        // /*Material-UIのコンポーネントで、入力フィールドのスタイルを指定
        // OutlinedInput:フィールドの周りにアウトライン（枠線）が表示されるスタイル*/
        input={<OutlinedInput />}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return "カテゴリーを選択"; // 初期状態の表示
          }
          return (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((id) => {
                const category = categories.find((c) => c.id === id);
                return category ? (
                  <Chip key={category.id} label={category.name} />
                ) : null;
              })}
            </Box>
          );
        }}
      >
        {categories.map((category) => (
          //MenuItem は、ユーザーが選択できる項目を表示します。例えば、ドロップダウンメニューの中で、ユーザーがクリックして選ぶことができる項目など
          // key と value にカテゴリーのIDを設定し、表示するテキストとしてカテゴリーの名前を指定
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
