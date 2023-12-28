import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  ticket: {
    ticketItems: [],
  },
};
function reducer(state, action) {
  switch (action.type) {
    case 'Ticket_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.ticket.ticketItems.find(
        (x) => x._id === newItem._id
      );
      const ticketItems = existItem
        ? state.ticket.ticketItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.ticket.ticketItems, newItem];
      return { ...state, ticket: { ...state.cart, ticketItems } };
    }
    case 'Ticket_Diff_Item': {
      const Item = action.payload;
      const privItem = state.ticket.ticketItems;
      console.log(privItem);

      if (privItem.length === 0) {
        const ticketItems = state.ticket.ticketItems.filter(
          (item) => item._id !== action.payload._id
        );
        return { ...state, ticket: { ...state.ticket, ticketItems } };
      }
      console.log(Item.quantity);
      const ticketItems = privItem.map((item) =>
        item._id === Item._id ? Item : item
      );
      return { ...state, ticket: { ...state.ticket, ticketItems } };
    }
    case 'Ticket_Remove_ITEM': {
      const ticketItems = state.ticket.ticketItems.filter(
        (item) => item._id !== action.payload._id
      );
      return { ...state, ticket: { ...state.ticket, ticketItems } };
    }
    default: {
      return state;
    }
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  console.log(value);
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
