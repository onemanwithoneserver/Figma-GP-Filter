import { useEffect, useMemo, useState } from 'react'
import { BedDouble, Building2, House, LandPlot } from 'lucide-react'
import FlatsFilters from '../components/Flats/FlatsFilters'
import PlotsFilters from '../components/Plots/PlotsFilters'
import SkyVillasFilters from '../components/SkyVillas/SkyVillasFilters'
import ResultsSection from '../components/layout/ResultsSection'
import TopControls from '../components/layout/TopControls'
import VillasFilters from '../components/Villas/VillasFilters'

const FILTER_COMPONENTS = {
 Flats: FlatsFilters,
 SkyVillas: SkyVillasFilters,
 Villas: VillasFilters,
 Plots: PlotsFilters,
}

const PROPERTY_TYPES = Object.keys(FILTER_COMPONENTS)

const PROPERTY_TYPE_ICONS = {
 Flats: Building2,
 SkyVillas: BedDouble,
 Villas: House,
 Plots: LandPlot,
}

const SECTION_IDS = {
 Flats: ['radius', 'unitSize', 'budget', 'projectType', 'projectStatus', 'specialOffers'],
 SkyVillas: ['radius', 'unitSize', 'budget', 'projectType', 'projectStatus', 'specialOffers'],
 Villas: ['radius', 'unitSize', 'budget', 'projectType', 'projectStatus', 'specialOffers'],
 Plots: ['radius', 'plotSize', 'budget', 'projectType', 'approvals', 'plotType', 'speciality'],
}

const createFilterState = (defaultRadius = 5) => ({
 radius: defaultRadius,
 budgetMode: 'per',
 budgetMin: '',
 budgetMax: '',
 unitSizes: [],
 unitAreaMin: '',
 unitAreaMax: '',
 villasPlotMin: '',
 villasPlotMax: '',
 villasBuiltupMin: '',
 villasBuiltupMax: '',
 plotsPlotMin: '',
 plotsPlotMax: '',
 orrDistance: '',
 projectTypes: [],
 projectStatuses: [],
 propertyAges: [],
 specialOffers: [],
 plotSizes: [],
 approvals: [],
 finalPermissions: [],
 plotTypes: [],
 saleTypes: [],
 specialityProjects: [],
})

const DEFAULT_FILTERS = {
 Flats: createFilterState(3),
 SkyVillas: createFilterState(3),
 Villas: createFilterState(10),
 Plots: createFilterState(15),
}

const PROJECTS = [
 {
 id: 'F1',
 propertyType: 'Flats',
 lat: 17.4478,
 lng: 78.3912,
 name: 'Urban Nest Residency',
 location: 'Madhapur',
 projectType: 'Semi Gated',
 projectStatus: 'Ready to Move',
 propertyAge: 'New Properties',
 unitSize: '3BHK',
 specialOffers: ['Rental Offer', 'Pre-EMI'],
 perBudget: 9800,
 overallBudget: 85,
 distance: 4,
 priceRange: '₹ 78L - ₹ 1.2Cr',
 highlights: ['Metro access', 'Clubhouse'],
 },
 {
 id: 'F2',
 propertyType: 'Flats',
 lat: 17.3897,
 lng: 78.3406,
 name: 'Skyline Heights',
 location: 'Kokapet',
 projectType: 'Hi-Rise (15 to 24 Floors)',
 projectStatus: '6-12 Months',
 propertyAge: 'New Projects',
 unitSize: '2.5BHK',
 specialOffers: ['50:50', 'NO GST'],
 perBudget: 11200,
 overallBudget: 95,
 distance: 9,
 priceRange: '₹ 90L - ₹ 1.4Cr',
 highlights: ['Lake view', 'Premium amenities'],
 },
 {
 id: 'S1',
 propertyType: 'SkyVillas',
 lat: 17.4179,
 lng: 78.3432,
 name: 'Cloud Crest Sky Villas',
 location: 'Financial District',
 projectType: 'Sky Scrappers (G+40 Floors)',
 projectStatus: '<6 Months',
 propertyAge: 'New Projects',
 unitSize: '4BHK',
 specialOffers: ['Low Downpayment', 'Freebies (Kitchen, ACs)'],
 perBudget: 21000,
 overallBudget: 320,
 distance: 6,
 priceRange: '₹ 2.8Cr - ₹ 4.1Cr',
 highlights: ['Private deck', 'Sky lounge'],
 },
 {
 id: 'S2',
 propertyType: 'SkyVillas',
 lat: 17.3892,
 lng: 78.3618,
 name: 'Aero Signature',
 location: 'Narsingi',
 projectType: 'Fully Gated (Upto 5 Floors)',
 projectStatus: '13-18 Months',
 propertyAge: 'New Properties',
 unitSize: '5BHK',
 specialOffers: ['One Time Payment'],
 perBudget: 18500,
 overallBudget: 280,
 distance: 14,
 priceRange: '₹ 2.4Cr - ₹ 3.6Cr',
 highlights: ['Concierge', 'Rooftop pool'],
 },
 {
 id: 'V1',
 propertyType: 'Villas',
 lat: 17.5433,
 lng: 78.4813,
 name: 'Olive Garden Villas',
 location: 'Kompally',
 projectType: 'Fully Gated (Upto 5 Floors)',
 projectStatus: 'Ready to Move',
 propertyAge: 'Used Properties',
 unitSize: '4BHK',
 specialOffers: ['Pre-EMI', 'Low Downpayment'],
 perBudget: 12800,
 overallBudget: 210,
 distance: 18,
 priceRange: '₹ 1.9Cr - ₹ 2.7Cr',
 highlights: ['Corner villa', 'EV charging'],
 },
 {
 id: 'V2',
 propertyType: 'Villas',
 lat: 17.4541,
 lng: 78.3056,
 name: 'Prime Grove',
 location: 'Tellapur',
 projectType: 'Stand alone',
 projectStatus: '19-24 Months',
 propertyAge: 'New Properties',
 unitSize: '3BHK',
 specialOffers: ['Others'],
 perBudget: 10600,
 overallBudget: 165,
 distance: 11,
 priceRange: '₹ 1.5Cr - ₹ 2.2Cr',
 highlights: ['Low density', 'Landscaped greens'],
 },
 {
 id: 'P1',
 propertyType: 'Plots',
 lat: 17.0712,
 lng: 78.1969,
 name: 'Green Avenue Plots',
 location: 'Shadnagar',
 projectType: 'Independent Plot',
 approval: 'HMDA',
 finalPermission: 'Received',
 plotType: 'Ready for Construction',
 saleType: 'Direct Sale',
 orrDistance: '20-30 Km',
 plotSize: '240 Sq.Yd',
 specialityProjects: ['Villa Plots'],
 perBudget: 18000,
 overallBudget: 70,
 distance: 22,
 priceRange: '₹ 42L - ₹ 75L',
 highlights: ['Wide roads', 'Underground drainage'],
 },
 {
 id: 'P2',
 propertyType: 'Plots',
 lat: 17.0928,
 lng: 78.6328,
 name: 'Eco Harvest Lands',
 location: 'Yacharam',
 projectType: 'Fully Gated with Clubhouse',
 approval: 'DTCP',
 finalPermission: 'Not Received',
 plotType: 'Long Term Investment',
 saleType: 'Resale',
 orrDistance: '30+ Km',
 plotSize: '300 Sq.Yd+',
 specialityProjects: ['Organic Farming', 'Plantation'],
 perBudget: 12000,
 overallBudget: 55,
 distance: 27,
 priceRange: '₹ 28L - ₹ 60L',
 highlights: ['Highway access', 'Future growth zone'],
 },
]

const parseBudget = (value) => {
 if (!value) {
 return null
 }
 return Number(value)
}

const matchesArray = (selected, value) => {
 if (!selected.length) {
 return true
 }

 if (Array.isArray(value)) {
 return selected.some((item) => value.includes(item))
 }

 return selected.includes(value)
}

export default function SearchPage() {
 const [previewMode, setPreviewMode] = useState('desktop')
 const [activeType, setActiveType] = useState('Flats')
 const [filters, setFilters] = useState(DEFAULT_FILTERS)
 const [showFilters, setShowFilters] = useState({ desktop: true, tablet: true, mobile: true })
 const [openSections, setOpenSections] = useState({
 desktop: SECTION_IDS.Flats,
 tablet: SECTION_IDS.Flats,
 mobile: [SECTION_IDS.Flats[0]],
 })

 const ActiveFilters = useMemo(() => FILTER_COMPONENTS[activeType], [activeType])
 const activeFilterState = filters[activeType]

 useEffect(() => {
 const defaults = SECTION_IDS[activeType]
 setOpenSections({
 desktop: defaults,
 tablet: defaults,
 mobile: [defaults[0]],
 })
 setShowFilters({ desktop: true, tablet: true, mobile: true })
 }, [activeType])

 const updateActiveFilter = (field, value, isMultiSelect = false) => {
 setFilters((previous) => {
 const current = previous[activeType]
 const nextValue = isMultiSelect
 ? current[field].includes(value)
 ? current[field].filter((item) => item !== value)
 : [...current[field], value]
 : value

 return {
 ...previous,
 [activeType]: {
 ...current,
 [field]: nextValue,
 },
 }
 })
 }

 const toggleSection = (mode, id) => {
 if (mode === 'mobile') {
 setOpenSections((previous) => ({ ...previous, mobile: [id] }))
 return
 }

 setOpenSections((previous) => ({
 ...previous,
 [mode]: previous[mode].includes(id)
 ? previous[mode].filter((item) => item !== id)
 : [...previous[mode], id],
 }))
 }

 const filteredResults = useMemo(() => {
 const state = filters[activeType]
 const minBudget = parseBudget(state.budgetMin)
 const maxBudget = parseBudget(state.budgetMax)

 return PROJECTS.filter((project) => {
 if (project.propertyType !== activeType) {
 return false
 }

 const budgetValue = state.budgetMode === 'per' ? project.perBudget : project.overallBudget
 if (minBudget !== null && budgetValue < minBudget) {
 return false
 }
 if (maxBudget !== null && budgetValue > maxBudget) {
 return false
 }

 if (project.distance > state.radius) {
 return false
 }

 if (activeType === 'Plots') {
 return (
 matchesArray(state.plotSizes, project.plotSize) &&
 matchesArray(state.projectTypes, project.projectType) &&
 matchesArray(state.approvals, project.approval) &&
 matchesArray(state.finalPermissions, project.finalPermission) &&
 matchesArray(state.plotTypes, project.plotType) &&
 matchesArray(state.saleTypes, project.saleType) &&
 matchesArray(state.specialityProjects, project.specialityProjects)
 )
 }

 return (
 matchesArray(state.unitSizes, project.unitSize) &&
 matchesArray(state.projectTypes, project.projectType) &&
 matchesArray(state.projectStatuses, project.projectStatus) &&
 matchesArray(state.propertyAges, project.propertyAge) &&
 matchesArray(state.specialOffers, project.specialOffers)
 )
 })
 }, [activeType, filters])

 const renderPreview = (mode) => {
 const showModeFilters = showFilters[mode]
 const viewportShellClass =
 mode === 'desktop'
 ? 'w-full max-w-[1400px]'
 : mode === 'tablet'
 ? 'mx-auto w-full max-w-[920px]'
 : 'mx-auto w-full max-w-[402px]'

 return (
 <section
 key={mode}
 id={`preview-${mode}`}
 className={`mx-auto rounded-[5px] border bg-white transition-all duration-200 ${
 previewMode === mode
 ? 'border-[#2A221C]/8'
 : 'border-[#2A221C]/8 opacity-50 hover:opacity-100'
 }`}
 >
 <div className={`${viewportShellClass} flex flex-col gap-1.5 p-2`}>
 {showModeFilters ? (
 <div className="flex flex-col gap-1.5">
 {/* Property Type Tabs + Results */}
 <div className="flex items-end">
 <div className={mode === 'mobile' ? 'grid min-w-0 flex-1 grid-cols-4 gap-1.5' : 'flex min-w-0 flex-1 items-end gap-1.5'}>
 {PROPERTY_TYPES.map((type) => {
 const TypeIcon = PROPERTY_TYPE_ICONS[type]
 const isActive = activeType === type

 return (
 <button
 key={`${mode}-${type}`}
 type="button"
 onClick={() => setActiveType(type)}
 className={`${mode === 'mobile' ? 'inline-flex w-full flex-col items-center gap-1 rounded-[5px] px-2 py-[6px] text-[10px] font-semibold tracking-[-0.01em] transition-all duration-150' : 'inline-flex shrink-0 flex-col items-center gap-1 rounded-[5px] px-3 py-[6px] text-[10px] font-semibold tracking-[-0.01em] transition-all duration-150 sm:px-4 sm:text-[11px]'} ${
 isActive
 ? 'border border-[#EE5500]/20 bg-[#EE5500]/10 text-[#EE5500]'
 : 'border border-transparent bg-[#F7F4F0]/50 text-[#2A221C] hover:bg-[#F7F4F0] hover:text-[#2A221C]'
 }`}
 >
 {TypeIcon && (
 <TypeIcon
 size={18}
 strokeWidth={isActive ? 2 : 1.5}
 className={isActive ? 'text-[#D94F00]' : 'text-[#2A221C]'}
 />
 )}
 {type === 'SkyVillas' ? 'Sky Villas' : type}
 </button>
 )
 })}
 </div>

 {/* Results count inline */}
 <div className="ml-1 shrink-0 self-stretch">
 <ResultsSection results={filteredResults} />
 </div>
 </div>

 {/* Filters */}
 <ActiveFilters
 filterState={activeFilterState}
 onUpdate={updateActiveFilter}
 openSections={openSections[mode]}
 onToggleSection={(id) => toggleSection(mode, id)}
 isMobile={mode === 'mobile'}
 />

 {/* Action buttons */}
 <div className="flex items-center gap-1.5 pt-[2px]">
 <button
 type="button"
 className="rounded-[5px] px-3 py-[6px] text-[10.5px] font-semibold text-[#2A221C] transition-all hover:text-[#2A221C]"
 >
 Clear All
 </button>
 <button
 type="button"
 className="rounded-[5px] border border-[#2A221C] bg-white px-3.5 py-1.5 text-[10.5px] font-semibold text-[#2A221C] transition-all hover:border-[#2A221C]/8 hover:text-[#2A221C]"
 >
 Save Search
 </button>
 <button
 type="button"
 className="ml-auto rounded-[5px] bg-[#EE5500] px-5 py-[6px] text-[10.5px] font-bold text-white transition-all hover:bg-[#D94F00] active:scale-[0.97]"
 >
 Show {filteredResults.length} Properties
 </button>
 </div>
 </div>
 ) : (
 <div className="rounded-[5px] border border-dashed border-[#2A221C]/8 bg-[#F7F4F0]/40 p-3 text-center text-[10.5px] font-medium text-[#2A221C]">
 Filters collapsed — tap the filter icon to expand.
 </div>
 )}
 </div>
 </section>
 )
 }

 return (
 <div className="min-h-screen bg-[#F7F4F0] font-sans text-[#2A221C]">
 <div className="sticky top-0 z-50 border-b border-[#2A221C]/8 bg-white/95 backdrop-blur-md">
 <TopControls
 previewMode={previewMode}
 onPreviewModeChange={setPreviewMode}
 onFilterToggle={() =>
 setShowFilters((previous) => ({ ...previous, mobile: !previous.mobile }))
 }
 />
 </div>

 <div className="mx-auto flex w-full flex-col gap-2 p-2 pb-4">
 {renderPreview(previewMode)}
 </div>
 </div>
 )
}
