import Head from 'next/head';
import dynamic from 'next/dynamic';
import { memo, Component, forwardRef, createRef } from 'react';

import { getAllMapIds, getMapData } from '@/lib/maps';

import PlacesList from '@/components/PlacesList';

export default class MapPage extends Component {
  constructor(props) {
    super(props);

    this.mapData = props.mapData;
    this.state = {
      highlightedMarker: null,
    }
  }

  render() {
    const MapWithNoSSR = memo(dynamic(() => import('@/components/map'), { ssr: false }));
    const highlight = ({ id }) => this.setState({ highlightedMarker: id });

    const mapData = this.mapData;
    const refs = {}
    const formattedMarkers = this.mapData.markers.map(({ id, name, place }) => {
      refs[id] = createRef();

      return {
        id,
        position: [place.lat, place.lng],
        description: name,
      };
    });

    const ForwardedPlacesList = forwardRef((props, refs) => (
      <PlacesList
        ref={refs}
        markers={props.markers}
        highlightedMarker={props.highlightedMarker}
      />
    ));

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
            <ForwardedPlacesList
              ref={refs}
              markers={formattedMarkers}
              highlightedMarker={this.state.highlightedMarker}
            />
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
