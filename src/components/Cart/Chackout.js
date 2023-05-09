import styles from "./Checkout.module.css";

const Checkout = (props) => {
  return (
    <form>
      <div className={styles.control}>
        <label htmlFor="name">Full name</label>
        <input type="text" id="name" />
        <label htmlFor="address">Address</label>
        <input type="text" id="address" />
        <label htmlFor="postal">Postal code</label>
        <input type="text" id="postal" />
        <label htmlFor="city">city</label>
        <input type="text" id="city" />
      </div>
      <button type="button" onClick={props.onCancel}>
        Cancel
      </button>
      <button type="submit">Confirm</button>
    </form>
  );
};

export default Checkout;
