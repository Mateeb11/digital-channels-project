import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Form from "./Components/Form";
import Table from "./Components/Table";
import RootLayout from "./Components/Root";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,

      children: [
        { index: true, element: <Form /> },
        { index: true, path: "/form", element: <Form /> },
        { path: "/table", element: <Table /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
