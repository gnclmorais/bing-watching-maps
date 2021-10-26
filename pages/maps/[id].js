import Head from 'next/head'
import dynamic from 'next/dynamic';
import { useRef } from 'react';

import { getAllMapIds, getMapData } from '../../lib/maps'

export default function Map({ mapData }) {
  const MapWithNoSSR = dynamic(() => import('../../components/map'), {
    ssr: false
  });
  const formattedMarkers = mapData.markers.map(({ id, name, place}) => ({
    id,
    position: [place.lat, place.lng],
    description: name,
    ref: useRef(),
  }));

  return (
    // TODO: Change inline styles with Tailwind classes
    // TODO: Find the class that makes children not overgrow the parent
    <div className="flex flex-col" style={{ height: '100%' }}>
      <Head>
        <title>{mapData.title}</title>
      </Head>

      <p className="flex-grow-0 flex-shrink">
        Map: <strong>{mapData.title}</strong> (<em>{mapData.subtitle}</em>)
        <br />
        {formattedMarkers.length} places
      </p>

      {/* TODO: Change inline styles with Tailwind classes */}
      <div className="flex-grow-0 flex-shrink flex flex-row" style={{ overflowY: 'clip' }}>
        <div className="overflow-y-scroll">
          <ol>
            {formattedMarkers.map((marker, index) => (
              <li key={marker.id} ref={marker.ref}>{index + 1}. {marker.description}</li>
            ))}
          </ol>
        </div>
        <div className="flex-grow">
          <MapWithNoSSR markers={formattedMarkers} />
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
