import WorldDataMap from './WorldDataMap'
import manpowerData from '../data/manpowerByCountry.json'

export default function ManpowerDeploymentMap() {
  return (
    <WorldDataMap
      label="Global Manpower Deployment"
      title={<>DEPLOYED WORKFORCE<span className="text-azure">.</span> BY COUNTRY.</>}
      emptyHint="Select a country to see total deployed and currently active manpower there. Figures are managed live via the CMS."
      rows={manpowerData.countries}
      renderStats={(row) => (
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="font-display text-3xl md:text-4xl text-ink">
              {row.deployed != null ? row.deployed.toLocaleString() : 'Pending'}
            </div>
            <div className="text-concrete text-xs tracking-[0.15em] uppercase mt-1">Total Deployed</div>
          </div>
          <div>
            <div className="font-display text-3xl md:text-4xl text-azure">
              {row.active != null ? row.active.toLocaleString() : 'Pending'}
            </div>
            <div className="text-concrete text-xs tracking-[0.15em] uppercase mt-1">Currently Active</div>
          </div>
        </div>
      )}
    />
  )
}
