export default function Latest({ meals }) {

    return (
        <div>
            <h2>Latest Meals</h2>
            <div className="meals-grid">
                {meals.map((meal) => (
                    <div key={meal.idMeal} className="meals-item">
                        <img
                            src={meal.strMealThumb}
                            alt={meal.strMeal}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
