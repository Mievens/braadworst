import { Welcome } from "../welcome/welcome";
import { Link } from "react-router";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div>
      <Welcome />
      <Link to="meals">Go to meals</Link>
    </div>
  )

}
