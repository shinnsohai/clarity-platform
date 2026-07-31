import { useParams, Navigate, Link } from 'react-router-dom'
import founders from '../../data/founders.json'
import LeadershipAvatar from '../../components/icons/LeadershipAvatar'

function InfoSection({ title, items }) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-5 text-concrete text-xs tracking-[0.3em] uppercase">
        <span className="w-2 h-2 bg-azure rounded-full inline-block" />
        {title}
      </div>
      {items.length > 0 ? (
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li key={i} className="text-ink text-base leading-relaxed pl-4 border-l-2 border-azure">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-concrete text-sm italic pl-4 border-l-2 border-ink/10">
          Content pending — to be updated via the CMS.
        </p>
      )}
    </div>
  )
}

export default function FounderDetail() {
  const { slug } = useParams()
  const person = founders.people.find((p) => p.slug === slug)

  if (!person) return <Navigate to="/about/founder-advisor" replace />

  return (
    <div className="bg-paper">
      <section className="relative bg-pearl py-24">
        <div className="max-w-[1440px] mx-auto px-8 xl:px-16">
          <Link
            to="/about/founder-advisor"
            className="text-azure text-xs tracking-[0.25em] uppercase mb-8 inline-block"
          >
            ← Founders &amp; Advisors
          </Link>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-azure-light text-azure flex items-center justify-center shrink-0">
              <LeadershipAvatar seed={person.seed} className="w-12 h-16" />
            </div>
            <div>
              <div className="text-azure text-xs font-semibold tracking-[0.2em] uppercase mb-2">
                {person.role}
              </div>
              <h1 className="font-display text-4xl md:text-6xl text-ink leading-[0.95]">
                {person.name}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 max-w-[1440px] mx-auto px-8 xl:px-16 grid grid-cols-1 md:grid-cols-3 gap-14">
        <InfoSection title="Qualifications" items={person.qualifications} />
        <InfoSection title="Licenses" items={person.licenses} />
        <InfoSection title="Experience" items={person.experience} />
      </section>
    </div>
  )
}
