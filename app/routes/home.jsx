
import logoDark from "../assets/logo-dark.svg";
import { Link } from "react-router";
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
    <main className="home">
      <section className="home__hero">
        <header className="home__brand">
          <p className="home__eyebrow">Flavor Journal</p>
          <div className="home__logo-wrap">
            <img
              src={logoDark}
              alt="The meal db"
              className="block w-full"
            />
          </div>
        </header>

        <div className="home__copy">
          <h1 className="home__title">Plan your next meal with confidence.</h1>
          <p className="home__subtitle">
            Explore curated dishes, compare ideas quickly, and jump straight to
            recipes worth cooking tonight.
          </p>
        </div>

        <nav className="home__actions" aria-label="Primary">
          <Link className="home__cta" to="meals">
            Explore Meals
          </Link>
          <Link to="ingredients" className="text-blue-700 hover:underline dark:text-blue-500">
            View Ingredients
          </Link>
        </nav>
        <Latest meals={mealData} />
      </section>
    </main>
  );
}
