import React, { useEffect, useState } from "react";
import decode from "jwt-decode"
import './styles/App.css';

import InstanookApi from "./api";
import Routes from "./Routes";
import UserContext from "./UserContext";
import useLocalStorage from "./useLocalStorage"
import NavBar from "./Navbar";

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
            InstanookApi.token = token;
            let res = await InstanookApi.getUser(username);
            setUser(res.user);
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
      let res = await InstanookApi.login(login);
      setToken(res.token);
      localStorage.setItem("token", res.token);
      setUser(login);
    }
    catch (e) {
      return e;
    }

  }

  async function registerUser(login) {
    try {
      let res = await InstanookApi.register(login);
      setToken(res.token);
      localStorage.setItem("token", res.token);
      setUser(login);
    }
    catch (e) {
      return e;
    }
  }

  function logoutUser() {
    InstanookApi.logout();
    localStorage.removeItem("token");
    setUser(null);
  }


  if (isLoading) {
    return <p>Loading ...</p>;
  }

  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <NavBar />
        <Routes loginUser={loginUser} logoutUser={logoutUser} registerUser={registerUser} />
      </UserContext.Provider>
    </div>
  );
}

export default App;
