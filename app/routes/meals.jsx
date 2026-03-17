
import { Link } from "react-router";

export async function clientLoader() {
    const res = await fetch("https://themealdb.com/api/json/v1/1/search.php?f=a");
    const data = await res.json();
    return { mealData: data.meals };
}

export default function Warmup({ loaderData }) {
    console.log(loaderData);
    const { mealData } = loaderData;
    return (
        <div>
            <h1>Meals</h1>
            <ul>
                {mealData.map((meal) => (
                    <li key={meal.idMeal}>
                        <Link to={`/detail/${meal.idMeal}`}>{meal.strMeal}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}