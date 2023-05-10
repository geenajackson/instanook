import React, { useEffect, useState } from "react";
import decode from "jwt-decode"
import './styles/App.css';

import Routes from "./Routes";
import UserContext from "./UserContext";
import useLocalStorage from "./useLocalStorage"

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useLocalStorage("token");

  useEffect(
    function loadUser() {
      async function getUser() {
        setIsLoading(true);
        if (token) {
          try {
            let { username } = decode(token);
          }
          catch (e) {
            console.log(e);
          }
        }
        else {
          setUser(null);
        };
      }
      getUser();
      setIsLoading(false);
    }, [token]);

  async function loginUser(login) {
    try {

    }
    catch (e) {
      return e;
    }

  }

  async function registerUser(login) {
    try {

    }
    catch (e) {
      return e;
    }
  }

  function logoutUser() {

    setUser(null);
  }


  if (isLoading) {
    return <p>Loading ...</p>;
  }

  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <Routes loginUser={loginUser} logoutUser={logoutUser} registerUser={registerUser} />
      </UserContext.Provider>
    </div>
  );
}

export default App;
