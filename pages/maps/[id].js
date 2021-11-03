import Head from 'next/head'
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

import { getAllMapIds, getMapData } from '@/lib/maps'
import styles from '../../styles/Map.module.css'

export default function Map({ mapData }) {
  const MapWithNoSSR = dynamic(() => import('@/components/map'), { ssr: false });
  const formattedMarkers = mapData.markers.map(({ id, name, place}) => ({
    id,
    position: [place.lat, place.lng],
    description: name,
    ref: useRef(),
  }));
  
  const [highlightedMarker, setHighlightedMarker] = useState();
  const [focusedMarkerRef, setFocusedMarkerRef] = useState();
  useEffect(() => {
    if (!focusedMarkerRef) return;

    focusedMarkerRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [focusedMarkerRef]);
  const highlight = ({ id, ref }) => {
    setHighlightedMarker(id);
    setFocusedMarkerRef(ref);
  };

  return (
    <div className="flex flex-col h-full">
      <Head>
        <title>{mapData.title}</title>
      </Head>

      <p className="flex-grow-0 flex-shrink">
        Map: <strong>{mapData.title}</strong> (<em>{mapData.subtitle}</em>)
        <br />
        {formattedMarkers.length} places
      </p>

      <div className="flex-grow-0 flex-shrink flex flex-row overflow-y-hidden">
        <div className="overflow-y-scroll">
          <ol>
            {formattedMarkers.map((marker, index) => (
              <li
                key={marker.id}
                ref={marker.ref}
                className={marker.id === highlightedMarker ? styles.focus : ""}
              >
                {console.log(marker === highlightedMarker)}
                {index + 1}. {marker.description}
              </li>
            ))}
          </ol>
        </div>
        <div className="flex-grow">
          <MapWithNoSSR
            markers={formattedMarkers}
            setHighlightedMarker={highlight}
          />
        </div>
      </div>
    </div>
  )
}

// Return a list of possible value for id
export async function getStaticPaths() {
  const paths = getAllMapIds()

  return {
    paths,
    fallback: false
  }
}

// Fetch necessary data for the map using params.id
export async function getStaticProps({ params }) {
  const mapData = getMapData(params.id)

  return {
    props: {
      mapData
    }
  }
}
