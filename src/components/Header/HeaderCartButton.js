import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";
import CartCtx from "../../contexts/cart-context";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartCtx);

  const { items } = cartCtx;

  const itemsInCart = items.reduce((counter, item) => {
    return counter + item.amount;
  }, 0);

  const [isBump, bumpBtn] = useState(false);
  const btnClasses = `${styles.button} ${isBump ? styles.bump : ""}`;
  useEffect(() => {
    if (items.length === 0) return;
    bumpBtn(true);
    const timer = setTimeout(() => {
      bumpBtn(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{itemsInCart}</span>
    </button>
  );
};

export default HeaderCartButton;
