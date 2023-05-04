import { useRef, useState } from "react";
import Input from "../../UI/Input/Input";
import styles from "./MealItemControls.module.css";

const MealItemControls = (props) => {
  const inpRef = useRef();
  const [amountValid, setAmountValid] = useState(true);

  const onFormSubmitHandler = (event) => {
    event.preventDefault();
    const amount = inpRef.current.value;
    if (amount.trim().length === 0) {
      setAmountValid(false);
      return;
    }
    setAmountValid(true);
    props.addToCart(+amount);
  };

  return (
    <form className={styles.controls} onSubmit={onFormSubmitHandler}>
      <Input
        ref={inpRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit">+ Add</button>
      {!amountValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
  );
};

export default MealItemControls;
