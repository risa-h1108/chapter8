//Home>Header部分
import Link from "next/link";

export const Header: React.FC = () => {
  return (
    <header className="header">
      <Link href="/" className="headerLink">
        Blog
      </Link>
      <Link href="/contact" className="headerLink">
        お問い合わせ
      </Link>
    </header>
  );
};
