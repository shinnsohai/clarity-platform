import WorldDataMap from './WorldDataMap'
import clientsData from '../data/clientsByCountry.json'

export default function ClientsByCountryMap() {
  return (
    <WorldDataMap
      label="Global Clientele"
      title={<>SERVED CLIENTELE<span className="text-azure">.</span> BY COUNTRY.</>}
      emptyHint="Select a country to see how many clients Clarity E&C serves there. Figures are managed live via the CMS."
      rows={clientsData.countries}
      renderStats={(row) => (
        <div>
          <div className="font-display text-3xl md:text-4xl text-ink">
            {row.clientCount != null ? row.clientCount.toLocaleString() : 'Pending'}
          </div>
          <div className="text-concrete text-xs tracking-[0.15em] uppercase mt-1">Clients Served</div>
          {row.notes && <p className="text-concrete text-sm leading-relaxed mt-4 max-w-xl">{row.notes}</p>}
        </div>
      )}
    />
  )
}
