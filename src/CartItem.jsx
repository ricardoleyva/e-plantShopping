import { useSelector, useDispatch } from "react-redux";
import { removeItem, increaseItem, substractItem } from "./CartSlice";
import { enablePlant } from "./PlantSlice";
import "./CartItem.css";
const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const plantsEnDis = useSelector((state) => state.plant.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalCost = 0;
    cart.forEach((element) => {
      let costString = element.cost.slice(1);
      let costInt = parseInt(costString);
      totalCost += costInt * element.quantity;
    });
    return totalCost;
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

  const handleDecrement = (item, quantity) => {
    if (quantity > 1) {
      dispatch(substractItem(item));
    } else {
      dispatch(removeItem(item));
      dispatch(enablePlant(item));
      //console.log('Estado de PlantSlice al llamar handleDecrement: ' + plantsEnDis);
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
    dispatch(enablePlant(item));
    //console.log("Estado de PlantSlice al llamar handleRemove: " + plantsEnDis);
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalItemCost = (cost, quantity) => {
    let costString = cost.slice(1);
    let costInt = parseInt(costString);
    let totalCost = costInt * quantity;
    return totalCost;
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
                  onClick={() => handleDecrement(item.name, item.quantity)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item.name)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalItemCost(item.cost, item.quantity)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item.name)}
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
