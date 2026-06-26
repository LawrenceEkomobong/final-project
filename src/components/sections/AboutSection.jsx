import founderPhoto from '../../assets/image1.png'

export default function AboutSection() {
  return (
    <section className="bg-cream text-[#1C1C1C]">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <img src={founderPhoto} alt="Chef K" className="w-full rounded-md object-cover" />
          </div>
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.28em] text-brand-red">Meet Chef K</p>
            <h2 className="text-4xl font-semibold">A chef who builds menus, safety systems, and memorable dining experiences.</h2>
            <p className="text-base leading-8 text-[#4F4F4F]">
              With 10+ years in professional kitchens, Chef K helps clients master both flavor and safety. As a food consultant, she develops custom menus, streamlines kitchen workflows, and solves operational challenges for homes, events, and food businesses. As a food safety coach, she trains teams on HACCP principles, cross-contamination prevention, and compliance, making safety second nature.
            </p>
            <p className="text-lg italic font-semibold text-brand-red">
              "Chef K is the 'fixer' you call when food operations need to run safer and smarter."
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {[
            { title: '10+ Years Experience', value: '10+' },
            { title: 'Clients Served', value: '500+' },
            { title: 'HACCP Certified', value: 'Verified' },
          ].map((item) => (
            <div key={item.title} className="rounded-md border border-[#E2DEC9] bg-white p-6">
              <p className="text-3xl font-semibold text-[#121212]">{item.value}</p>
              <p className="mt-3 text-sm text-[#4F4F4F]">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
