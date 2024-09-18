import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                "https://react-77315-default-rtdb.firebaseio.com/cart.json"
            );
            if (!response.ok) {
                throw new Error("fetching cart data failed");
            }
            const data = await response.json();

            return data;
        };

        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart(cartData));
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: "error",
                    title: "Error!",
                    message: "fetching cart data failed",
                })
            );
        }
    };
};

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
