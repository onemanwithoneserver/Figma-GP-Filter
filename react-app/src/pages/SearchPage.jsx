    import { useEffect, useMemo, useState } from 'react'
    import { LocateFixed, Search, SlidersHorizontal } from 'lucide-react'
    import RadiusSlider from '../components/common/RadiusSlider'
    import FlatsFilters from '../components/Flats/FlatsFilters'
    import PlotsFilters from '../components/Plots/PlotsFilters'
    import SkyVillasFilters from '../components/SkyVillas/SkyVillasFilters'
    import ResultsSection from '../components/layout/ResultsSection'
    import TopControls from '../components/layout/TopControls'
    import VillasFilters from '../components/Villas/VillasFilters'
    import FilterSearchPanel from '../components/search/FilterSearchPanel'

    const FILTER_COMPONENTS = {
    Flats: FlatsFilters,
    SkyVillas: SkyVillasFilters,
    Villas: VillasFilters,
    Plots: PlotsFilters,
    }

    const PROPERTY_TYPES = Object.keys(FILTER_COMPONENTS)

    const PROPERTY_TYPE_ICONS = {
    Flats: '🏢',
    SkyVillas: '🏙️',
    Villas: '🏡',
    Plots: '🌄',
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
    const [showSearch, setShowSearch] = useState({ desktop: false, tablet: false, mobile: false })
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

    const openSearchForMode = (mode) => {
    setShowSearch((previous) => ({
    ...previous,
    [mode]: true,
    }))
    setShowFilters((previous) => ({
    ...previous,
    [mode]: false,
    }))
    }

    const openFiltersForMode = (mode) => {
    setShowFilters((previous) => ({
    ...previous,
    [mode]: true,
    }))
    setShowSearch((previous) => ({
    ...previous,
    [mode]: false,
    }))
    }

    const toggleFiltersForMode = (mode) => {
    setShowFilters((previous) => ({
    ...previous,
    [mode]: !previous[mode],
    }))

    if (!showFilters[mode]) {
    setShowSearch((previous) => ({
    ...previous,
    [mode]: false,
    }))
    }
    }

    const renderFilterBody = (mode) => {
    const isMobile = mode === 'mobile'
    const isDesktop = mode === 'desktop'

    const filterControls = (
    <>
    <div className="flex items-end gap-2">
    <div className={isMobile ? 'grid min-w-0 flex-1 grid-cols-4 gap-1.5' : 'flex min-w-0 shrink-0 items-end gap-1.5'}>
    {PROPERTY_TYPES.map((type) => {
    const typeEmoji = PROPERTY_TYPE_ICONS[type]
    const isActive = activeType === type

    return (
    <button
    key={`${mode}-${type}`}
    type="button"
    onClick={() => setActiveType(type)}
    className={`${isMobile ? 'inline-flex w-full flex-col items-center gap-1 rounded-[5px] px-2 py-1.5 text-[10px] font-semibold tracking-[-0.01em] transition-all duration-150' : 'inline-flex shrink-0 flex-col items-center gap-1 rounded-[5px] px-3 py-1.5 text-[10px] font-semibold tracking-[-0.01em] transition-all duration-150 sm:px-4 sm:text-[11px]'} ${
    isActive
    ? 'border border-[#EE5500]/25 bg-[#FFF2E7] text-[#D94F00]'
    : 'border border-transparent bg-white/65 text-[#2A221C] hover:bg-white hover:text-[#2A221C]'
    }`}
    >
    <span className="text-[18px] leading-none" role="img" aria-hidden="true">{typeEmoji}</span>
    {type === 'SkyVillas' ? 'Sky Villas' : type}
    </button>
    )
    })}
    </div>

    {!isMobile && (
    <div className="ml-0.5 flex min-w-70 flex-1 items-center gap-2 rounded-[6px] border border-[#2A221C]/10 bg-white px-2.5 py-1.75">
    <span className="text-[10px] font-semibold tracking-wide text-[#2A221C]/80">Radius</span>
    <div className="flex-1">
    <RadiusSlider
    value={activeFilterState.radius}
    onChange={(value) => updateActiveFilter('radius', value)}
    />
    </div>
    </div>
    )}

    <div className="shrink-0 self-stretch">
    <ResultsSection results={filteredResults} />
    </div>
    </div>

    {isMobile && (
    <div className="flex items-center gap-2 rounded-[6px] border border-[#2A221C]/10 bg-white px-2.5 py-1.75">
    <span className="text-[10px] font-semibold tracking-wide text-[#2A221C]/80">Radius</span>
    <div className="flex-1">
    <RadiusSlider
    value={activeFilterState.radius}
    onChange={(value) => updateActiveFilter('radius', value)}
    />
    </div>
    </div>
    )}

    <ActiveFilters
    filterState={activeFilterState}
    onUpdate={updateActiveFilter}
    openSections={openSections[mode]}
    onToggleSection={(id) => toggleSection(mode, id)}
    isMobile={isMobile}
    showRadiusInAccordion={false}
    isDesktopView={isDesktop}
    />

    {isMobile ? (
    <div className="flex items-center gap-1.5 pt-0.5">
    <button
    type="button"
    className="rounded-[5px] px-3 py-1.5 text-[10.5px] font-semibold text-[#2A221C] transition-all hover:text-[#2A221C]"
    >
    Clear All
    </button>
    <button
    type="button"
    className="rounded-[5px] border border-[#2A221C]/70 bg-white px-3.5 py-1.5 text-[10.5px] font-semibold text-[#2A221C] transition-all hover:border-[#2A221C]/80 hover:text-[#2A221C]"
    >
    Save Search
    </button>
    <button
    type="button"
    className="ml-auto rounded-[5px] bg-[#EE5500] px-5 py-1.5 text-[10.5px] font-bold text-white transition-all hover:bg-[#D94F00] active:scale-[0.97]"
    >
    Show {filteredResults.length} Properties
    </button>
    </div>
    ) : (
    <div className="flex items-center gap-1.5 pt-0.5">
    <button
    type="button"
    className="rounded-[5px] px-3 py-1.5 text-[10.5px] font-semibold text-[#2A221C] transition-all hover:text-[#2A221C]"
    >
    Clear All
    </button>
    <button
    type="button"
    className="rounded-[5px] border border-[#2A221C]/70 bg-white px-3.5 py-1.5 text-[10.5px] font-semibold text-[#2A221C] transition-all hover:border-[#2A221C]/80 hover:text-[#2A221C]"
    >
    Save Search
    </button>
    <button
    type="button"
    className="ml-auto rounded-[5px] bg-[#EE5500] px-5 py-1.5 text-[10.5px] font-bold text-white transition-all hover:bg-[#D94F00] active:scale-[0.97]"
    >
    Show {filteredResults.length} Properties
    </button>
    </div>
    )}
    </>
    )

    if (isDesktop) {
    return (
    <div className="grid grid-cols-[minmax(0,1fr)_410px] gap-2">
    <div className="flex min-w-0 flex-col gap-2">{filterControls}</div>
    <aside className="rounded-[6px] border border-[#2A221C]/8 bg-[#F6EEE5] p-3">
    <p className="text-[9px] font-semibold tracking-wide text-[#D94F00]">Sample Ad</p>
    <h4 className="mt-1 text-[26px] font-bold leading-tight text-[#2A221C]">Premium Listing Boost</h4>
    <p className="mt-1 text-[10.5px] leading-4 text-[#2A221C]/80">
    Highlight your property across top searches and map cards for 7 days.
    </p>
    <button
    type="button"
    className="mt-6 w-full rounded-[5px] bg-[#2A221C] px-3 py-1.75 text-[14px] font-semibold text-white transition-all hover:bg-[#1D1713]"
    >
    Contact Sales
    </button>
    </aside>
    </div>
    )
    }

    return <div className="flex flex-col gap-1.5">{filterControls}</div>
    }

    const renderPreview = (mode) => {
    const showModeSearch = showSearch[mode]
    const showModeFilters = showFilters[mode]
    const viewportShellClass =
    mode === 'desktop'
    ? 'w-full max-w-[1420px]'
    : mode === 'tablet'
    ? 'mx-auto w-full max-w-[920px]'
    : 'mx-auto w-full max-w-[402px]'

    return (
    <section
    key={mode}
    id={`preview-${mode}`}
    className={`mx-auto bg-transparent transition-all duration-200 ${
    previewMode === mode
    ? ''
    : 'opacity-70 hover:opacity-100'
    }`}
    >
    <div className={`${viewportShellClass} flex flex-col gap-2 px-2 pb-2`}>
    <div className="search-section z-30 py-2">
    <section className={mode === 'desktop' ? 'mx-auto w-full max-w-[460px]' : 'mx-auto w-full'}>
    {showModeSearch ? (
    <FilterSearchPanel
    onOpenFilters={() => openFiltersForMode(mode)}
    autoFocusInput={showModeSearch}
    />
    ) : (
    <div className="flex min-h-16 items-center gap-2 rounded-[6px] border border-[#2A221C]/10 bg-[#F7F4F0] px-2 shadow-[0_1px_2px_rgba(42,34,28,0.08)]">
    <button
    type="button"
    onClick={() => openSearchForMode(mode)}
    className="inline-flex min-w-0 flex-1 items-center gap-2 rounded-[5px] px-2 py-1 text-left"
    >
    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[5px] bg-[#FFF2E7] text-[#EE5500]">
    <LocateFixed size={14} />
    </span>
    <span className="truncate text-[13px] font-medium text-[#A89F95]">
    Search places, projects...
    </span>
    </button>

    <button
    type="button"
    onClick={() => toggleFiltersForMode(mode)}
    aria-label="Open filters"
    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[5px] border border-[#2A221C]/10 bg-[#F7F4F0] text-[#5E5750] transition-all duration-150 hover:border-[#EE5500]/20 hover:bg-[#FFF2E7] hover:text-[#EE5500]"
    >
    <SlidersHorizontal size={14} />
    </button>

    <button
    type="button"
    onClick={() => openSearchForMode(mode)}
    aria-label="Open search"
    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[5px] border border-[#2A221C]/10 bg-[#F7F4F0] text-[#5E5750] transition-all duration-150 hover:border-[#EE5500]/20 hover:bg-[#FFF2E7] hover:text-[#EE5500]"
    >
    <Search size={14} />
    </button>
    </div>
    )}
    </section>
    </div>

    <div
    className={`filter-section ${
    showModeFilters ? 'bg-[#FFFFFF] p-2 shadow-[0_1px_2px_rgba(42,34,28,0.06)]' : 'bg-transparent p-0 shadow-none'
    }`}
    >
    {showModeFilters ? renderFilterBody(mode) : null}
    </div>
    </div>
    </section>
    )
    }

    return (
    <div className="min-h-screen bg-[#F3F1EE] font-sans text-[#2A221C]">
    <div className="z-50 bg-transparent pt-4">
    <TopControls
    previewMode={previewMode}
    onPreviewModeChange={setPreviewMode}
    />
    </div>
    <div className="mx-auto flex w-full flex-col gap-2 px-2 pb-4 pt-3">
    {renderPreview(previewMode)}
    </div>
    </div>
    )
    }
