// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   eventsList: [],
// };

// const eventSlice = createSlice({
//   name: "event",
//   initialState,
//   reducers: {
//     addEvent: (state, action) => {
//       const event = state.eventsList.find(
//         ({ _id }) => action.payload._id === _id
//       );

//       if (!event) {
//         state.eventsList.push({ ...action.payload, quantity: 1 });
//       }
//     },

//     removeOrder: (state, action) => {
//       state.eventsList = state.eventsList.filter(
//         (item) => item._id !== action.payload
//       );
//     },
//     updateQuantity: (state, action) => {
//       const { id, quantity } = action.payload;

//       state.orderItems = state.orderItems.map((item) => {
//         if (item._id === id) {
//           return { ...item, quantity };
//         }
//         return item;
//       });
//     },

//     resetOrder: (state) => {
//       state.orderItems = [];
//     },
//   },
// });

// export const { addOrder, removeOrder, updateQuantity, resetOrder } =
// eventSlice.actions;

// export default eventSlice.reducer;
