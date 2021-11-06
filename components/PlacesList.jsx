import { useEffect, useRef, useState } from 'react';

import styles from './PlacesList.module.css';

export default function PlacesList({ markers, onMount }) {
  const [highlightedMarker, setHighlightedMarker] = useState();
  const refs = Object.fromEntries(markers.map(marker => [marker.id, useRef()]));

  useEffect(() => {
    onMount([setHighlightedMarker]);
  }, []);
  useEffect(() => {
    if (!refs[highlightedMarker]) return;

    refs[highlightedMarker].current.scrollIntoView({ behavior: 'smooth' });
  }, [highlightedMarker]);

  return (
    <ol>
      {markers.map((marker, index) => {
        return (
          <li
            key={marker.id}
            ref={refs[marker.id]}
            className={marker.id === highlightedMarker ? styles.focus : ""}
          >
            {index + 1}. {marker.description}
          </li>
        );
      })}
    </ol>
  )
};
