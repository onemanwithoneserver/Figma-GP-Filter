import AccordionSection from '../common/AccordionSection'
import BudgetFilter from '../common/BudgetFilter'
import RadiusSlider from '../common/RadiusSlider'
import { BUDGET_OPTIONS } from '../common/filterOptions'
import ConfigurationFilter from './ConfigurationFilter'
import ProjectStatusFilter from './ProjectStatusFilter'
import ProjectTypeFilter from './ProjectTypeFilter'
import SpecialOffers from './SpecialOffers'

export default function VillasFilters({ filterState, onUpdate, openSections, onToggleSection }) {
  const isOpen = (id) => openSections.includes(id)

  return (
    <div>
      <AccordionSection title="Radius" open={isOpen('radius')} onToggle={() => onToggleSection('radius')}>
        <RadiusSlider value={filterState.radius} onChange={(value) => onUpdate('radius', value)} />
      </AccordionSection>

      <AccordionSection
        title="Unit Size & Area"
        open={isOpen('unitSize')}
        onToggle={() => onToggleSection('unitSize')}
      >
        <ConfigurationFilter
          selected={filterState.unitSizes}
          onToggle={(value) => onUpdate('unitSizes', value, true)}
        />
      </AccordionSection>

      <AccordionSection title="Budget" open={isOpen('budget')} onToggle={() => onToggleSection('budget')}>
        <BudgetFilter
          mode={filterState.budgetMode}
          min={filterState.budgetMin}
          max={filterState.budgetMax}
          onModeChange={(value) => onUpdate('budgetMode', value)}
          onMinChange={(value) => onUpdate('budgetMin', value)}
          onMaxChange={(value) => onUpdate('budgetMax', value)}
          options={BUDGET_OPTIONS}
        />
      </AccordionSection>

      <AccordionSection
        title="Project Type"
        open={isOpen('projectType')}
        onToggle={() => onToggleSection('projectType')}
      >
        <ProjectTypeFilter
          selected={filterState.projectTypes}
          onToggle={(value) => onUpdate('projectTypes', value, true)}
        />
      </AccordionSection>

      <AccordionSection
        title="Project Status & Age"
        open={isOpen('projectStatus')}
        onToggle={() => onToggleSection('projectStatus')}
      >
        <ProjectStatusFilter
          selected={filterState.projectStatuses}
          onToggle={(value) => onUpdate('projectStatuses', value, true)}
        />
      </AccordionSection>

      <AccordionSection
        title="Highlight Special Offers on Map"
        open={isOpen('specialOffers')}
        onToggle={() => onToggleSection('specialOffers')}
        highlight
      >
        <SpecialOffers
          selected={filterState.specialOffers}
          onToggle={(value) => onUpdate('specialOffers', value, true)}
        />
      </AccordionSection>
    </div>
  )
}
