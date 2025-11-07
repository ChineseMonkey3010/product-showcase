import { getProducts } from '../lib/api';
import ProductCard from '../components/ProductCard';
import { useState } from 'react';

export default function Home({ initialProducts }) {
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (!query) {
      setProducts(initialProducts);
      return;
    }
    
    const filtered = initialProducts.filter(product => 
      product.title.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
    
    setProducts(filtered);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Featured Products</h1>
        <p className="text-gray-600 mb-4">Discover our top selection of products</p>
        
        <div className="relative max-w-md">
  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-5 w-5 text-gray-400" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  </div>
  <input
    type="text"
    value={searchQuery}
    onChange={handleSearch}
    placeholder="Search products..."
    className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  />
</div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your search</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const products = await getProducts(5);
    return {
      props: {
        initialProducts: products,
      }
    };
  } catch (error) {
    return {
      props: {
        initialProducts: []
      }
    };
  }
}