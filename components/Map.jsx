import { PureComponent } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility';

import { customIcon } from './MapMarkerIcon';

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const tileLayerUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`;

export default class Map extends PureComponent {
  constructor(props) {
    super(props);

    this.markers = props.markers;
    this.setHighlightedMarker = props.setHighlightedMarker;
  }

  get mapBoundaries() {
    if (!this.markers.length) return;

    return this.markers.map(marker => marker.position);
  }

  render() {
    return (
      <MapContainer
        bounds={this.mapBoundaries}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url={tileLayerUrl}
          attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
        />
        
        {this.markers.map(({ id, position, description }, index) => (
          <Marker
            key={id}
            icon={customIcon({ number: index + 1 })}
            position={position}
            draggable={false}
            animate={true}
            eventHandlers={{
              click: () => this.setHighlightedMarker(id),
            }}
          >
            <Popup>{description}</Popup>
          </Marker>
        ))}

        <ZoomControl position="bottomright" />
      </MapContainer>
    )
  }
}
