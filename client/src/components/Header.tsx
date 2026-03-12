import { Link } from "react-router";

export const Header = () => {
  return (
    <header className="px-6 py-4 border-b flex items-center">
      <Link to={"/"} className="font-bold text-2xl">
        Company Property Search
      </Link>
    </header>
  );
};
