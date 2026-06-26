const points = [
  { title: 'Quality Ingredients', description: 'Seasonal produce, premium cakes, and precise flavor balance.' },
  { title: 'Expert Chef', description: 'Chef K brings 10+ years of culinary training and food safety rigor.' },
  { title: 'Fresh Daily', description: 'Made to order with the freshest ingredients and thoughtful preparation.' },
  { title: 'Safe & Certified', description: 'Food safety processes built into every kitchen, menu, and event.' },
]

export default function WhyChooseUs() {
  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.28em] text-brand-red">Why Choose Us</p>
          <h2 className="mt-3 text-4xl font-semibold">A culinary experience that feels executive and refined.</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((item) => (
            <div key={item.title} className="rounded-md border border-white/10 bg-white/5 p-6">
              <div className="mb-4 h-12 w-12 rounded-md bg-white/10"></div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/70">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
