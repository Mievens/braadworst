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

    const ingredients = meal
        ? Array.from({ length: 20 }, (_, index) => {
            const ingredient = meal[`strIngredient${index + 1}`]?.trim();
            const measure = meal[`strMeasure${index + 1}`]?.trim();

            if (!ingredient) {
                return null;
            }

            return {
                ingredient,
                measure: measure || "to taste",
            };
        }).filter(Boolean)
        : [];

    if (!meal) {
        return (
            <main className="detail">
                <section className="detail__panel">
                    <h1 className="detail__title">Meal not found</h1>
                    <Link className="detail__back" to="/meals">Back to meals</Link>
                </section>
            </main>
        );
    }

    return (
        <main className="detail">
            <article className="detail__panel">
                <Link className="detail__back" to="/meals">Back to meals</Link>

                <header className="detail__header">
                    <p className="detail__eyebrow">Recipe Detail</p>
                    <h1 className="detail__title">{meal.strMeal}</h1>
                    <div className="detail__meta">
                        <span className="detail__badge">{meal.strCategory}</span>
                        <span className="detail__badge">{meal.strArea}</span>
                    </div>
                </header>

                <img className="detail__image" src={meal.strMealThumb} alt={meal.strMeal} />

                <section className="detail__section">
                    <h2 className="detail__section-title">Ingredients</h2>
                    <ul className="detail__ingredients">
                        {ingredients.map((item) => (
                            <li key={`${item.ingredient}-${item.measure}`}>
                                <span>{item.ingredient}</span>
                                <span>{item.measure}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="detail__section">
                    <h2 className="detail__section-title">Instructions</h2>
                    <p className="detail__instructions">{meal.strInstructions}</p>
                </section>

                <div className="detail__footer">
                    {meal.strYoutube ? (
                        <a className="detail__video" href={meal.strYoutube} target="_blank" rel="noreferrer">
                            Watch on YouTube
                        </a>
                    ) : null}

                    <nav className="detail__pager" aria-label="Recipe pagination">
                        {prevMealId ? (
                            <Link className="detail__pager-link" to={`/detail/${prevMealId}`}>
                                Previous meal
                            </Link>
                        ) : null}
                        {nextMealId ? (
                            <Link className="detail__pager-link" to={`/detail/${nextMealId}`}>
                                Next meal
                            </Link>
                        ) : null}
                    </nav>
                </div>
            </article>
        </main>
    );
}
