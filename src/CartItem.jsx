import { useSelector, useDispatch } from "react-redux";
import { removeItem, increaseItem, substractItem } from "./CartSlice";
import { enablePlant } from "./PlantSlice";
import "./CartItem.css";
const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const plants = useSelector((state) => state.plant.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalCost = 0;
    cart.forEach((element) => {
      totalCost += element.cost * element.quantity;
    });
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleCheckoutShopping = (e) => {
    alert("Functionality will be added in the future");
  };

  const handleIncrement = (item) => {
    dispatch(increaseItem(item));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(substractItem(item));
    } else {
      dispatch(removeItem(item));
      dispatch(enablePlant(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
    dispatch(enablePlant(item.name));
    console.log("Reducer: " + item.name + " " + plants.includes(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    let totalCost = 0;
    return (totalCost = item.cost * item.quantity);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{ marginTop: "20px", color: "black" }}
        className="total_cart_amount"
      ></div>
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={(e) => handleCheckoutShopping(e)}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
