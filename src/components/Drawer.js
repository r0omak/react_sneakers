function Drawer({ onClose, items = [] }) {
  return (
    <div className="overlay">
      <div className="drawer ">
        <h2 className="d-flex justify-between mb-30 ">
          Корзина
          <img onClick={onClose} className="cu-p" src="/img/remove-btn.svg" alt="Close" />
        </h2>
        <div className="items">
          {items.map((obj) => (
            <div className="cartItem d-flex align-center mb-20">
              <div
                style={{ backgroundImage: `url(${obj.imageUrl})` }}
                className="cartItemImg"></div>

              <div className="mr-20 flex">
                <p className="mb-5">{obj.title}</p>
                <b>{obj.price}</b>
              </div>
              <img className="removeBtn" src="/img/remove-btn.svg" alt="Remove button" />
            </div>
          ))}
          <div />

          <div className="cartTotalBlock">
            <ul>
              <li className="d-flex">
                <span>Total:</span>
                <div></div>
                <b>21 498 UAH</b>
              </li>
              <li className="d-flex">
                <span>Tax 5%:</span>
                <div></div>
                <b>1074 UAH</b>
              </li>
            </ul>
            <button className="greenButton">
              Checkout
              <img src="/img/arrow.svg" alt="Arrow" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
