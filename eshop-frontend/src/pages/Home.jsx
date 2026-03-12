import Header from "../components/sharedComponents/Header";
import CarouselSwiper from "../components/homeComponents/CarouselSwiper";
import Footer from "../components/sharedComponents/Footer";
import FeaturedGrid from "../components/homeComponents/FeaturedGrid";
import PerksBanner from "../components/homeComponents/PerksBanner";
import HomeStoreBanner from "../components/homeComponents/HomeStoreBanner";
import { carouselHomeSlides } from "../util/carouselHomeSlides";
import FadeIn from "../util/FadeInTag";
import NewsLetter from "../components/homeComponents/NewsLetter";

const newProducts = [
  {
    id: 1,
    name: "I choose you Card",
    price: 3.5,
    image: "https://placehold.co/400x400?text=Product+1",
  },
  {
    id: 2,
    name: "Purrrson Card",
    price: 3.0,
    image: "https://placehold.co/400x400?text=Product+2",
  },
  {
    id: 3,
    name: "Doodle Card",
    price: 3.0,
    image: "https://placehold.co/400x400?text=Product+3",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <FadeIn>
          <CarouselSwiper carouselSlides={carouselHomeSlides} />
        </FadeIn>
        <FadeIn>
          <FeaturedGrid />
        </FadeIn>
        <FadeIn>
          <PerksBanner />
        </FadeIn>
        <FadeIn>
          <HomeStoreBanner
            section="New products"
            products={newProducts}
            banner="NEW"
          />
        </FadeIn>
        <FadeIn>
          <NewsLetter />
        </FadeIn>
        <FadeIn>
          <HomeStoreBanner
            section="On sale"
            products={newProducts}
            banner="SALE"
          />
        </FadeIn>
      </main>
      <Footer />
    </div>
  );
}
