import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import Icon from './Icon';
import {Destination} from '../constants/listings';
import {scale} from '../styles/responsiveSize';
import styles from './styles';

const tones = {
  green: {background: '#eef6e8', stroke: '#5c9e35'},
  red: {background: '#f8eeec', stroke: '#b4574c'},
  forest: {background: '#e9f3eb', stroke: '#2e7a45'},
};

export default function DestinationIcon({item}: {item: Destination}) {
  if (!item.tone) {
    return (
      <View style={[styles.destinationIcon, styles.nearbyIcon]}>
        <Icon
          name="nearby"
          size={scale(26)}
          color="#4d7cb8"
          strokeWidth={1.6}
        />
      </View>
    );
  }
  const tone = tones[item.tone];
  const palm = item.tone === 'red';
  return (
    <View style={[styles.destinationIcon, {backgroundColor: tone.background}]}>
      <Svg width={scale(40)} height={scale(40)} viewBox="0 0 40 40">
        <Path
          d="M6 26V14h7v12M13 26V10h7v16M8.5 17h2M8.5 21h2M15.5 13.5h2M15.5 17.5h2M15.5 21.5h2"
          stroke={tone.stroke}
          strokeWidth={1.5}
          fill="none"
          strokeLinejoin="round"
        />
        <Path
          d={
            palm
              ? 'M28 26V15M28 15c-2-2.5-5-2.6-6.5-1.4M28 15c2-2.6 5-2.7 6.6-1.3M28 15c-.6-2.8 1-4.6 3-5M28 15c-1.6-2-1.4-4.2.2-5.2'
              : 'M27 26v-5M27 21l-3.5 0 3.5-5.5-2.5 0 2.5-4.5 2.5 4.5-2.5 0 3.5 5.5zM33 26v-4M33 22h-2.4l2.4-4 2.4 4z'
          }
          stroke={tone.stroke}
          strokeWidth={1.5}
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <Path
          d="M4 29.5c2.5-1.4 4.5 1.4 7 0s4.5 1.4 7 0 4.5 1.4 7 0 4.5 1.4 7 0 3 .8 4 .4M4 33.5c2.5-1.4 4.5 1.4 7 0s4.5 1.4 7 0 4.5 1.4 7 0 4.5 1.4 7 0 3 .8 4 .4"
          stroke={tone.stroke}
          strokeWidth={1.4}
          fill="none"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}
