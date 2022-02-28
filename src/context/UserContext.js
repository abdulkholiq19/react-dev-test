import { createContext, useReducer } from "react";

export const UserContext = createContext();
const initialState = {
  movie: []
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_MOVIE_SUCCESS":
      return {
        ...state,
        movie: payload
      };
    default:
      throw new Error();
  }
};

export function UserContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <UserContext.Provider value={[state, dispatch]}>{children}</UserContext.Provider>;
}
