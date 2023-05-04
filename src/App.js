import { useState } from "react";
import "./App.css";
import Cart from "./components/Cart/Cart";
import Header from "./components/Header/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./contexts/CartProvider";

function App() {
  const [isCartOpen, openCart] = useState(false);

  const showCartHandler = () => {
    openCart(true);
  };
  const hideCartHandler = () => {
    openCart(false);
  };

  return (
    <CartProvider>
      {isCartOpen && <Cart dismissCart={hideCartHandler} />}
      <Header openCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
