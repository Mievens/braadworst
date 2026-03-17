import { Link } from "react-router";

export async function clientLoader() {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
    const data = await res.json();
    return { ingredientData: data.meals || [] };
}

const Ingredients = ({ loaderData = {} }) => {
  const { ingredientData } = loaderData || {};

  return (
    <article>
      <h2>Popular Ingredients</h2>
      <section>
        {ingredientData && ingredientData.length > 0 ? (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {ingredientData.map((item) => (
              <div key={item.idIngredient} className="text-center">
                <img 
                  src={`https://www.themealdb.com/images/ingredients/${item.strIngredient}.png`}
                  alt={item.strIngredient} 
                  className="w-full h-48 object-cover rounded mb-1"
                /> 
                <p className="font-semibold">{item.strIngredient}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No ingredients found</p>
        )}
      </section>
    </article>
  );
};

export default Ingredients;

