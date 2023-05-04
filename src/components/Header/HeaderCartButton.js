import { useContext } from "react";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";
import CartCtx from "../../contexts/cart-context";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartCtx);

  const itemsInCart = cartCtx.items.reduce((counter, item) => {
    return counter + item.amount;
  }, 0);

  return (
    <button className={styles.button} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{itemsInCart}</span>
    </button>
  );
};

export default HeaderCartButton;
