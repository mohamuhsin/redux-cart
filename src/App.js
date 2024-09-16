import {Fragment, useEffect} from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { useSelector,useDispatch } from "react-redux";
import {uiActions} from "./store/ui-slice";

let isInitial = true
function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  const dispatch = useDispatch();

  useEffect(() => {
    async function sendCartData(){
      dispatch(uiActions.showNotification({
        status: "pending",
        title: "sending",
        message:"sending cart data"
      }))
      const response = await fetch("https://react-77315-default-rtdb.firebaseio.com/cart.json", {
        method: "PUT",
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        throw new Error("Failed to send cart!");
      }

      dispatch(uiActions.showNotification({
        status: "Success",
        title: "Success",
        message:"Cart data sent successfully"
      }))

    }

    if (isInitial){
        isInitial = false
        return
  }

    sendCartData().catch(error =>{
      dispatch(uiActions.showNotification({
        status:"error",
        title: "Error",
        message:"Failed to send cart data"
      }))
    })

  }, [cart, dispatch]);



  return (
      <>
        {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
        <Layout>
          {showCart && <Cart/>}
          <Products/>
        </Layout>
      </>
  );
}

export default App;
