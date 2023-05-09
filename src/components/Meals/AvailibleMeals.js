import { useEffect, useState } from "react";
import Card from "../UI/Card/Card";
import styles from "./AvailibleMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailibleMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMeals = async () => {
      const res = await fetch(
        "https://food-order-a7544-default-rtdb.firebaseio.com/meals.json"
      );
      if (!res.ok) throw new Error("loading failed");

      const data = await res.json();

      if (data === null) throw new Error("loading failed");

      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);
    };

    setIsLoading(true);
    fetchMeals().catch((e) => setError(e.message));
    setIsLoading(false);
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  const errorComponent = (
    <>
      <p>error occure</p>
      <p>error: {error}</p>
    </>
  );

  return (
    <section className={styles.meals}>
      <Card>
        {error !== "" && errorComponent}
        {isLoading && <p>Loading....</p>}
        {!isLoading && <ul>{mealsList}</ul>}
      </Card>
    </section>
  );
};

export default AvailibleMeals;
