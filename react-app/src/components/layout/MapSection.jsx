import PropertyMap from '../Map/PropertyMap'

export default function MapSection({ results }) {
  const totalCount = results.length || 188
  const offsets = [
    [0, 0],
    [0.0014, 0.0011],
    [-0.0011, 0.0015],
    [0.0012, -0.0013],
    [-0.0014, -0.0011],
    [0.0009, 0.0019],
    [-0.0019, 0.0008],
    [0.0018, -0.0007],
  ]

  const hotspotCenters = [
    { name: 'Hitech City', lat: 17.4435, lng: 78.3772 },
    { name: 'Madhapur', lat: 17.4483, lng: 78.3915 },
    { name: 'Whitefields', lat: 17.4935, lng: 78.3742 },
    { name: 'Gachibowli', lat: 17.4399, lng: 78.3489 },
    { name: 'Kondapur', lat: 17.4651, lng: 78.3605 },
    { name: 'Kukatpally', lat: 17.4948, lng: 78.4138 },
    { name: 'Jubilee Hills', lat: 17.4317, lng: 78.4087 },
    { name: 'Kokapet', lat: 17.3895, lng: 78.3411 },
  ]

  const baseItems = results.length
    ? results
    : [
        {
          id: 'fallback',
          propertyType: 'Property',
          name: 'Hyderabad Property',
          location: 'Hyderabad',
          priceRange: 'Price on request',
          highlights: ['Prime area'],
        },
      ]

  const properties = hotspotCenters.flatMap((spot, spotIndex) =>
    offsets.map(([latOffset, lngOffset], offsetIndex) => {
      const source = baseItems[(spotIndex + offsetIndex) % baseItems.length]

      return {
        id: `${source.id}-${spotIndex}-${offsetIndex}`,
        lat: spot.lat + latOffset,
        lng: spot.lng + lngOffset,
        type: source.propertyType,
        name: source.name,
        location: spot.name,
        priceRange: source.priceRange,
        highlights: source.highlights,
      }
    }),
  )

  return (
    <div className="flex h-full flex-col rounded-[7px] border border-[var(--dark)]/15 bg-[var(--white)] p-3">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm font-semibold text-[var(--dark)]">Map View</div>
        <div className="text-xs text-[var(--dark)]/70">Drag & zoom enabled</div>
      </div>

      <div className="mb-3 flex-1">
        <PropertyMap properties={properties} height={360} enableClustering={false} />
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-end gap-2">
        <button
          type="button"
          className="rounded-[7px] border border-[var(--dark)]/25 px-2.5 py-2 text-sm font-semibold text-[var(--dark)] sm:px-3"
        >
          Clear All
        </button>
        <button
          type="button"
          className="rounded-[7px] border border-[var(--dark)]/30 bg-[var(--white)] px-2.5 py-2 text-sm font-semibold text-[var(--dark)] sm:px-3"
        >
          Save Search
        </button>
        <button
          type="button"
          className="rounded-[7px] bg-[var(--primary)] px-3 py-2 text-sm font-semibold text-[var(--white)] sm:px-4"
        >
          Show Properties
        </button>
      </div>
    </div>
  )
}
