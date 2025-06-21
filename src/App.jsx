import { createBrowserRouter, RouterProvider } from "react-router-dom"
import '@fortawesome/fontawesome-free/css/all.min.css'
import Layout from "./Components/Layout/Layout"
import Home from "./Components/Home/Home"
import Area from "./Components/Area/Area"
import MealDetails from "./Components/MealDetails/MealDetails"
import Ingredients from "./Components/Ingredients/Ingredients"
import NotFound from "./Components/NotFound/NotFound"

function App() {
  const routes = createBrowserRouter([
    {
      path: "/", element: <Layout />, children: [
        { index: true, element: <Home /> },
        { path: "area", element: <Area /> },
        { path: "mealdetails/:id", element: <MealDetails /> },
        { path: "ingredients", element: <Ingredients /> },
        { path: "*", element: <NotFound /> },
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={routes} />

    </>
  )
}

export default App
