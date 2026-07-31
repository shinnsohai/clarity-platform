import { entities } from '../data/hierarchy'
import corporateProfile from '../data/corporateProfile.json'

// No verified third-party client roster was supplied, so this strip runs the Group's own
// subsidiary marks plus its held accreditations rather than inventing client names/logos.
export default function ClientCarousel() {
  const items = [
    ...entities.map((e) => ({ key: e.id, label: e.name, logo: e.logo })),
    ...corporateProfile.accreditations.map((a) => ({ key: a.id, label: a.code, badge: true })),
  ]
  const doubled = [...items, ...items]

  return (
    <section className="relative bg-paper py-16 border-y border-ink/10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 xl:px-16 mb-8">
        <div className="flex items-center gap-4 text-concrete text-xs tracking-[0.3em] uppercase">
          <span className="w-2 h-2 bg-azure rounded-full inline-block" />
          Certified &amp; Trusted
        </div>
      </div>

      <div className="flex gap-16 whitespace-nowrap animate-[marquee_28s_linear_infinite] w-max px-8">
        {doubled.map((item, i) => (
          <div key={`${item.key}-${i}`} className="flex items-center gap-3 shrink-0 opacity-70 hover:opacity-100 transition-opacity">
            {item.badge ? (
              <span className="font-display text-lg text-ink border border-ink/15 rounded-full px-5 py-2">
                {item.label}
              </span>
            ) : (
              <>
                <img src={item.logo} alt={item.label} className="h-8 w-8 object-contain" />
                <span className="font-display text-lg text-ink">{item.label}</span>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
