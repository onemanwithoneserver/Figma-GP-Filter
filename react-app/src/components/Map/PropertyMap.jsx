import { memo, useMemo } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import 'leaflet/dist/leaflet.css'
import 'react-leaflet-cluster/dist/assets/MarkerCluster.css'
import 'react-leaflet-cluster/dist/assets/MarkerCluster.Default.css'

const HYDERABAD_CENTER = [17.4435, 78.3772]

const HOME_MARKER_ICON = L.divIcon({
  className: 'bg-transparent border-none',
  html: `
    <div style="
      width: 26px;
      height: 26px;
      border-radius: 5px;
      background: #D94F00;
      border: 2px solid #FFFFFF;
      box-shadow: 0 0 0 4px rgba(217,79,0,0.10), 0 4px 12px rgba(217,79,0,0.18);
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
      transition: all 0.2s ease;
    ">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M3 10.5L12 3L21 10.5V21H14V14H10V21H3V10.5Z" fill="#FFFFFF"/>
      </svg>
    </div>
  `,
  iconSize: [26, 26],
  iconAnchor: [13, 13],
})

const createClusterIcon = (cluster) => {
  const count = cluster.getChildCount()

  return L.divIcon({
    html: `
      <div style="
        width: 38px;
        height: 38px;
        border-radius: 7px;
        background: #D94F00;
        color: #FFFFFF;
        border: 2px solid #FFFFFF;
        box-shadow: 0 0 0 5px rgba(217,79,0,0.08), 0 6px 16px rgba(217,79,0,0.18);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 500;
      ">${count}</div>
    `,
    className: 'bg-transparent border-none',
    iconSize: [38, 38],
    iconAnchor: [19, 19],
  })
}

function PropertyMapBase({ properties = [], height = 430, enableClustering = true }) {
  const normalizedProperties = useMemo(
    () =>
      properties
        .filter((property) => Number.isFinite(property.lat) && Number.isFinite(property.lng))
        .map((property) => ({
          id: property.id,
          type: property.type || 'Property',
          name: property.name || 'Property',
          location: property.location || 'Hyderabad',
          priceRange: property.priceRange || 'Price on request',
          highlights: property.highlights || [],
          lat: property.lat,
          lng: property.lng,
        })),
    [properties],
  )

  const center = useMemo(() => {
    if (!normalizedProperties.length) {
      return HYDERABAD_CENTER
    }

    const first = normalizedProperties[0]
    return [first.lat, first.lng]
  }, [normalizedProperties])

  const markerElements = useMemo(
    () =>
      normalizedProperties.map((property) => (
        <Marker key={property.id} position={[property.lat, property.lng]} icon={HOME_MARKER_ICON}>
          <Popup>
            <div className="flex min-w-[200px] flex-col gap-1.5 p-1 font-sans">
              <div className="text-[15px] font-medium leading-tight text-[#2A2118]">
                {property.name}
              </div>
              <div className="text-[13px] text-[#2A2118]/55">
                {property.location}
              </div>
              <div className="mt-1 text-[14px] font-medium text-[#2A2118]">
                {property.priceRange}
              </div>
              {property.highlights && property.highlights.length > 0 && (
                <div className="mt-2 text-[12px] text-[#2A2118]/35">
                  {property.highlights.join(' • ')}
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      )),
    [normalizedProperties],
  )

  return (
    <div className="overflow-hidden rounded-[7px] border border-[#2A2118]/8 bg-[#EFEBE4]/30 shadow-[0_4px_16px_-4px_rgba(42,33,24,0.10)] ring-1 ring-[#FFFFFF]/50">
      <MapContainer
        center={center}
        zoom={12}
        minZoom={9}
        scrollWheelZoom
        preferCanvas
        style={{ height: `${height}px`, width: '100%', background: '#EFEBE4' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="opacity-90 saturate-[0.85] sepia-[0.1]"
        />

        {enableClustering ? (
          <MarkerClusterGroup
            chunkedLoading
            spiderfyOnMaxZoom
            showCoverageOnHover={false}
            removeOutsideVisibleBounds
            animate
            maxClusterRadius={44}
            iconCreateFunction={createClusterIcon}
          >
            {markerElements}
          </MarkerClusterGroup>
        ) : (
          markerElements
        )}
      </MapContainer>
    </div>
  )
}

const areEqual = (prevProps, nextProps) => {
  if (prevProps.height !== nextProps.height) {
    return false
  }

  if (prevProps.enableClustering !== nextProps.enableClustering) {
    return false
  }

  const prev = prevProps.properties || []
  const next = nextProps.properties || []

  if (prev.length !== next.length) {
    return false
  }

  for (let index = 0; index < prev.length; index += 1) {
    const previous = prev[index]
    const upcoming = next[index]
    if (
      previous.id !== upcoming.id ||
      previous.lat !== upcoming.lat ||
      previous.lng !== upcoming.lng ||
      previous.type !== upcoming.type
    ) {
      return false
    }
  }

  return true
}

const PropertyMap = memo(PropertyMapBase, areEqual)

export default PropertyMap
