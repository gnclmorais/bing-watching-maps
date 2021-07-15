import L from 'leaflet';

const customIcon = ({ number }) => new L.divIcon({
  className: '',
  iconAnchor: [12, 25],
  labelAnchor: [-6, 0],
  popupAnchor: [0, -15],
  iconSize: [25, 41],
  html: `<span class="fa fa-industry">${number}</span>`
});

export { customIcon };
