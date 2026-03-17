import { Link } from "react-router";

export async function clientLoader({ params }) {
    const detailRes = await fetch(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${params.idMeal}`,
    );
    const detailData = await detailRes.json();
    const meal = detailData.meals[0];

    const listRes = await fetch("https://themealdb.com/api/json/v1/1/search.php?f=a");
    const listData = await listRes.json();
    const meals = listData.meals;

    const currentIndex = meals.findIndex((item) => item.idMeal === params.idMeal);
    const prevMealId = currentIndex > 0 ? meals[currentIndex - 1].idMeal : null;
    const nextMealId =
        currentIndex !== -1 && currentIndex < meals.length - 1
            ? meals[currentIndex + 1].idMeal
            : null;

    return { meal, prevMealId, nextMealId };
}

export default function Detail({ loaderData }) {
    const { meal, prevMealId, nextMealId } = loaderData;

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

            <div>
                {prevMealId ? <Link to={`/detail/${prevMealId}`}>Previous meal</Link> : null}
                {" "}
                {nextMealId ? <Link to={`/detail/${nextMealId}`}>Next meal</Link> : null}
            </div>
        </div>
    );
}
