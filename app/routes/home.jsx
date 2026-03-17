import { Link } from "react-router";
import { Welcome } from "../welcome/welcome";
import Latest from "./components/Latest";

export async function clientLoader() {
  const res = await fetch("https://themealdb.com/api/json/v1/1/search.php?f=a");
  const data = await res.json();
  return { mealData: data.meals };
}

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home({ loaderData }) {
  const { mealData } = loaderData;

  return (
    <div>
      <Welcome />
      <Link to="meals">Go to meals</Link>
      <Latest meals={mealData} />
    </div>
  )

}