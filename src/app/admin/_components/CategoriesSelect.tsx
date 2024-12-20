import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Category } from "@/app/types/Category";
import { useEffect } from "react";

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
  console.log(selectedCategories);

  // 29-41行目は選択されたカテゴリーがすでにリストに含まれている場合は削除し、含まれていない場合は追加するように設計
  // handleChange: ユーザーがカテゴリーを選択または解除したときに呼ばれる関数
  // value: number[]:選択されたカテゴリーのIDの配列

  // const handleChange = (value: Category[]) => {
  //   //value.forEach((v: number) => { ... })**: value の各IDについて処理を行います。
  //   value.forEach((v) => {
  //     //isSelect は、現在のID(=v) が selectedCategories に含まれているかどうかをチェック
  //     //some method(JS): 配列の中に条件を満たす要素があるかどうかを確認。ここでは、選択されたカテゴリーの中に同じIDがあるかどうかをチェック
  //     const isSelect = selectedCategories.some((c) => c.id === v.id);
  //     console.log(isSelect);

  //     if (isSelect) {
  //       //もし isSelect が true なら、そのカテゴリーはすでに選択されているため、選択を解除
  //       //filter　method(JS): 配列から条件を満たす要素だけを残します。ここでは、選択を解除するカテゴリーを除外
  //       setSelectedCategories(selectedCategories.filter((c) => c.id !== v.id));
  //       //returnで処理を終了するため、ユーザーが選択を解除した場合、それ以降の処理は行われません。
  //       return;
  //     }
  //     //新たに選択された場合,find メソッド(JS)を使って、現在のID(=v)に対応するカテゴリーを categories の中から探します。
  //     const category = categories.find((c) => c.id === v.id);
  //     // もし category が見つからなかった場合、処理を終了します。
  //     if (!category) return;

  //     //新たに選択されたカテゴリーを selectedCategories に追加します。
  //     //...selectedCategories**: これは、`selectedCategories` の中にあるすべてのカテゴリーを展開します。
  //     //例えば、`selectedCategories` が[Category1, Category2] という2つのカテゴリーを含んでいる場合、 `Category1` と Category2 を展開します。
  //     //category**: これは、新たに選択された Category3 を指します。
  //     //新しい配列 [Category1, Category2, Category3] を setSelectedCategories に渡すことで、 状態を更新し、選択されたカテゴリーのリストを最新のものにします
  //     setSelectedCategories([...selectedCategories, category]);
  //   });
  // };
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("/api/admin/categories");
      const { categories } = await res.json();
      setCategories(categories);
    };
    fetcher();
  }, []);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedIds = event.target.value as number[]; // 選択されたIDの配列を取得
    const newSelectedCategories = categories.filter((category) =>
      selectedIds.includes(category.id)
    );
    setSelectedCategories(newSelectedCategories); // 新しい選択状態を更新
  };

  console.log(selectedCategories);

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
