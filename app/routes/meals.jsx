
import { Link } from "react-router";

export async function clientLoader() {
    const res = await fetch("https://themealdb.com/api/json/v1/1/search.php?f=a");
    const data = await res.json();
    return { mealData: data.meals };
}

export default function Warmup({ loaderData }) {
    const { mealData } = loaderData;
    return (
        <main className="meals">
            <header className="meals__hero">
                <p className="meals__eyebrow">Discover</p>
                <h1 className="meals__title">Meals Library</h1>
                <p className="meals__subtitle">
                    Browse simple recipe inspiration and pick your next dish.
                </p>
            </header>

            <div className="meals__meta">{mealData.length} meals found</div>

            <ul className="meals__list">
                {mealData.map((meal) => (
                    <li key={meal.idMeal} className="meal-card">
                        <Link to={`/detail/${meal.idMeal}`}>
                            <img
                                className="meal-card__image"
                                src={meal.strMealThumb}
                                alt={meal.strMeal}
                            />
                            <h2>{meal.strMeal}</h2></Link>
                    </li>
                ))}
            </ul>

            {mealData.length === 0 && (
                <p className="meals__empty">No meals found right now.</p>
            )}
        </main>
    );
}