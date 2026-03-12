export default function NewsLetter() {
  return (
    <section className="bg-brand text-center py-16 px-4">
      <h1 className="text-white text-3xl pb-4 font-bold">
        Become a member of the Fwde family!
      </h1>
      <p className="text-white mb-8">
        Εγγραφείτε Στο Newsletter Μας Και Λάβετε 10% Έκπτωση Στην Πρώτη Σας
        Αγορά!
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
        <input
          type="email"
          placeholder="Type your email..."
          className="px-4 py-2.5 rounded-sm w-72 outline-none text-gray-800 bg-white"
        />
        <button className="bg-amber-900 text-white px-6 py-2.5 rounded-sm font-semibold hover:bg-amber-950 transition cursor-pointer">
          Subscribe
        </button>
      </div>
    </section>
  );
}
