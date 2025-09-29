import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      Navigate
      <main>
        <Outlet />
      </main>
    </>
  );
}
