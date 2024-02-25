import { useState, useEffect } from "react";
import CardProduct from "./card";

interface Product {
  id: string;
  images: string[];
  name: string;
  price: number;
  rating: number;
  description: string;
  quantity: number
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('name');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortedProducts, setSortedProducts] = useState(products);
  
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase())));
    }
  }, [searchTerm, products]);

  useEffect(() => {
    const sorted = [...filteredProducts].sort((a, b) => {
      if (sortType === 'name') {
        return a.name.localeCompare(b.name);
      } else if(sortType === 'priceHi'){
        return b.price - a.price;
      } else {
        return a.price - b.price;
      }
    });
    setSortedProducts(sorted);
  }, [sortType, filteredProducts]);

  return (
    <div className="flex p-5 pt-10 flex-wrap w-full">
      <div className="w-full flex flex-wrap"> 
      <input
        className="w-full md:w-48 p-2 m-5 text-black"
        type='text'
        placeholder='Buscar...'
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <select
        className="w-full md:w-48  p-2 m-5 text-black"
        value={sortType}
        onChange={e => setSortType(e.target.value)}
      >
        <option value="name">Ordenar por nombre</option>
        <option value="priceHi">Ordenar por precio mayor</option>
        <option value="priceLo">Ordenar por precio menor</option>
      </select>

      </div>
      <div className="flex flex-wrap justify-around pt-10">
        {sortedProducts.map((product, index) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </div>
    </div>

  );
};

export default ProductList;
