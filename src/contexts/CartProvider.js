import { useReducer } from "react";
import CartCtx from "./cart-context";

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedItems = state.items.concat(action.item);
    const newTotalAmout =
      state.totalAmount + (action.item.price + action.item.amount);
    return {
      items: updatedItems,
      totalAmount: newTotalAmout,
    };
  }
  if (action.type === "REMOVE") {
  }
  return initialState;
};

const CartProvider = (props) => {
  const [cartState, cartDispacher] = useReducer(cartReducer, initialState);

  const addItemHandler = (item) => {
    cartDispacher({ type: "ADD", item: item });
  };

  const removeItemHandler = (item_id) => {
    cartDispacher({ type: "REMOVE", id: item_id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartCtx.Provider value={cartContext}>{props.children}</CartCtx.Provider>
  );
};

export default CartProvider;
