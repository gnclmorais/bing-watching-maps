import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility';

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const tileLayerUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`;

const Map = ({ markers = [] }) => {
  return (
    <MapContainer
      center={[40.8054, -74.0241]}
      zoom={14}
      scrollWheelZoom={false}
      style={{ height: '100%' }}
    >
      <TileLayer
        url={tileLayerUrl}
        attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
      />
      
      {markers.map(({ id, position, description }) => (
        <Marker key={id} position={position} draggable={false} animate={true}>
          <Popup>{description}</Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default Map
