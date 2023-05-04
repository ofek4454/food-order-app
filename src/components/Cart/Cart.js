import { useContext } from "react";
import Modal from "../UI/Modal/Modal";
import styles from "./Cart.module.css";
import CartCtx from "../../contexts/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartCtx);

  const itemRemoveHandler = (id) => {};
  const itemAddHandler = (item) => {};

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          id={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={itemRemoveHandler.bind(null, item.id)}
          onAdd={itemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal closeModal={props.dismissCart}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>${cartCtx.totalAmount.toFixed(2)}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.dismissCart}>
          Close
        </button>
        <button className={styles.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
