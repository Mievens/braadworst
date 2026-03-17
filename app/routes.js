import { index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.jsx"),
    route("meals", "routes/meals.jsx"),
    route("recipes", "routes/recipes.jsx"),
];