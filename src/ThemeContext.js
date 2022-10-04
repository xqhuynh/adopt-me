import { createContext } from "react";
// Default color is green, empty function
// This mimics a useState hook, never passed around
const ThemeContext = createContext(["green", () => { }]);

export default ThemeContext;