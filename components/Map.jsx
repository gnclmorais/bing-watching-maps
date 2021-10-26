import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility';

import { customIcon } from './MapMarkerIcon';

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const tileLayerUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`;

const Map = ({ markers = [] }) => {
  const [focusedMarkerRef, setFocusedMarkerRef] = useState(null);
  useEffect(() => {
    if (!focusedMarkerRef) return;

    focusedMarkerRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [focusedMarkerRef]);

  return (
    <MapContainer
      center={[40.8054, -74.0241]}
      zoom={14}
      scrollWheelZoom={false}
      style={{ height: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        url={tileLayerUrl}
        attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
      />
      
      {markers.map(({ id, position, description, ref }, index) => (
        <Marker
          key={id}
          icon={customIcon({ number: index + 1 })}
          position={position}
          draggable={false}
          animate={true}
          eventHandlers={{
            click: () => setFocusedMarkerRef(ref),
          }}
        >
          <Popup>{description}</Popup>
        </Marker>
      ))}

      <ZoomControl position="bottomright" />
    </MapContainer>
  )
}

export default Map
