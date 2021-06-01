import React, { useState } from 'react';
import { useAnalytics } from 'use-analytics'

const SHOES = 'Shoes';
const DRESSES = 'Dresses';

export default function Products({ setCart, cart }) {
  const { track } = useAnalytics()
  const [products] = useState([
    {
      category: DRESSES,
      name: 'Green Dress',
      cost: 15.99,
      image:
        'https://media.missguided.com/i/missguided/DD926543_03',
    },
    {
      category: SHOES,
      name: 'Sandals',
      cost: 19.99,
      image:
        'https://i1.adis.ws/i/boohooamplience/agg76766_black_xl?$product_image_main_mobile$&fmt=webp',
    },
    {
      category: DRESSES,
      name: 'Blue Dress',
      cost: 19.99,
      image:
        'https://cdn.cliqueinc.com/posts/286696/casual-summer-dresses-286696-1586464229610-main.700x0c.jpg',
    }
  ]);

  const addToCart = (product) => {
    console.log('added to cart')
    track('product purchased', {
      name: product.name,
      price: product.cost
    })
    let newCart = [...cart];
    let itemInCart = newCart.find(
      (item) => product.name === item.name
    );
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      itemInCart = {
        ...product,
        quantity: 1,
      };
      newCart.push(itemInCart);
    }
    setCart(newCart);
  };

  const [category, setCategory] = useState(SHOES);

  const getProductsInCategory = () => {
    return products.filter(
      (product) => product.category === category
    );
  };

  return (
    <>
      <h1>Products</h1>
      Select a category <br></br><br></br>
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value={SHOES}>{SHOES}</option>
        <option value={DRESSES}>{DRESSES}</option>
      </select>
      <div className="products">
        {getProductsInCategory().map((product, idx) => (
          <div className="product" key={idx}>
            <h3>{product.name}</h3>
            <h4>£{product.cost}</h4>
            <img src={product.image} alt={product.name} />
            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
}