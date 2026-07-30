import masterImg from '../assets/images/master-command-center.png'
import techsphereImg from '../assets/images/branch-techsphere.png'
import durabuildImg from '../assets/images/branch-durabuild.png'
import lenixImg from '../assets/images/branch-lenix.png'
import efImg from '../assets/images/branch-ef-recruitment.png'
import cfmImg from '../assets/images/branch-cfm.png'
import manufacturingImg from '../assets/images/branch-manufacturing.png'
import wireframeCutout from '../assets/images/cutout-hierarchy-wireframe.png'
import explosionCutout from '../assets/images/cutout-explosion-site.png'

export const assets = {
  master: masterImg,
  wireframeCutout,
  explosionCutout,
}

// Level 1 — Parent entity
export const parent = {
  id: 'clarity',
  name: 'Clarity E&C Pte Ltd',
  tagline: "Singapore's Integrated Operational Engine",
  image: masterImg,
  theme: 'clarity',
}

// Level 2 — Six branches. Level 3 — sub-divisions.
// theme: 'clarity' = inherits parent Navy/Gold identity (no standalone logo/palette issued)
export const branches = [
  {
    id: 'techsphere',
    slug: 'techsphere',
    name: 'Techsphere',
    fullName: 'Techsphere',
    theme: 'clarity',
    image: techsphereImg,
    role: 'Digital Transformation & IT Solutions',
    summary:
      'Techsphere converts operational data into decision-grade intelligence. It builds the digital backbone the rest of the Group runs on.',
    subDivisions: [
      {
        id: 'digital-transformation',
        name: 'Digital Transformation',
        description:
          'Re-engineers legacy operational workflows into connected, data-driven systems across every branch.',
        icon: 'dataFlow',
      },
      {
        id: 'it-solutions',
        name: 'IT Solutions',
        description:
          'Deploys and maintains the hardware, network, and infrastructure layer that keeps every division online.',
        icon: 'hardwareNode',
      },
    ],
    telemetry: [
      { label: 'Systems Integrated', value: '40+' },
      { label: 'Uptime SLA', value: '99.9%' },
      { label: 'Data Points / Day', value: '2.4M' },
      { label: 'Deployment Cycle', value: '72H' },
    ],
  },
  {
    id: 'durabuild',
    slug: 'durabuild',
    name: 'Durabuild Construction',
    fullName: 'Durabuild Pte Ltd',
    theme: 'durabuild',
    image: durabuildImg,
    role: 'Heavy Structural Engineering & Civil Execution',
    summary:
      'Durabuild executes at civil scale. Structural steel, certified oversight, and professional services built for high-elevation, high-tolerance sites.',
    subDivisions: [
      {
        id: 'construction-workers',
        name: 'Construction Workers',
        description:
          'Certified structural and civil crews deployed for scaffolding, steel erection, and site-level execution.',
        icon: 'hardHat',
      },
      {
        id: 'professional-services',
        name: 'Professional Services',
        description:
          'Design coordination, structural documentation, and compliance planning from blueprint to handover.',
        icon: 'compass',
      },
      {
        id: 're-rto',
        name: 'RE/RTO — Resident Engineer & Resident Technical Officer',
        description:
          'Certified Resident Engineers and Resident Technical Officers providing on-site regulatory and structural oversight.',
        icon: 'crosshair',
      },
    ],
    telemetry: [
      { label: 'Active Sites', value: '18' },
      { label: 'Certified RE/RTO', value: '32' },
      { label: 'Steel Tonnage YTD', value: '11,400T' },
      { label: 'Safety Record', value: 'Zero LTI' },
    ],
  },
  {
    id: 'lenix',
    slug: 'lenix',
    name: 'Lenix Pte Ltd',
    fullName: 'Lenix Pte Ltd',
    theme: 'lenix',
    image: lenixImg,
    role: 'Venture Software & Field Data Systems',
    summary:
      'Lenix builds the software layer between site and strategy — incubating new tools and syncing field data in real time.',
    subDivisions: [
      {
        id: 'venture-lab',
        name: 'Venture Lab',
        description:
          'Incubates and tests new operational tooling before it scales across the Group.',
        icon: 'incubation',
      },
      {
        id: 'builtsync',
        name: 'Builtsync',
        description:
          'Synchronizes live site data across every project so every branch reads from one operational truth.',
        icon: 'sync',
      },
      {
        id: 'pilot-data',
        name: 'Pilot Data',
        description:
          'Runs telemetry pilots that turn raw field signal into forward operational forecasting.',
        icon: 'telemetry',
      },
    ],
    telemetry: [
      { label: 'Active Pilots', value: '9' },
      { label: 'Sites Synced', value: '24' },
      { label: 'Data Latency', value: '<400ms' },
      { label: 'Tools Incubated', value: '6' },
    ],
  },
  {
    id: 'ef-recruitment',
    slug: 'ef-recruitment',
    name: 'E&F Recruitment Pte Ltd',
    fullName: 'E&F Recruitment Pte Ltd',
    theme: 'ef',
    image: efImg,
    role: 'Strategic Manpower & Talent Deployment',
    summary:
      'A diversified group of management managing resources from different countries and placing the best talents to the client’s company. We pride ourselves on providing quality candidates, good customer service, and competitive pricing.',
    subDivisions: [],
    telemetry: [
      { label: 'Talent Pool', value: '3,000+' },
      { label: 'Source Countries', value: '9' },
      { label: 'Placement Rate', value: '96%' },
      { label: 'Avg. Deployment', value: '14 Days' },
    ],
  },
  {
    id: 'facilities-management',
    slug: 'facilities-management',
    name: 'Clarity Facilities Management',
    fullName: 'Clarity Facilities Management Pte Ltd',
    theme: 'cfm',
    image: cfmImg,
    role: 'Infrastructure & Facility Operations',
    summary:
      'CFM runs the built environment after handover — proactive infrastructure health, safety protocol, and terminal-grade service standards.',
    subDivisions: [
      {
        id: 'airport-terminal-services',
        name: 'Airport Terminal Services',
        description:
          'Full-scope terminal operations support, built to aviation-grade logistics and uptime standards.',
        icon: 'aviation',
      },
      {
        id: 'cleaning',
        name: 'Cleaning',
        description:
          'Sterilized, standards-certified cleaning operations across commercial and aviation environments.',
        icon: 'sterile',
      },
    ],
    telemetry: [
      { label: 'Facilities Managed', value: '27' },
      { label: 'Response SLA', value: '<15min' },
      { label: 'Coverage', value: '24/7' },
      { label: 'Compliance Score', value: '100%' },
    ],
  },
  {
    id: 'manufacturing',
    slug: 'manufacturing',
    name: 'Clarity Manufacturing',
    fullName: 'Clarity Manufacturing Pte Ltd',
    theme: 'clarity',
    image: manufacturingImg,
    role: 'Precision Automated Manufacturing',
    summary:
      'Clarity Manufacturing runs the automated floor — precision fabrication executed by trained operators and certified engineers.',
    subDivisions: [
      {
        id: 'operators',
        name: 'Operators',
        description:
          'Trained floor operators running human-machine interface control across the automated production line.',
        icon: 'operatorHMI',
      },
      {
        id: 'engineers',
        name: 'Engineers',
        description:
          'Precision engineers holding tolerance, calibration, and quality across every fabricated unit.',
        icon: 'caliper',
      },
    ],
    telemetry: [
      { label: 'Tolerance', value: '±0.01mm' },
      { label: 'Line Uptime', value: '98.4%' },
      { label: 'Units / Month', value: '18,000' },
      { label: 'QA Pass Rate', value: '99.7%' },
    ],
  },
]

export const getBranchBySlug = (slug) => branches.find((b) => b.slug === slug)

// Group Performance Metrics — homepage
export const groupMetrics = [
  { label: 'Operating Divisions', value: '6' },
  { label: 'Personnel Deployed', value: '3,000+' },
  { label: 'Active Project Sites', value: '18' },
  { label: 'Facilities Under Management', value: '27' },
  { label: 'Systems Integrated', value: '40+' },
  { label: 'Manufacturing Uptime', value: '98.4%' },
]

// Deployment Sequence — mid-scroll showpiece cut data
// `start` = seconds into the concatenated video where this cut begins (placeholder timing
// until the final concatenated file is dropped in — see DeploymentSequence.jsx)
export const deploymentCuts = [
  {
    id: '01',
    start: 0,
    label: 'STRATEGY & TALENT',
    sub: 'E&F RECRUITMENT',
    line: 'Diversified global management sourcing the best talent for competitive operations.',
  },
  {
    id: '02',
    start: 5,
    label: 'DIGITAL ECOSYSTEM',
    sub: 'TECHSPHERE & LENIX',
    line: 'Venture Lab incubation, synchronized Builtsync site data, and IT solutions.',
  },
  {
    id: '03',
    start: 10,
    label: 'CIVIL ENGINEERING',
    sub: 'DURABUILD',
    line: 'Construction workforce, Professional Services, and certified RE/RTO engineers.',
  },
  {
    id: '04',
    start: 15,
    label: 'DEPLOYMENT OPS',
    sub: 'FACILITIES & MFG',
    line: 'Airport terminal services, sterile cleaning, and precision automated manufacturing.',
  },
]
