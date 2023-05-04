import { useContext } from "react";
import styles from "./MealItem.module.css";
import MealItemControls from "./MealItemControls";
import CartCtx from "../../../contexts/cart-context";

const MealItem = (props) => {
  const cartCtx = useContext(CartCtx);
  const addToCartHandler = (amount) => {
    const item = {
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    };
    cartCtx.addItem(item);
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{`$${props.price.toFixed(2)}`}</div>
      </div>
      <div>
        <MealItemControls id={props.id} addToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
