import WorldDataMap from './WorldDataMap'
import manpowerData from '../data/manpowerByCountry.json'

function Stat({ label, value, color }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-concrete">{label}</span>
      <span className={`font-display ${color}`}>{value != null ? value.toLocaleString() : 'Pending'}</span>
    </div>
  )
}

export default function ManpowerDeploymentMap() {
  return (
    <WorldDataMap
      label="Global Manpower Deployment"
      title={<>DEPLOYED WORKFORCE<span className="text-azure">.</span> BY COUNTRY.</>}
      emptyHint="Hover a country on the map for total deployed and currently active manpower there. Figures are managed live via the CMS."
      rows={manpowerData.countries}
      renderTooltip={(row) => (
        <div className="flex flex-col gap-1.5">
          <Stat label="Total Deployed" value={row.deployed} color="text-ink" />
          <Stat label="Currently Active" value={row.active} color="text-azure" />
        </div>
      )}
      renderStats={(row) => (
        <div className="flex flex-col gap-1">
          <Stat label="Deployed" value={row.deployed} color="text-ink" />
          <Stat label="Active" value={row.active} color="text-azure" />
        </div>
      )}
    />
  )
}
