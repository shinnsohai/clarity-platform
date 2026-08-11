import WorldDataMap from './WorldDataMap'
import clientsData from '../data/clientsByCountry.json'

export default function ClientsByCountryMap() {
  return (
    <WorldDataMap
      label="Global Clientele"
      title={<>SERVED CLIENTELE<span className="text-azure">.</span> BY COUNTRY.</>}
      emptyHint="Hover a marker to see how many clients Clarity E&C serves in that country. Figures are managed live via the CMS."
      rows={clientsData.countries}
      renderTooltip={(row) => (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-concrete">Clients Served</span>
            <span className="font-display text-ink">
              {row.clientCount != null ? row.clientCount.toLocaleString() : 'Pending'}
            </span>
          </div>
          {row.notes && <p className="text-concrete text-[11px] leading-snug mt-1">{row.notes}</p>}
        </div>
      )}
    />
  )
}
