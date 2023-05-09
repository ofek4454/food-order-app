import styles from "./Checkout.module.css";

import useFieldValidation from "../../hooks/use-fieldValidation";

const Checkout = (props) => {
  const {
    field: name,
    hasError: nameHasError,
    fieldChanged: onNameChanged,
    fieldUnfocused: onNameUnfocus,
  } = useFieldValidation((val) => val.trim() !== "");

  const {
    field: street,
    hasError: streetHasError,
    fieldChanged: onStreetChanged,
    fieldUnfocused: onStreetUnfocus,
  } = useFieldValidation((val) => val.trim() !== "");

  const {
    field: phone,
    hasError: phoneHasError,
    fieldChanged: onPhoneChanged,
    fieldUnfocused: onPhoneUnfocus,
  } = useFieldValidation((val) => {
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return re.test(val);
  });

  const {
    field: city,
    hasError: cityHasError,
    fieldChanged: onCityChanged,
    fieldUnfocused: onCityUnfocus,
  } = useFieldValidation((val) => val.trim() !== "");

  const formIsInvalid =
    nameHasError || streetHasError || phoneHasError || cityHasError;

  const submitHandler = (event) => {
    event.preventDefault();

    if (formIsInvalid) return;

    const orderInfo = {
      name,
      street,
      phone,
      city,
    };

    props.onSubmit(orderInfo);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={`${styles.control} ${nameHasError && styles.invalid}`}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={onNameChanged}
          onBlur={onNameUnfocus}
        />
        {nameHasError && <p>please Enter a valid name</p>}
      </div>
      <div className={`${styles.control} ${streetHasError && styles.invalid}`}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={street}
          onChange={onStreetChanged}
          onBlur={onStreetUnfocus}
        />
        {streetHasError && <p>please Enter a valid street</p>}
      </div>
      <div className={`${styles.control} ${phoneHasError && styles.invalid}`}>
        <label htmlFor="phone">Phone number</label>
        <input
          type="phone"
          id="phone"
          value={phone}
          onChange={onPhoneChanged}
          onBlur={onPhoneUnfocus}
        />
        {phoneHasError && <p>please Enter a valid phone</p>}
      </div>
      <div className={`${styles.control} ${cityHasError && styles.invalid}`}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={onCityChanged}
          onBlur={onCityUnfocus}
        />
        {cityHasError && <p>please Enter a valid city</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit} disabled={formIsInvalid}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
