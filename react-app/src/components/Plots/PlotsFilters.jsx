import { BadgeCheck, Building2, IndianRupee, LandPlot, ListFilter, MapPin, Sparkles } from 'lucide-react'
import AccordionSection from '../common/AccordionSection'
import BudgetFilter from '../common/BudgetFilter'
import RadiusSlider from '../common/RadiusSlider'
import { PLOTS_OVERALL_OPTIONS, PLOTS_PER_SQYD_OPTIONS } from '../common/filterOptions'
import ApprovalsFilter from './ApprovalsFilter'
import FinalLayoutPermissionFilter from './FinalLayoutPermissionFilter'
import PlotSizeFilter from './PlotSizeFilter'
import PlotTypeSaleFilter from './PlotTypeSaleFilter'
import ProjectTypeFilter from './ProjectTypeFilter'
import SpecialityProjects from './SpecialityProjects'

export default function PlotsFilters({ filterState, onUpdate, openSections, onToggleSection }) {
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
        title="Plot Size & Area"
        icon={LandPlot}
        open={isOpen('plotSize')}
        onToggle={() => onToggleSection('plotSize')}
        sectionClassName={premiumSectionClass}
        headerClassName={premiumHeaderClass}
        contentClassName={premiumContentClass}
      >
        <PlotSizeFilter
          plotMin={filterState.plotsPlotMin}
          plotMax={filterState.plotsPlotMax}
          onPlotMinChange={(value) => onUpdate('plotsPlotMin', value)}
          onPlotMaxChange={(value) => onUpdate('plotsPlotMax', value)}
          orrDistance={filterState.orrDistance}
          onOrrDistanceChange={(value) => onUpdate('orrDistance', value)}
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
          perLabel="Per Sq.Yd"
          overallLabel="Overall"
          perOptions={PLOTS_PER_SQYD_OPTIONS}
          overallOptions={PLOTS_OVERALL_OPTIONS}
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
        title="Approvals & Permissions"
        icon={BadgeCheck}
        open={isOpen('approvals') || isOpen('finalPermission')}
        onToggle={() => onToggleSection('approvals')}
        sectionClassName={premiumSectionClass}
        headerClassName={premiumHeaderClass}
        contentClassName={premiumContentClass}
      >
        <div className="grid gap-3 lg:grid-cols-2">
          <ApprovalsFilter
            selected={filterState.approvals}
            onToggle={(value) => onUpdate('approvals', value, true)}
          />
          <FinalLayoutPermissionFilter
            selected={filterState.finalPermissions}
            onToggle={(value) => onUpdate('finalPermissions', value, true)}
          />
        </div>
      </AccordionSection>

      <AccordionSection
        title="Plot Type & Sale"
        icon={ListFilter}
        open={isOpen('plotType')}
        onToggle={() => onToggleSection('plotType')}
        sectionClassName={premiumSectionClass}
        headerClassName={premiumHeaderClass}
        contentClassName={premiumContentClass}
      >
        <PlotTypeSaleFilter
          selectedType={filterState.plotTypes}
          selectedSaleType={filterState.saleTypes}
          onToggleType={(value) => onUpdate('plotTypes', value, true)}
          onToggleSaleType={(value) => onUpdate('saleTypes', value, true)}
        />
      </AccordionSection>

      <AccordionSection
        title="Highlight Speciality Projects on Map"
        icon={Sparkles}
        open={isOpen('speciality')}
        onToggle={() => onToggleSection('speciality')}
        highlight
        sectionClassName={premiumSectionClass}
        headerClassName="bg-[var(--white)]"
        contentClassName="bg-[var(--bg)]/25"
      >
        <SpecialityProjects
          selected={filterState.specialityProjects}
          onToggle={(value) => onUpdate('specialityProjects', value, true)}
        />
      </AccordionSection>
    </div>
  )
}
