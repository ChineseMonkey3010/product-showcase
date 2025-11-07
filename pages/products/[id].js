export const dynamic = 'force-dynamic';
import { getProductById } from '../../lib/api';
import Image from 'next/image';
import { useFavorites } from '../../components/Favorites';
import { useRouter } from 'next/router';

export default function ProductDetail({ product }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const router = useRouter();
  
  if (router.isFallback) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={() => router.back()}
        className="mb-6 text-blue-600 hover:text-blue-800 font-medium flex items-center"
      >
        ← Back to Products
      </button>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 relative h-80">
            <Image
              src={product.image}
              alt={product.title}
              fill
              style={{ objectFit: 'contain' }}
              className="p-8 bg-gray-100"
            />
          </div>
          
          <div className="p-6 md:w-1/2">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-blue-600 text-xl font-semibold mb-4">${product.price.toFixed(2)}</p>
            
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating.rate) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                  width="24"
                  height="24"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.95-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-gray-600">({product.rating.count} reviews)</span>
            </div>
            
            <p className="text-gray-700 mb-6 line-clamp-3">{product.description}</p>
            
            <div className="mb-4">
              <span className="font-semibold">Category:</span> 
              <span className="ml-2 text-blue-600 capitalize">{product.category}</span>
            </div>
            
            <div className="flex space-x-4">
              <button 
                onClick={() => toggleFavorite(product.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors flex-1 ${
                  isFavorite(product.id)
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isFavorite(product.id) ? '❤️ Favorited' : '♡ Add to Favorites'}
              </button>
              
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex-1">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Product Details</h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt className="font-semibold text-gray-700">Brand</dt>
              <dd className="text-gray-900">Generic</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-700">Availability</dt>
              <dd className="text-gray-900">In Stock ({product.rating.count} units)</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-700">SKU</dt>
              <dd className="text-gray-900">PDS-{product.id}</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-700">Weight</dt>
              <dd className="text-gray-900">0.5 kg</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const product = await getProductById(params.id);
    return { props: { product } };
  } catch (error) {
    return { notFound: true };
  }
}