import WorldDataMap from './WorldDataMap'
import manpowerData from '../data/manpowerByCountry.json'

export default function ManpowerDeploymentMap() {
  return (
    <WorldDataMap
      label="Global Manpower Deployment"
      title={<>DEPLOYED WORKFORCE<span className="text-azure">.</span> BY COUNTRY.</>}
      emptyHint="Hover a marker for total deployed and currently active manpower in that country. Figures are managed live via the CMS."
      rows={manpowerData.countries}
      renderTooltip={(row) => (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-concrete">Total Deployed</span>
            <span className="font-display text-ink">
              {row.deployed != null ? row.deployed.toLocaleString() : 'Pending'}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-concrete">Currently Active</span>
            <span className="font-display text-azure">
              {row.active != null ? row.active.toLocaleString() : 'Pending'}
            </span>
          </div>
        </div>
      )}
    />
  )
}
