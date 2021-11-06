import Head from 'next/head';

import { getAllMapIds, getMapData } from '@/lib/maps';

import MapPage from '@/components/pages/MapPage';

export default function PageForMaps({ mapData }) {
  return (
    <div className="flex flex-col h-full">
      <Head>
        <title>{mapData.title}</title>
      </Head>

      <MapPage mapData={mapData} />
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
