import { Link } from "react-router-dom";
const Item = ({ data, addToCart }) => {
  const { id, image, title, price } = data;

  return (
    <div className="card">
      <div className="grid">
        <div className="image">
          <Link to={`/product/${id}`}>
            <img src={image} alt="images" />
          </Link>
        </div>
        <div className="title">
          <p className="title">{title}</p>
        </div>
        <div className="flex">
          <span className="price" style={{ marginRight: 15, color: "#6B44C6" }}>
            ${price}
          </span>
          <div
            className="cart"
            onClick={addToCart}
            style={{ color: "#6B44C6" }}
          >
            <img className="cartImg" src="/cart.svg" alt="cartimgs" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
