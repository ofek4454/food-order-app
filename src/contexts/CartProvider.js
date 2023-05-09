import { useReducer } from "react";
import CartCtx from "./cart-context";

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const newTotalAmout =
      state.totalAmount + action.item.price * action.item.amount;

    const isItemExistsIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existsItem = state.items[isItemExistsIndex];

    let updatedItems;

    if (existsItem) {
      let updatedItem = {
        ...existsItem,
        amount: existsItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[isItemExistsIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: newTotalAmout,
    };
  }
  if (action.type === "REMOVE") {
    const existItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existsItem = state.items[existItemIndex];
    const newTotalAmout = state.totalAmount - existsItem.price;
    let updatedItems;
    if (existsItem.amount === 1)
      updatedItems = state.items.filter((item) => item.id !== action.id);
    else {
      const updatedItem = { ...existsItem, amount: existsItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: newTotalAmout,
    };
  }
  if (action.type === "CLEAR") return initialState;
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

  const clearCartHandler = () => {
    cartDispacher({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartCtx.Provider value={cartContext}>{props.children}</CartCtx.Provider>
  );
};

export default CartProvider;
