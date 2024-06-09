import React from 'react';
import axios from 'axios';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    axios.get('https://62f58485ac59075124d2741f.mockapi.io/items').then((res) => {
      setItems(res.data);
    });
    axios.get('https://62f58485ac59075124d2741f.mockapi.io/cart').then((res) => {
      setCartItems(res.data);
    });
  }, []);

  const onAddToCart = (obj) => {
    axios.post('https://62f58485ac59075124d2741f.mockapi.io/cart', obj);
    setCartItems((prev) => [...prev, obj]);
  };

  const onAddToFavourite = (obj) => {
    axios.post('https://62f58485ac59075124d2741f.mockapi.io/favorites', obj);
    setFavorites((prev) => [...prev, obj]);
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://62f58485ac59075124d2741f.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Ошибка при удалении из корзины');
      console.error(error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />
      )}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>{searchValue ? `Search by request: "${searchValue}"` : 'All Sneakers'}</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            {searchValue && (
              <img
                onClick={() => setSearchValue('')}
                className="clear cu-p"
                src="/img/remove-btn.svg"
                alt="Clear"
              />
            )}
            <input
              onChange={onChangeSearchInput}
              value={searchValue}
              placeholder="Search..."></input>
          </div>
        </div>
        <div className=" d-flex flex-wrap">
          {items
            .filter(
              (item) => item.title && item.title.toLowerCase().includes(searchValue.toLowerCase()),
            )
            .map((item, index) => (
              <Card
                key={index}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onFavourite={onAddToFavourite}
                onPlus={(obj) => onAddToCart(obj)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
export default App;
