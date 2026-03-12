import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default function HomeStoreBanner({section, products, banner}) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-8 py-14">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-10 h-0.5 bg-gray-800" />
        <h2 className="text-2xl font-bold text-gray-900">{section}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {products.map(product => (
          <div key={product.id} className="flex flex-col items-center text-center group">
            <Link to={`/products/${product.id}`} className="relative w-full overflow-hidden rounded-sm mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 right-3 bg-brand text-white text-xs font-bold px-2.5 py-1">
                {banner}
              </span>
            </Link>

            <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>

            <p className="text-gray-700 mb-4">
              {product.price.toFixed(2).replace('.', ',')} €{' '}
              <span className="text-gray-400 text-sm font-normal">tax included</span>
            </p>

            <button
              className="w-full bg-brand-dark text-white py-2.5 px-6 text-sm font-semibold hover:bg-brand transition mb-3 cursor-pointer"
            >
              Add to basket
            </button>

            <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand transition cursor-pointer">
              <FontAwesomeIcon icon={faHeart} className="text-xs" />
              Add to Wishlist
            </button>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          to="/products?new=true"
          className="inline-block bg-brand-dark text-white px-10 py-3 text-sm font-semibold hover:bg-brand transition"
        >
          View More!
        </Link>
      </div>
    </section>
  );
}
