import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/Home";
import {
  createBrowserRouter, RouterProvider
} from "react-router-dom";
import Informatica from './pages/Informatica'
import TvVideo from './pages/TvVideo'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/categoria/1",
    element: <Informatica/>
  },
  
  {
    path: "/categoria/3",
    element: <TvVideo/>
  }
]);
function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
