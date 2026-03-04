import AccordionSection from '../common/AccordionSection'
import BudgetFilter from '../common/BudgetFilter'
import RadiusSlider from '../common/RadiusSlider'
import { BUDGET_OPTIONS } from '../common/filterOptions'
import ApprovalsFilter from './ApprovalsFilter'
import FinalLayoutPermissionFilter from './FinalLayoutPermissionFilter'
import PlotSizeFilter from './PlotSizeFilter'
import PlotTypeSaleFilter from './PlotTypeSaleFilter'
import ProjectTypeFilter from './ProjectTypeFilter'
import SpecialityProjects from './SpecialityProjects'

export default function PlotsFilters({ filterState, onUpdate, openSections, onToggleSection }) {
  const isOpen = (id) => openSections.includes(id)

  return (
    <div>
      <AccordionSection title="Radius" open={isOpen('radius')} onToggle={() => onToggleSection('radius')}>
        <RadiusSlider value={filterState.radius} onChange={(value) => onUpdate('radius', value)} />
      </AccordionSection>

      <AccordionSection
        title="Plot Size & Area"
        open={isOpen('plotSize')}
        onToggle={() => onToggleSection('plotSize')}
      >
        <PlotSizeFilter
          selected={filterState.plotSizes}
          onToggle={(value) => onUpdate('plotSizes', value, true)}
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
          perLabel="Per Sq.Yd"
          overallLabel="Overall"
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

      <AccordionSection title="Approvals" open={isOpen('approvals')} onToggle={() => onToggleSection('approvals')}>
        <ApprovalsFilter
          selected={filterState.approvals}
          onToggle={(value) => onUpdate('approvals', value, true)}
        />
      </AccordionSection>

      <AccordionSection
        title="Final Layout Permission"
        open={isOpen('finalPermission')}
        onToggle={() => onToggleSection('finalPermission')}
      >
        <FinalLayoutPermissionFilter
          selected={filterState.finalPermissions}
          onToggle={(value) => onUpdate('finalPermissions', value, true)}
        />
      </AccordionSection>

      <AccordionSection title="Plot Type / Sale Type" open={isOpen('plotType')} onToggle={() => onToggleSection('plotType')}>
        <PlotTypeSaleFilter
          selectedType={filterState.plotTypes}
          selectedSaleType={filterState.saleTypes}
          onToggleType={(value) => onUpdate('plotTypes', value, true)}
          onToggleSaleType={(value) => onUpdate('saleTypes', value, true)}
        />
      </AccordionSection>

      <AccordionSection
        title="Speciality Projects"
        open={isOpen('speciality')}
        onToggle={() => onToggleSection('speciality')}
        highlight
      >
        <SpecialityProjects
          selected={filterState.specialityProjects}
          onToggle={(value) => onUpdate('specialityProjects', value, true)}
        />
      </AccordionSection>
    </div>
  )
}
