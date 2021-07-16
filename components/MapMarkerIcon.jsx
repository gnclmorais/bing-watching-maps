import L from 'leaflet';

import styles from './MapMarkerIcon.module.css';

const pinSize = 30;
const hypotenuse = Math.sqrt(Math.pow(pinSize, 2) * 2);
const deviationFix = -5;
const customIcon = ({ number }) => new L.divIcon({
  className: '',
  iconSize: [pinSize, pinSize], // size of the icon
  iconAnchor: [0, pinSize], // icon point which will correspond to marker's location
  popupAnchor: [deviationFix, -hypotenuse], // popup point relative to the iconAnchor
  html: `<div class="${styles.marker}">
    <span class="${styles.marker__text}">${number}</span>
  </div>`,
});

export { customIcon };
