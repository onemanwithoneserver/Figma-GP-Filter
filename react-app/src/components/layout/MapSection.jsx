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
    <div className="flex h-full flex-col">
      <div className="mb-4 overflow-hidden rounded-[7px] border border-[#322822]/8 shadow-[0_2px_8px_rgba(50,40,34,0.06)] ring-1 ring-[#FFFFFF]/50">
        <PropertyMap properties={properties} height={360} enableClustering={false} />
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-end gap-3">
        <button
          type="button"
          className="rounded-[7px] px-3 py-1.5 text-[11px] font-medium text-[#322822]/60 transition-colors duration-150 hover:text-[#322822]"
        >
          Clear all
        </button>
        <button
          type="button"
          className="rounded-[7px] border border-[#322822]/10 bg-[#FFFFFF] px-4 py-1.5 text-[11px] font-medium text-[#322822] shadow-[0_1px_2px_rgba(50,40,34,0.04)] transition-all duration-150 hover:bg-[#322822]/[0.03]"
        >
          Save search
        </button>
        <button
          type="button"
          className="rounded-[7px] bg-[#E65100] px-5 py-1.5 text-[11px] font-medium text-[#FFFFFF] shadow-[0_1px_4px_rgba(230,81,0,0.2)] transition-all duration-150 hover:bg-[#D84A00] active:scale-[0.97]"
        >
          Show properties
        </button>
      </div>
    </div>
  )
}
