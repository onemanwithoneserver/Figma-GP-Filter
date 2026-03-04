import { Building2, CalendarDays, Home, IndianRupee, MapPin, Sparkles } from 'lucide-react'
import AccordionSection from '../common/AccordionSection'
import BudgetFilter from '../common/BudgetFilter'
import RadiusSlider from '../common/RadiusSlider'
import { FLATS_OVERALL_OPTIONS, FLATS_PER_SQFT_OPTIONS } from '../common/filterOptions'
import ProjectStatusFilter from './ProjectStatusFilter'
import ProjectTypeFilter from './ProjectTypeFilter'
import SpecialOffers from './SpecialOffers'
import UnitAreaFilter from './UnitAreaFilter'

export default function FlatsFilters({ filterState, onUpdate, openSections, onToggleSection }) {
  const isOpen = (id) => openSections.includes(id)
  const premiumSectionClass =
    'rounded-[7px] border-[var(--dark)]/15 shadow-[0_10px_30px_rgba(0,0,0,0.05)]'
  const premiumHeaderClass = 'bg-[var(--white)]'
  const premiumContentClass = 'bg-[var(--white)]'

  return (
    <div>
      <AccordionSection
        title="Radius"
        icon={MapPin}
        open={isOpen('radius')}
        onToggle={() => onToggleSection('radius')}
        sectionClassName={premiumSectionClass}
        headerClassName={premiumHeaderClass}
        contentClassName={premiumContentClass}
      >
        <RadiusSlider value={filterState.radius} onChange={(value) => onUpdate('radius', value)} />
      </AccordionSection>

      <AccordionSection
        title="Unit Size & Area"
        icon={Home}
        open={isOpen('unitSize')}
        onToggle={() => onToggleSection('unitSize')}
        sectionClassName={premiumSectionClass}
        headerClassName={premiumHeaderClass}
        contentClassName={premiumContentClass}
      >
        <UnitAreaFilter
          selected={filterState.unitSizes}
          onToggle={(value) => onUpdate('unitSizes', value, true)}
          areaMin={filterState.unitAreaMin}
          areaMax={filterState.unitAreaMax}
          onAreaMinChange={(value) => onUpdate('unitAreaMin', value)}
          onAreaMaxChange={(value) => onUpdate('unitAreaMax', value)}
        />
      </AccordionSection>

      <AccordionSection
        title="Budget"
        icon={IndianRupee}
        open={isOpen('budget')}
        onToggle={() => onToggleSection('budget')}
        sectionClassName={premiumSectionClass}
        headerClassName={premiumHeaderClass}
        contentClassName={premiumContentClass}
      >
        <BudgetFilter
          mode={filterState.budgetMode}
          min={filterState.budgetMin}
          max={filterState.budgetMax}
          onModeChange={(value) => onUpdate('budgetMode', value)}
          onMinChange={(value) => onUpdate('budgetMin', value)}
          onMaxChange={(value) => onUpdate('budgetMax', value)}
          perLabel="Per Sft"
          overallLabel="Overall"
          perOptions={FLATS_PER_SQFT_OPTIONS}
          overallOptions={FLATS_OVERALL_OPTIONS}
        />
      </AccordionSection>

      <AccordionSection
        title="Project Type"
        icon={Building2}
        open={isOpen('projectType')}
        onToggle={() => onToggleSection('projectType')}
        sectionClassName={premiumSectionClass}
        headerClassName={premiumHeaderClass}
        contentClassName={premiumContentClass}
      >
        <ProjectTypeFilter
          selected={filterState.projectTypes}
          onToggle={(value) => onUpdate('projectTypes', value, true)}
        />
      </AccordionSection>

      <AccordionSection
        title="Project Status & Age"
        icon={CalendarDays}
        open={isOpen('projectStatus')}
        onToggle={() => onToggleSection('projectStatus')}
        sectionClassName={premiumSectionClass}
        headerClassName={premiumHeaderClass}
        contentClassName={premiumContentClass}
      >
        <ProjectStatusFilter
          selected={filterState.projectStatuses}
          onToggle={(value) => onUpdate('projectStatuses', value, true)}
          propertyAges={filterState.propertyAges}
          onTogglePropertyAge={(value) => onUpdate('propertyAges', value, true)}
        />
      </AccordionSection>

      <AccordionSection
        title="Highlight Special Offers on Map"
        icon={Sparkles}
        open={isOpen('specialOffers')}
        onToggle={() => onToggleSection('specialOffers')}
        highlight
        sectionClassName="rounded-[7px] border-[var(--primary)]/50 bg-[linear-gradient(90deg,rgba(217,70,239,0.08)_0%,rgba(244,114,182,0.08)_45%,rgba(249,115,22,0.08)_100%)] shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
        headerClassName="bg-transparent"
        contentClassName="bg-transparent"
      >
        <SpecialOffers
          selected={filterState.specialOffers}
          onToggle={(value) => onUpdate('specialOffers', value, true)}
        />
      </AccordionSection>
    </div>
  )
}
