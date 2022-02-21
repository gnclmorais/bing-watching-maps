import dynamic from 'next/dynamic';
import { memo, Component, createRef, useState } from 'react';

import PlacesList from '@/components/PlacesList';

export default class MapPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapData: props.mapData,
      formattedMarkers: props.mapData.markers.map(({ id, name, place, address, tagged_pins }) => {
        return {
          id,
          position: [place.lat, place.lng],
          description: name,
          address: place.address,
          tagged_pins,
          ref: createRef(),
        };
      }),
      selectedLabel: null,
    };
  }

  highlight = (id) => this.setState({ highlightedMarker: id });

  render() {
    const MapWithNoSSR = dynamic(() => import('@/components/map'), { ssr: false });
    const MemoizedMap = memo((props) => <MapWithNoSSR {...props} />);

    const setSelectedLabel = (newLabel) => {
      console.log({ newLabel });
      this.setState({ selectedLabel: newLabel })
    };

    // Get child's method that changes its state to pass it on to on of its
    // siblings, preventing re-renders of the parent component:
    let highlightMarkerFn = null;
    let selectLabelFn = null;
    const onPlacesListMount = ({ callbackToHighlightMarker }) => {
      highlightMarkerFn = callbackToHighlightMarker;
    }

    const markersToDisplay = !this.state.selectedLabel
      ? this.state.formattedMarkers
      : this.state.formattedMarkers.filter(marker => {
        return marker.tagged_pins.map(pin => pin.name).includes(this.state.selectedLabel);
      });

    console.log({ markersToDisplay, length: markersToDisplay.length })

    return (
      <>
        <p className="flex-grow-0 flex-shrink">
          Map: <strong>{this.state.mapData.title}</strong> (<em>{this.state.mapData.subtitle}</em>)
          <br />
          {markersToDisplay.length} places
        </p>

        <div className="flex-grow flex flex-row overflow-y-hidden">
          <div className="overflow-y-scroll w-96 md:w-1/3 xl:w-1/4">
            <PlacesList
              markers={markersToDisplay}
              onMount={onPlacesListMount}
              selectedLabel={this.state.selectedLabel}
              setSelectedLabel={setSelectedLabel}
            />
          </div>
          <div className="flex-grow">
            <MemoizedMap
              markers={markersToDisplay}
              setHighlightedMarker={(id) => highlightMarkerFn(id)}
            />
          </div>
        </div>
      </>
    )
  }
}
