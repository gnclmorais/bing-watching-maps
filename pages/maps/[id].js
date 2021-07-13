import Head from 'next/head'
import dynamic from 'next/dynamic';

import { getAllMapIds, getMapData } from '../../lib/maps'

export default function Map({ mapData }) {
  const MapWithNoSSR = dynamic(() => import('../../components/map'), {
    ssr: false
  });
  const formattedMarkers = mapData.markers.map(({ id, name, place}) => ({
    id,
    position: [place.lat, place.lng],
    description: name,
  }));

  return (
    <>
      <Head>
        <title>{mapData.title}</title>
      </Head>

      <p>
        Map: <strong>{mapData.title}</strong> (<em>{mapData.subtitle}</em>)
        <br />
        {mapData.markers.length} places
      </p>

      <MapWithNoSSR markers={formattedMarkers} />
    </>
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
