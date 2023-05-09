import { useContext, useState } from "react";
import Modal from "../UI/Modal/Modal";
import styles from "./Cart.module.css";
import CartCtx from "../../contexts/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Chackout";

const Cart = (props) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState();

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

  const submitHandler = async (orderInfo) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        "https://food-order-a7544-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify({ user: orderInfo, items: cartCtx.items }),
        }
      );
      if (!res.ok)
        throw new Error("Cannot send order, please try again later.");

      cartCtx.clearCart();
      setDone(true);
    } catch (e) {
      setError(e.message);
    }
    setIsLoading(false);
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

  let content = (
    <>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>${cartCtx.totalAmount.toFixed(2)}</span>
      </div>
      {showCheckout && (
        <Checkout onCancel={props.dismissCart} onSubmit={submitHandler} />
      )}
      {!showCheckout && (
        <div className={styles.actions}>
          <button className={styles["button--alt"]} onClick={props.dismissCart}>
            Close
          </button>
          <button
            className={styles.button}
            onClick={orderHandler}
            disabled={cartCtx.items.length === 0}
          >
            Order
          </button>
        </div>
      )}
    </>
  );

  if (isLoading)
    content = (
      <div style={{ textAlign: "center" }}>
        <p>Confirming your order...</p>
      </div>
    );
  if (error) content = <p>{error}</p>;
  if (done)
    content = (
      <div className={styles.actions} style={{ textAlign: "center" }}>
        <p>order created successfully!</p>
        <button className={styles.button} onClick={props.dismissCart}>
          Close
        </button>
      </div>
    );

  return <Modal closeModal={props.dismissCart}>{content}</Modal>;
};

export default Cart;
