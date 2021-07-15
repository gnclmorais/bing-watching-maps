import L from 'leaflet';

import styles from './MapMarkerIcon.module.css';

console.log({ styles })

const customIcon = ({ number }) => new L.divIcon({
  className: '',
  iconAnchor: [12, 25],
  labelAnchor: [-6, 0],
  popupAnchor: [0, -15],
  iconSize: [25, 41],
  // html: `<span class="fa fa-industry">${number}</span>`,
  // https://css-tricks.com/adding-shadows-to-svg-icons-with-css-and-svg-filters/
  html: `<div class="${styles.marker}">
    <span class="${styles.marker__text}">${number}</span>
  </div>`,
});

export { customIcon };
