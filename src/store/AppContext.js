import React, { createContext, useReducer } from 'react';

const initialState = {
  // Define your initial state here
};

const reducer = (state, action) => {
  switch (action.type) {
    // Define your actions here
    default:
      return state;
  }
};

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}; 