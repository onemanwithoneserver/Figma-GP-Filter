import { Heart, LocateFixed, Search, SlidersHorizontal, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

const TRENDING_SEARCHES = [
  'Rental Offer at Hyderabad - Flats',
  'One Time Payment - Flats',
  'Future City - Plots',
  'Luxury Villas - Outside ORR',
]

const RECENT_SEARCHES = [
  'Kompally flats',
  'Gachibowli Villas',
  'Kukatpally Flats',
  'Suchitra flats',
]

const SAVED_SEARCHES = ['Ready to Move 3BHK near office', 'Flats near suchitra']

const SEARCHABLE_PROJECTS = [
  'Urban Nest Residency - Madhapur',
  'Skyline Heights - Kokapet',
  'Cloud Crest Sky Villas - Financial District',
  'Aero Signature - Narsingi',
  'Olive Garden Villas - Kompally',
  'Prime Grove - Tellapur',
  'Green Avenue Plots - Shadnagar',
  'Eco Harvest Lands - Yacharam',
]

const filterEntries = (entries, query) => {
  if (!query) {
    return entries
  }

  const normalizedQuery = query.trim().toLowerCase()
  return entries.filter((item) => item.toLowerCase().includes(normalizedQuery))
}

function SearchRow({ label, showFavorite = true, showRemove = true }) {
  return (
    <li className="grid grid-cols-[1fr_auto_auto] items-center gap-2 rounded-[5px] px-1.5 py-0.5 text-[10px] leading-4 text-[#2A221C] transition-colors duration-150 hover:bg-[#F7F4F0]">
      <span className="truncate" title={label}>{label}</span>
      {showFavorite ? (
        <button
          type="button"
          aria-label={`Favorite ${label}`}
          className="inline-flex h-4 w-4 items-center justify-center rounded-[5px] text-[#5E5750] transition-all duration-150 hover:bg-white hover:text-[#EE5500]"
        >
          <Heart size={11} fill="currentColor" />
        </button>
      ) : (
        <span />
      )}
      {showRemove ? (
        <button
          type="button"
          aria-label={`Remove ${label}`}
          className="inline-flex h-4 w-4 items-center justify-center rounded-[5px] text-[#5E5750] transition-all duration-150 hover:bg-white hover:text-[#2A221C]"
        >
          <X size={11} />
        </button>
      ) : (
        <span />
      )}
    </li>
  )
}

function SearchGroup({ title, entries, showActions = true }) {
  return (
    <section className="flex flex-col gap-1">
      <h4 className="text-[11px] font-semibold text-[#2A221C]">{title}</h4>
      <ul className="flex flex-col gap-0.5">
        {entries.map((item) => (
          <SearchRow
            key={`${title}-${item}`}
            label={item}
            showFavorite={showActions}
            showRemove={showActions}
          />
        ))}
      </ul>
    </section>
  )
}

export default function FilterSearchPanel({ onOpenFilters, autoFocusInput = false }) {
  const [searchText, setSearchText] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const inputRef = useRef(null)

  const trendingEntries = useMemo(
    () => filterEntries(TRENDING_SEARCHES, searchText),
    [searchText],
  )
  const recentEntries = useMemo(
    () => filterEntries(RECENT_SEARCHES, searchText),
    [searchText],
  )
  const savedEntries = useMemo(
    () => filterEntries(SAVED_SEARCHES, searchText),
    [searchText],
  )
  const matchedResults = useMemo(
    () => filterEntries(SEARCHABLE_PROJECTS, searchText),
    [searchText],
  )

  const hasQuery = Boolean(searchText.trim())
  const showSuggestions = isSearchFocused
  const hasSuggestionData =
    trendingEntries.length > 0 ||
    recentEntries.length > 0 ||
    savedEntries.length > 0 ||
    (hasQuery && matchedResults.length > 0)

  useEffect(() => {
    if (autoFocusInput) {
      inputRef.current?.focus()
    }
  }, [autoFocusInput])

  return (
    <div className="relative flex flex-col gap-2">
      <div className="flex min-h-14 items-center gap-2 rounded-[5px] border border-[#2A221C]/10 bg-[#F7F4F0] px-2 shadow-[0_1px_2px_rgba(42,34,28,0.06)]">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[5px] bg-[#FFF2E7] text-[#EE5500]">
          <LocateFixed size={14} />
        </span>

        <input
          ref={inputRef}
          type="text"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => {
            // Delay blur updates so suggestion row buttons remain clickable.
            window.setTimeout(() => setIsSearchFocused(false), 120)
          }}
          placeholder="Search places, projects..."
          aria-label="Search places and projects"
          className="h-full min-w-0 flex-1 border-0 bg-transparent text-[12px] font-medium text-[#2A221C] placeholder:text-[#A89F95] focus:outline-none"
        />

        {!isSearchFocused && (
          <button
            type="button"
            onClick={() => {
              setIsSearchFocused(false)
              onOpenFilters?.()
            }}
            aria-label="Open search filters"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[5px] border border-[#2A221C]/10 bg-[#F7F4F0] text-[#5E5750] transition-all duration-150 hover:border-[#EE5500]/20 hover:bg-[#FFF2E7] hover:text-[#EE5500]"
          >
            <SlidersHorizontal size={14} />
          </button>
        )}

        <button
          type="button"
          aria-label="Run search"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[5px] border border-[#2A221C]/10 bg-[#F7F4F0] text-[#5E5750] transition-all duration-150 hover:border-[#EE5500]/20 hover:bg-[#FFF2E7] hover:text-[#EE5500]"
        >
          <Search size={14} />
        </button>
      </div>

      {showSuggestions && (
        <div className="absolute top-full right-0 left-0 z-40 mt-2 flex max-h-[320px] flex-col gap-3 overflow-auto rounded-[5px] border border-[#2A221C]/8 bg-white p-2.5 shadow-[0_6px_16px_rgba(42,34,28,0.12)]">
          {hasQuery && matchedResults.length > 0 && (
            <SearchGroup title="Search results" entries={matchedResults.slice(0, 5)} />
          )}

          {trendingEntries.length > 0 && <SearchGroup title="Trending" entries={trendingEntries} />}
          {recentEntries.length > 0 && <SearchGroup title="Recent" entries={recentEntries} />}
          {savedEntries.length > 0 && (
            <SearchGroup title="Saved" entries={savedEntries} showActions={false} />
          )}

          {!hasSuggestionData && (
            <p className="rounded-[5px] bg-[#F7F4F0] px-2 py-1.5 text-[10px] font-medium text-[#5E5750]">
              No matching suggestions.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
