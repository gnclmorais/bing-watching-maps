import { forwardRef, useEffect } from 'react';

import styles from './PlacesList.module.css';

export default forwardRef(function PlacesList({ markers, highlightedMarker }, refs) {
  useEffect(() => {
    const focusedMarkerRef = refs[highlightedMarker];

    if (!focusedMarkerRef) return;

    focusedMarkerRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [highlightedMarker]);

  return (
    <ol>
      {markers.map((marker, index) => (
        <li
          key={marker.id}
          ref={refs[marker.id]}
          className={marker.id === highlightedMarker ? styles.focus : ""}
        >
          {index + 1}. {marker.description}
        </li>
      ))}
    </ol>
  )
});
