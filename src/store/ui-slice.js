import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: { cartIsVisible: false, notification: null },
    reducers: {
        toggle(state) {
            state.cartIsVisible = !state.cartIsVisible;
        },

        showNotification(state, action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message,
            };
        },
    },
});

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                status: "pending",
                title: "sending...",
                message: "sending cart data",
            })
        );

        async function sendRequest() {
            const response = await fetch(
                "https://react-77315-default-rtdb.firebaseio.com/cart.json",
                {
                    method: "PUT",
                    body: JSON.stringify(cart),
                }
            );

            if (!response.ok) {
                throw new Error("sending cart data failed");
            }
        }

        try {
            await sendRequest();
            dispatch(
                uiActions.showNotification({
                    status: "success",
                    title: "Success",
                    message: "sent cart data successfully",
                })
            );
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: "error",
                    title: "Error!",
                    message: "Sending cart data failed",
                })
            );
        }
    };
};

export const uiActions = uiSlice.actions;
export default uiSlice;
