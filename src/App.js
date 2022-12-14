import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Details from "./Details";
import { render } from 'react-dom';
import SearchParams from './SearchParams';
import { StrictMode, useState } from "react";
import ThemeContext from "./ThemeContext";

const App = () => {
  // This is the default submit button background color
  const theme = useState("darkblue");

  return (
    <StrictMode>
      <ThemeContext.Provider value={theme}>
        <BrowserRouter>
          {/* Takes user back to home page */}
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    </StrictMode>
  )
}

render(<App />, document.getElementById("root"));
