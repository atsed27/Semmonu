import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';

export const Store = createContext();

const initialState = {
  ticket: Cookies.get('ticket')
    ? JSON.parse(Cookies.get('ticket'))
    : {
        ticketItems: [],
        createEvent: {},
      },
};
function reducer(state, action) {
  switch (action.type) {
    case 'Ticket_Reset': {
      return {
        ...state,
        ticket: {
          ticketItems: [],
          createEvent: {},
          panelMethod: '',
          paymentMethod: '',
        },
      };
    }
    case 'Ticket_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.ticket.ticketItems.find(
        (x) => x._id === newItem._id
      );
      const ticketItems = existItem
        ? state.ticket.ticketItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.ticket.ticketItems, newItem];
      Cookies.set('ticket', JSON.stringify({ ...state.ticket, ticketItems }));
      return { ...state, ticket: { ...state.ticket, ticketItems } };
    }
    case 'Ticket_Diff_Item': {
      const Item = action.payload;
      const privItem = state.ticket.ticketItems;
      const ticketItems = privItem.map((item) =>
        item._id === Item._id ? Item : item
      );
      Cookies.set('ticket', JSON.stringify({ ...state.ticket, ticketItems }));
      return { ...state, ticket: { ...state.ticket, ticketItems } };
    }
    case 'Ticket_Remove_ITEM': {
      const ticketItems = state.ticket.ticketItems.filter(
        (item) => item._id !== action.payload._id
      );
      Cookies.set('ticket', JSON.stringify({ ...state.ticket, ticketItems }));
      return { ...state, ticket: { ...state.ticket, ticketItems } };
    }

    case 'Save_Create_Event': {
      const createEvent = { ...state.ticket.createEvent, ...action.payload };
      Cookies.set('ticket', JSON.stringify({ ...state.ticket, createEvent }));
      return {
        ...state,
        ticket: {
          ...state.ticket,
          createEvent: createEvent,
        },
      };
    }
    case 'Rest_Create_Event': {
      Cookies.set(
        'ticket',
        JSON.stringify({ ...state.ticket, createEvent: {} })
      );
      return {
        ...state,
        ticket: {
          ...state.ticket,
          createEvent: {},
        },
      };
    }
    case 'Event_Create_Clear': {
      return { ...state, ticket: { ...state.ticket, createEvent: {} } };
    }
    case 'SAVE_PAYMENT_METHOD': {
      return {
        ...state,
        ticket: {
          ...state.ticket,
          paymentMethod: action.payload,
        },
      };
    }
    case 'ADD_PANEL_METHOD': {
      return {
        ...state,
        ticket: {
          ...state.ticket,
          panelMethod: action.payload,
        },
      };
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
