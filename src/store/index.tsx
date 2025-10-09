import { configureStore, createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "items",
  initialState: { data: [] },
  reducers: {
    addData(state: any, action) {
      state.data.push(action.payload);
    },
    editData(state: any, action) {
      state.data[action.payload.index] = action.payload.item;
    },
    replaceData(state: any, action) {
      state.data = action.payload;
    },
    removeData(state: any, action) {
      state.data.splice(action.payload, 1);
    },
  },
});

const store = configureStore({
  reducer: { items: dataSlice.reducer },
});

export const dataActions = dataSlice.actions;
export default store;
