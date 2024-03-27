import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Components/Home/Home";
// import Heart from "./Components/Heart/Heart";
// import Diabetes from "./Components/Diabetes/Diabetes";
// import Parkinson from "./Components/Parkinson/Parkinson";
import DiseaseShimmer from "./Components/Shimmer/DiseaseShimmer";
import { Suspense, lazy } from "react";

const Heart = lazy(()=>import("./Components/Heart/Heart"))
const Parkinson = lazy(()=>import("./Components/Parkinson/Parkinson"))
const Diabetes = lazy(()=>import("./Components/Diabetes/Diabetes"))



const router = createBrowserRouter([
	{
	path:'/',
	element: <Home />,
	
	children: [
	  
	  { path:'/heart', element: <Suspense fallback={<DiseaseShimmer/>}><Heart/></Suspense>},
	  { path:'/diabetes', element: <Suspense fallback={<DiseaseShimmer/>}><Diabetes/></Suspense>},
	  { path:'/parkinson', element: <Suspense fallback={<DiseaseShimmer/>}><Parkinson/></Suspense>},
  ],
   },
  
  ]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
