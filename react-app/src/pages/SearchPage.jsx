import { useEffect, useMemo, useState } from 'react'
import { BedDouble, Building2, House, LandPlot } from 'lucide-react'
import FlatsFilters from '../components/Flats/FlatsFilters'
import PlotsFilters from '../components/Plots/PlotsFilters'
import SkyVillasFilters from '../components/SkyVillas/SkyVillasFilters'
import MapSection from '../components/layout/MapSection'
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

const createFilterState = () => ({
  radius: 5,
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
  Flats: createFilterState(),
  SkyVillas: createFilterState(),
  Villas: createFilterState(),
  Plots: createFilterState(),
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
    const desktopLayout = mode === 'desktop'
    const showModeFilters = showFilters[mode]
    const viewportShellClass =
      mode === 'desktop'
        ? 'w-full'
        : mode === 'tablet'
          ? 'mx-auto w-full max-w-[920px]'
          : 'mx-auto w-full max-w-[430px]'

    return (
      <section
        key={mode}
        id={`preview-${mode}`}
        className={`rounded-[7px] border bg-(--white) p-3 transition-all ${
          previewMode === mode
            ? 'border-(--primary) ring-2 ring-(--primary)/20'
            : 'border-(--dark)/20'
        }`}
      >
        <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-(--dark)">{mode} preview</div>

        <div
          className={`${viewportShellClass} flex gap-3 ${desktopLayout ? 'flex-row' : 'flex-col'}`}
        >
          {showModeFilters ? (
            <aside
              className={`rounded-[7px] border border-(--dark)/15 bg-(--white) p-3 ${
                desktopLayout ? 'w-3/5' : 'w-full'
              }`}
            >
              <div className="mb-3 flex flex-wrap gap-2">
                {PROPERTY_TYPES.map((type) => {
                  const TypeIcon = PROPERTY_TYPE_ICONS[type]

                  return (
                    <button
                      key={`${mode}-${type}`}
                      type="button"
                      onClick={() => setActiveType(type)}
                      className={`inline-flex items-center gap-1.5 rounded-[7px] border px-3 py-2 text-xs font-semibold ${
                        activeType === type
                          ? 'border-(--primary) bg-(--primary) text-(--white)'
                          : 'border-(--dark)/20 bg-(--white) text-(--dark)'
                      }`}
                    >
                      {TypeIcon ? <TypeIcon size={14} /> : null}
                      {type}
                    </button>
                  )
                })}
              </div>

              <ActiveFilters
                filterState={activeFilterState}
                onUpdate={updateActiveFilter}
                openSections={openSections[mode]}
                onToggleSection={(id) => toggleSection(mode, id)}
              />
            </aside>
          ) : (
            <aside className="rounded-[7px] border border-dashed border-(--dark)/20 bg-(--bg) p-4 text-sm text-[var(--dark)]/80">
              Filters are collapsed for mobile preview. Use the filter icon above to open.
            </aside>
          )}

          <section className={`flex gap-3 ${desktopLayout ? 'w-2/5 flex-col' : 'w-full flex-col'}`}>
            <div className={desktopLayout ? 'h-[280px]' : mode === 'tablet' ? 'h-[280px]' : 'h-[260px]'}>
              <ResultsSection results={filteredResults} />
            </div>

            <div className={desktopLayout ? 'min-h-[420px]' : mode === 'tablet' ? 'min-h-[460px]' : 'min-h-[500px]'}>
              <MapSection results={filteredResults} />
            </div>
          </section>
        </div>
      </section>
    )
  }

  return (
    <div className="min-h-screen bg-(--bg)">
      <TopControls
        previewMode={previewMode}
        onPreviewModeChange={setPreviewMode}
        onFilterToggle={() =>
          setShowFilters((previous) => ({ ...previous, mobile: !previous.mobile }))
        }
      />

      <div className="mx-auto flex w-full max-w-400 flex-col gap-4 p-3 pb-8">
        {renderPreview(previewMode)}
      </div>
    </div>
  )
}
