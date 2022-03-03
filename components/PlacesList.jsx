import { useEffect, useRef, useState } from 'react';

import { FaTimes } from 'react-icons/fa';

import styles from './PlacesList.module.css';

export default function PlacesList({ markers, onMount, selectedLabel, setSelectedLabel }) {
  const [highlightedMarker, setHighlightedMarker] = useState();

  const markersToDisplay = selectedLabel
    ? markers.filter(({ tagged_pins }) => {
      const tags = tagged_pins.map(pin => pin.name)

      return tags.includes(selectedLabel);
    })
    : markers;

  const resetLabel = () => setSelectedLabel();

  useEffect(() => {
    onMount({ callbackToHighlightMarker: setHighlightedMarker });
  }, []);
  useEffect(() => {
    if (!highlightedMarker) return;

    highlightedMarker.ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [highlightedMarker]);

  return (
    <div>
      {selectedLabel && 
        <div className="flex">
          <p className="flex-grow">Filtered by <strong>{selectedLabel}</strong></p>
          <button className="flex items-center" onClick={resetLabel}>
            <FaTimes /> Clear filter
          </button>
        </div>
      }
      <ol>
        {markersToDisplay.map((marker, index) => {
          return (
            <li
              key={marker.id}
              ref={marker.ref}
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
                    <button
                      key={id}
                      className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-gray-600 bg-gray-200 hover:bg-gray-300 last:mr-0 mr-1 cursor-pointer transition-colors ${name === selectedLabel ? 'bg-gray-300 text-gray-900' : ''}`}
                      onClick={()=> setSelectedLabel(name)}
                    >
                      {name}
                    </button>
                  );
                })}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  )
};
