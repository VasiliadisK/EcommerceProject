import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift, faShieldHalved, faTruck } from '@fortawesome/free-solid-svg-icons';

const perks = [
  {
    icon: faGift,
    title: 'Δώρα',
    lines: [
      '– Δωρεάν πανάκι καθαρισμού κοσμημάτων για παραγγελίες άνω των 20€',
      '– Δωρεάν κοκαλάκι μαλλιών για παραγγελίες άνω των 50€',
      '– Δωρεάν fwde tote bag για παραγγελίες άνω των 80€',
    ],
  },
  {
    icon: faShieldHalved,
    title: 'Ασφαλής Πληρωμές',
    lines: ['100% εγγυημένη ασφάλεια'],
  },
  {
    icon: faTruck,
    title: 'Δωρεάν Μεταφορικά',
    lines: ['Δωρεάν μεταφορικά στις παραγγελίες άνω των 60€ για αποστολές στην Ελλάδα'],
  },
];

export default function PerksBanner() {
  return (
    <section className="bg-brand text-white py-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">
        {perks.map(perk => (
          <div key={perk.title} className="flex items-start gap-4">
            <FontAwesomeIcon icon={perk.icon} className="text-3xl mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold mb-2">{perk.title}</h3>
              {perk.lines.map((line, i) => (
                <p key={i} className="text-sm text-white/90 leading-relaxed mb-1">{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
