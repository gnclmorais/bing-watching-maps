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

    refs[highlightedMarker].current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [highlightedMarker]);

  return (
    <ol>
      {markers.map((marker, index) => {
        return (
          <li
            key={marker.id}
            ref={refs[marker.id]}
            className={`
              px-4 pt-2 pb-3
              ${index % 2 ? 'bg-gray-50' : ''}
              ${marker.id === highlightedMarker ? styles.focus : ''}
            `}
          >
            <p>{index + 1}. {marker.description}</p>
            <p>
              {marker.tagged_pins.map(({ id, name }) => {
                return (
                  <small key={id} className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-gray-600 bg-gray-200 hover:bg-gray-300 last:mr-0 mr-1 cursor-pointer transition-colors">{name}</small>
                );
              })}
            </p>
          </li>
        );
      })}
    </ol>
  )
};
