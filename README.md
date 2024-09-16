# Redux Cart:

This project demonstrates:

> How to work with redux to manage app wide state, in this case updates made to the cart from various components within the app.
> How to work with Side Effects and Asynchronous code in redux.

# How We Built Step By Step:

> We added the redux store with two slices; 'ui-slice' to toggle visibility of the cart on the UI and the 'cart-slice' to manage state of the cart.

# Handling side effects in redux
> We wrapped asynchronous operation like http request using fetch API inside useEffect hook as it is the practice in functional components.
> We dispatched actions to update the notification state depending on success or failure of the http request where we were
  sending cart data to the firebase database. The notification component will use this state portion of the redux store to display appropriate message to the user.
> We used isInitial flag to prevent fetch operation from running on the initial render of the app.

