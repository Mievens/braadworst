import { Link } from "react-router";

export default function Latest({ meals }) {
    const latestMeals = meals ?? [];

    return (
        <section className="latest">
            <div className="latest__header">
                <p className="latest__eyebrow">Just In</p>
                <h2 className="latest__title">Latest Meals</h2>
            </div>

            <ul className="meals__list">
                {latestMeals.map((meal) => (
                    <li key={meal.idMeal} className="meal-card">
                        <Link to={`/detail/${meal.idMeal}`}>
                            <img
                                className="meal-card__image"
                                src={meal.strMealThumb}
                                alt={meal.strMeal}
                            />
                            <h3 className="meal-card__title">{meal.strMeal}</h3>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
