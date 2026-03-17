import {Link} from "react-router";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div>
      <h1>Welcome to Braadworst Router</h1>
      <Link to="ingredients" className="text-blue-700 hover:underline dark:text-blue-500">
        View Ingredients
      </Link>
    </div>
  );
}
