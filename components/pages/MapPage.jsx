import dynamic from 'next/dynamic';
import { memo, Component, createRef, useState } from 'react';

import PlacesList from '@/components/PlacesList';

const TABS = {
  LIST: 'list',
  MAP: 'map',
}

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
      selectedTab: TABS.LIST,
    };
  }

  // Setters
  selectTab = (newTab) => this.setState({ selectedTab: newTab })

  // Getters
  isMapSelected = () => this.state.selectedTab === TABS.MAP
  styleButton = (buttonTab) => {
    const common = 'px-4 py-2 font-semibold text-sm text-white shadow-sm rounded-lg flex-grow';
    if (buttonTab === this.state.selectedTab) {
      return `${common} bg-purple-500`;
    } else {
      return `${common} bg-gray-300`;
    }
  }
  styleList = () => {
    if (this.isMapSelected()) {
      return 'overflow-y-scroll w-full xs:w-full sm:w-full md:w-1/3 xl:w-1/4 md:block hidden';
    } else {
      return 'overflow-y-scroll w-full xs:w-full sm:w-full md:w-1/3 xl:w-1/4 md:block';
    }
  }
  styleMap = () => {
    if (this.isMapSelected()) {
      return `flex-grow md:block`;
    } else {
      return `flex-grow md:block hidden`;
    }
  }

  render() {
    const MapWithNoSSR = dynamic(() => import('@/components/Map'), { ssr: false });
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

        <div className="md:hidden flex">
          <button type="button" className={this.styleButton(TABS.LIST)} onClick={() => this.selectTab(TABS.LIST)}>
            List
          </button>
          <button type="button" className={this.styleButton(TABS.MAP)}  onClick={() => this.selectTab(TABS.MAP)}>
            Map
          </button>
        </div>

        <div className="flex-grow flex flex-row overflow-y-hidden">
          <div className={this.styleList()}>
            <PlacesList
              markers={markersToDisplay}
              onMount={onPlacesListMount}
              selectedLabel={this.state.selectedLabel}
              setSelectedLabel={setSelectedLabel}
            />
          </div>
          <div className={this.styleMap()}>
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
