import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Form from "./Components/Form";
import Table from "./Components/Table";
import RootLayout from "./Components/Root";

function App() {
  const router = createBrowserRouter([
    {
      path: "/digital-channels-project/",
      element: <RootLayout />,

      children: [
        { index: true, element: <Form /> },
        {
          index: true,
          path: "/digital-channels-project/form",
          element: <Form />,
        },
        { path: "/digital-channels-project/table", element: <Table /> },
      ],
    },
  ]);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
