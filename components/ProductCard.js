import Link from 'next/link';
import Image from 'next/image';
import { useFavorites } from './Favorites';

export default function ProductCard({ product }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  
  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative h-48">
  <Image
    src={product.image}
    alt={product.title}
    fill
    style={{ objectFit: 'contain' }}
    className="p-4 bg-gray-100"
  />
</div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2 h-12">{product.title}</h3>
        <p className="text-blue-600 font-semibold">${product.price.toFixed(2)}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <Link 
            href={`/products/${product.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            View Details
          </Link>
          
          <button 
            onClick={() => toggleFavorite(product.id)}
            className={`p-2 rounded-full transition-colors ${
              isFavorite(product.id) ? 'text-red-500 bg-red-100' : 'text-gray-400 hover:text-red-500'
            }`}
            aria-label={isFavorite(product.id) ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite(product.id) ? '❤️' : '♡'}
          </button>
        </div>
      </div>
    </div>
  );
}