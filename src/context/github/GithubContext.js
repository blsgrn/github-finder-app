import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

// const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  // THESE TWO VARIABLES ARE PROVIDED
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(false);

  const initialState = {
    users: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // dipatch--->arg provider as object, reducer function ------> arg user function ------> useReducer ----> state updater

  // testing purposes
  // const fetchUsers = async () => {
  //   setLoading();
  //   const response = await fetch(
  //     `${GITHUB_URL}/users`
  //     //  {headers: { Authorization: `token ${GITHUB_TOKEN}` },}
  //   );
  //   const data = await response.json();
  //   // console.log(data);
  //   //

  //   dispatch({
  //     type: "GET_USERS",
  //     payload: data,
  //   });

  // get search reasults
  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });
    const response = await fetch(
      `${GITHUB_URL}/search/users?${params}`
      //  {headers: { Authorization: `token ${GITHUB_TOKEN}` },}
    );

    const { items } = await response.json();

    console.log(items);

    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };
  //set loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  // clear users from state
  const clearState = () => dispatch({ type: "CLEAR_STATE" });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearState,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
export default GithubContext;
