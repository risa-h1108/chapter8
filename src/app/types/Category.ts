//type:型エイリアスを定義するためや、オブジェクトの構造やデータの形を指定するためのもの
//typeはInterfaceと同じようなもので「 | 」のやつも指定できる。迷ったらtype
//const: 変数を定義するためや、値が再代入されない変数を宣言するためのもの
export interface Category {
  id: number;
  name: string;
  category: Category;
  createdAt: string;
  updatedAt: string;
}
