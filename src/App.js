import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Components/Home/Home";
import Heart from "./Components/Heart/Heart";
import Diabetes from "./Components/Diabetes/Diabetes";
import Parkinson from "./Components/Parkinson/Parkinson";



const router = createBrowserRouter([
	{
	path:'/',
	element: <Home />,
	
	children: [
	  
	  { path:'/heart', element: <Heart />},
	  { path:'/diabetes', element: <Diabetes />},
	  { path:'/parkinson', element: <Parkinson />},
  ],
   },
  
  ]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
