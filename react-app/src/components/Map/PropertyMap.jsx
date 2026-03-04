import { memo, useMemo } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import 'leaflet/dist/leaflet.css'
import 'react-leaflet-cluster/dist/assets/MarkerCluster.css'
import 'react-leaflet-cluster/dist/assets/MarkerCluster.Default.css'

const HYDERABAD_CENTER = [17.4435, 78.3772]

const HOME_MARKER_ICON = L.divIcon({
  className: 'property-home-marker',
  html: `
    <div style="
      width: 22px;
      height: 22px;
      border-radius: 9999px;
      background: #8A5A2B;
      border: 2px solid rgba(255,255,255,0.8);
      box-shadow: 0 0 0 5px rgba(138,90,43,0.2), 0 6px 14px rgba(0,0,0,0.18);
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
    ">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M3 10.5L12 3L21 10.5V21H14V14H10V21H3V10.5Z" fill="#FFFFFF"/>
      </svg>
    </div>
  `,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
})

const createClusterIcon = (cluster) => {
  const count = cluster.getChildCount()

  return L.divIcon({
    html: `
      <div style="
        width: 34px;
        height: 34px;
        border-radius: 9999px;
        background: #8A5A2B;
        color: #ffffff;
        border: 2px solid rgba(255,255,255,0.85);
        box-shadow: 0 0 0 8px rgba(138,90,43,0.2), 0 6px 14px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: 700;
      ">${count}</div>
    `,
    className: 'property-cluster-marker',
    iconSize: [34, 34],
    iconAnchor: [17, 17],
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
            <div className="min-w-[180px] text-[12px]">
              <div className="font-semibold">{property.name}</div>
              <div>{property.location}</div>
              <div className="text-[var(--primary)]">{property.priceRange}</div>
              <div>{property.highlights.join(' • ')}</div>
            </div>
          </Popup>
        </Marker>
      )),
    [normalizedProperties],
  )

  return (
    <div className="overflow-hidden rounded-[5px] border border-[var(--dark)]/10">
      <MapContainer
        center={center}
        zoom={12}
        minZoom={9}
        scrollWheelZoom
        preferCanvas
        style={{ height: `${height}px`, width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
