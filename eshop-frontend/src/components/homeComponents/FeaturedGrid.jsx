import { Link } from 'react-router-dom';
import featuredImg1 from '../../assets/images/home/featuredImg1.jpeg'
import featuredImg2 from '../../assets/images/home/featuredImg2.jpeg'
import featuredImg3 from '../../assets/images/home/featuredImg3.jpeg'

const featured = [
  {
    id: 1,
    label: 'Ανανέωσε τη συλλογή σου',
    title: 'Νέες αφίξεις',
    buttonText: 'Shop Now',
    to: '/products?category=new',
    image: featuredImg1,
    tall: true,
  },
  {
    id: 2,
    title: 'Κολιέ',
    buttonText: 'Shop Now',
    to: '/products?category=necklaces',
    image: featuredImg2,
    tall: false,
  },
  {
    id: 3,
    title: 'Σκουλαρίκια',
    buttonText: 'Shop Now',
    to: '/products?category=earrings',
    image: featuredImg3,
    tall: false,
  },
];

export default function FeaturedGrid() {
  return (
    <section className="max-w-6xl mx-auto mt-38 px-4 sm:px-8 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        <Link
          to={featured[0].to}
          className="group relative overflow-hidden rounded-2xl h-[280px] sm:h-[700px]"
        >
          <img
            src={featured[0].image}
            alt={featured[0].title}
            className="w-full h-72 sm:h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            {featured[0].label && (
              <p className="text-white/80 text-sm mb-1">{featured[0].label}</p>
            )}
            <h2 className="text-white text-3xl font-bold mb-3">{featured[0].title}</h2>
            <span className="inline-block bg-gray-900/80 text-white text-sm px-5 py-2 rounded hover:bg-gray-900 transition">
              {featured[0].buttonText}
            </span>
          </div>
        </Link>

        <div className="flex flex-col gap-4">
          {featured.slice(1).map(item => (
            <Link
              key={item.id}
              to={item.to}
              className="group relative overflow-hidden rounded-2xl h-85"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full min-h-44 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h2 className="text-white text-2xl font-bold mb-3">{item.title}</h2>
                <span className="inline-block bg-gray-900/80 text-white text-sm px-5 py-2 rounded hover:bg-gray-900 transition">
                  {item.buttonText}
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
