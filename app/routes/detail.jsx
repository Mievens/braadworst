import { Link } from "react-router";

export async function clientLoader({ params }) {
    const res = await fetch(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${params.idMeal}`,
    );
    const data = await res.json();
    return { meal: data.meals[0] };
}

export default function Detail({ loaderData }) {
    const { meal } = loaderData;

    if (!meal) {
        return (
            <div>
                <h1>Meal not found</h1>
                <Link to="/meals">Back to meals</Link>
            </div>
        );
    }

    return (
        <div>
            <Link to="/meals">Back to meals</Link>
            <h1>{meal.strMeal}</h1>
            <img src={meal.strMealThumb} alt={meal.strMeal} width="300" />
            <p>
                <strong>Category:</strong> {meal.strCategory}
            </p>
            <p>
                <strong>Area:</strong> {meal.strArea}
            </p>
            <p>{meal.strInstructions}</p>
            {meal.strYoutube ? (
                <p>
                    <a href={meal.strYoutube} target="_blank" rel="noreferrer">
                        Watch on YouTube
                    </a>
                </p>
            ) : null}
        </div>
    );
}
