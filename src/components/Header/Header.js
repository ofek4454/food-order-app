import img from "../../assets/meals.jpg";
import styles from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.openCart} />
      </header>
      <div className={styles["main-image"]}>
        <img src={img} alt="" />
      </div>
    </>
  );
};

export default Header;
