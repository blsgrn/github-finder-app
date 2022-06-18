import { useEffect, useContext } from "react";
import GithubContext from "../../context/github/GithubContext";
import { useParams } from "react-router-dom";

function User() {
  const { getUser, user } = useContext(GithubContext);

  const params = useParams();

  console.log(params);

  useEffect(() => {
    getUser(params.login);
  }, []);

  // empty array is important to avoid looping and browser-crashing

  // browser router has a prop called match (which is :login) no longer works
  return <div>{user.login}</div>;
}

export default User;
