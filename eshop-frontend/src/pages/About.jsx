import { Link } from 'react-router-dom';
import Header from '../components/sharedComponents/Header';
import Footer from '../components/sharedComponents/Footer';
import { carouselAboutSlides } from '../util/carouselAboutSlides';
import CarouselSwiper from '../components/homeComponents/CarouselSwiper';
import aboutImg1 from '../assets/images/about/aboutImg1.jpeg'
import aboutImg2 from '../assets/images/about/aboutImg2.jpeg'
import aboutImg3 from '../assets/images/about/aboutImg3.jpeg'
import FadeIn from '../util/FadeInTag';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <section className="bg-gray-50 py-16 px-4 sm:px-8 text-center border-b border-gray-100">
        <FadeIn>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">About Fwde</h1>
          <p className="text-gray-400 text-sm uppercase tracking-widest">Η ιστορία μας</p>
        </FadeIn>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-8 py-16">
        <FadeIn>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Η Fwde Jewels είναι μία ελληνική εταιρία με ανθεκτικά κοσμήματα…
          </p>
          <p className="text-gray-900 font-bold text-lg mb-4">Θα έλεγα αν ήταν μόνο αυτό.</p>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Η Fwde Jewels είναι κάτι παραπάνω από μία απρόσωπη εταιρία κοσμημάτων, και αυτό είναι
            που την διαφοροποιεί από άλλες εταιρίες στον χώρο.
          </p>
          <p className="text-gray-500 italic text-lg">
            Το όνομα μου είναι Φωτεινή και θα ήθελα να σας πάρω μαζί μου στην ιστορία της…
          </p>
        </FadeIn>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-center">
          <FadeIn delay="delay-100">
            <img
              src= {aboutImg1}
              alt="about image 1"
              className="w-full rounded-lg object-cover"
            />
          </FadeIn>
          <FadeIn delay="delay-200">
            <p className="text-gray-700 leading-relaxed text-base mb-4">
              Όλα ξεκίνησαν με μία ιδέα, στη περίοδο του κορονοϊού, στο γραφείο μου. Ένα χόμπι που
              έγινε η καθημερινότητά μου από τον Οκτώβριο του 2020.
            </p>
            <p className="text-gray-700 leading-relaxed text-base mb-4">
              Όντας στο πρώτο έτος του πανεπιστημίου, αποφάσισα να αρχίσω να φτιάχνω κοσμήματα στο
              σπίτι και να τα ανεβάζω στο Instagram. Αυτό που άρχισε ως ένας τρόπος να περνάω τον χρόνο μου, γρήγορα εξελίχθηκε σε
              κάτι πολύ μεγαλύτερο.
            </p>
          </FadeIn>
        </div>
      </section>

      <FadeIn>
        <section className="bg-brand/10 py-14 px-4 text-center my-10">
          <blockquote className="text-2xl sm:text-3xl font-semibold text-brand max-w-2xl mx-auto leading-relaxed">
            "Κάθε κόσμημα έχει τη δική του ιστορία."
          </blockquote>
        </section>
      </FadeIn>

      <section className="max-w-5xl mx-auto px-4 sm:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-center">
          <FadeIn delay="delay-100" className="order-2 sm:order-1">
            <p className="text-gray-700 leading-relaxed text-base mb-4">
              Το κοινό μεγάλωσε γρήγορα! Εκεί που τα κοσμήματα που έφτιαχνα τα έδινα σε άτομα εντός Θεσσαλονίκης, 
              με την έναρξη του 2021 άρχισα να σκέφτομαι το ενδεχόμενο να ασχοληθώ επαγγελματικά με την κατασκευή των κοσμημάτων.
            </p>
            <p className="text-gray-700 leading-relaxed text-base mb-4">
              Σήμερα, η Fwde Jewels έχει εξελιχθεί σε ένα ολοκληρωμένο κατάστημα με κοσμήματα,
              ρολόγια, αξεσουάρ, κρυστάλλους και αρώματα — κάτι για τον καθένα.
            </p>
            <p className="text-gray-700 leading-relaxed text-base mb-4">
              Πιστεύω ότι ο καθένας αξίζει να νιώθει όμορφος και ξεχωριστός, χωρίς να χρειάζεται
              να ξοδέψει μια περιουσία. Γι' αυτό επιλέγω προσεκτικά κάθε προϊόν που μπαίνει στο
              κατάστημα.
            </p>
          </FadeIn>
          <FadeIn delay="delay-200" className="order-1 sm:order-2">
            <img
              src={aboutImg2}
              alt="about image 2"
              className="w-full rounded-sm object-cover"
            />
          </FadeIn>
        </div>
      </section>

      <section className='w-[70%] mx-auto my-12 rounded-lg overflow-hidden'>
        <div className="flex items-center justify-center min-h-[700px] px-8" style={{
    backgroundImage: `url(${aboutImg3})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    opacity:'90%'
  }}>
      <div className='flex items-center justify-center w-full'>
          <FadeIn delay="delay-100" className="text-center max-w-xl">
            <p className="text-white text-lg leading-relaxed mb-4">
              Από τότε μέχρι και τα μέσα του 2022 έκανα ό,τι περνούσε από το χέρι μου για να μάθω όλες τις τεχνικές κατασκευής κοσμημάτων. 
              Από βίντεο στο ίντερνετ έως ηλεκτρονικά σεμινάρια. 
              Μετά από πολλές αλλαγές στη ποιότητα και στην τεχνική έφτασα στο είδος κοσμημάτων που θέλω να αντιπροσωπεύει τη Fwde: 
            </p>
            <p className="text-white text-lg leading-relaxed mb-4">
              Κοσμήματα ανθεκτικά στον χρόνο, φιλικά στο δέρμα, φτιαγμένα με φροντίδα και αγάπη. 
              Τον Μάιο του 2022 ένα βίντεο μου στο tik tok έγινε viral (600.000 προβολές) και η Fwde εκτοξεύτηκε! 
              Με το που μπήκε το 2023, και μόλις μπήκα στα 20 μου, αποφάσισα ότι η Fwde Jewels είναι το επάγγελμα που θέλω να κάνω για το υπόλοιπο της ζωής μου.
            </p>
            <p className="text-white text-lg leading-relaxed mb-4">
              Οι αναποδιές από τότε- αμέτρητες. Σε μπαζάρ που πήρα μέρος στην Αθήνα στις αρχές του 2023, κλάπηκε από τον χώρο που φυλασσόταν όλο το εμπόρευμα μου. 
              Με τη στήριξη των φίλων μου και πελατών που έγιναν φίλοι μου συνέχισα να προσπαθώ να μαζέψω τα σπασμένα. 
              Από τότε η Fwde Jewels είχε την ευκαιρία να συμμετέχει σε δεκάδες events και να τη γνωρίσουν χιλιάδες άτομα.
            </p>
          </FadeIn>
    </div>
        </div>
      </section>

    
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-30">
          <h1 className="text-4xl font-semibold tracking-wide text-center mb-10">
              Latest photo-shooting backstage
          </h1>
          <div>
            <FadeIn>
              <CarouselSwiper carouselSlides={carouselAboutSlides}/>
            </FadeIn>    
          </div>
      </section>

      <FadeIn>
        <section className="bg-brand-dark py-16 px-4 text-center mt-6">
          <h2 className="text-3xl font-bold text-white mb-3">Έτοιμοι να ανακαλύψετε τη συλλογή;</h2>
          <p className="text-white/80 mb-8">Επισκεφτείτε το κατάστημά μας ή ψωνίστε online.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/products" className="bg-white text-brand px-8 py-3 font-bold hover:bg-gray-50 transition">
              Shop Now
            </Link>
            <Link to="/contact" className="border-2 border-white text-white px-8 py-3 font-bold hover:bg-white/10 transition">
              Επικοινωνία
            </Link>
          </div>
        </section>
      </FadeIn>                                                                      
      <Footer />
    </div>
  );
}
