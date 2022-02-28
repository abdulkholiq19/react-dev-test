
import { useContext, useEffect } from "react";
import { Route } from "react-router-dom";
import './App.css';
import { BrowserRouter, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavbarComponent } from './components/NavbarComponent';
import { Home } from "./pages/Home";
import { DetailMovie } from "./pages/DetailMovie";
import { UserContext } from "./context/UserContext";

import { API } from "./config/API";
function App() {

  const [_, dispatch] = useContext(UserContext);
  const getMovie = async () => {
    try {
      const response = await API.get("?apikey=faf7e5bb&s=Batman");

      let payload = response.data.Search;

      dispatch({
        type: "GET_MOVIE_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMovie();
  }, []);

  return (
    <>
      <NavbarComponent/>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/detail-movie/:id" element={<DetailMovie />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
