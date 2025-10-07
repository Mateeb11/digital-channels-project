import { createContext } from "react";

export const DataContext = createContext<any>({
  data: [],
  setData: () => {},
});
