import Head from 'next/head'
import Link from 'next/link'

import { getAllMapIds, getMapData } from '../../lib/maps'

export default function Map({ mapData }) {
  return (
    <>
      <Head>
        <title>{mapData.title}</title>
      </Head>

      Map: <strong>{mapData.title}</strong> (<em>{mapData.subtitle}</em>)
      <br />
      {mapData.markers.length} markers
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
