import { useContext, useState } from "react";
import Modal from "../UI/Modal/Modal";
import styles from "./Cart.module.css";
import CartCtx from "../../contexts/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Chackout";

const Cart = (props) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const cartCtx = useContext(CartCtx);

  const itemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const itemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    setShowCheckout(true);
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
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
      {showCheckout && <Checkout onCancel={props.dismissCart} />}
      {!showCheckout && (
        <div className={styles.actions}>
          <button className={styles["button--alt"]} onClick={props.dismissCart}>
            Close
          </button>
          <button className={styles.button} onClick={orderHandler}>
            Order
          </button>
        </div>
      )}
    </Modal>
  );
};

export default Cart;
