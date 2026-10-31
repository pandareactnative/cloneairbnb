import React, {useRef} from 'react';
import {Animated, PanResponder, View} from 'react-native';
import Svg, {G, Path, Text as SvgText} from 'react-native-svg';
import {clamp} from '../constants/gestures';
import colors from '../styles/colors';
import {height, width} from '../styles/responsiveSize';
import styles from './styles';

const mapWidth = width * 1.6;
const mapHeight = height * 0.9;
const maxX = mapWidth - width;

export default function MapBackdrop() {
  const offset = useRef(new Animated.ValueXY({x: -maxX * 0.5, y: 0})).current;
  const start = useRef({x: -maxX * 0.5, y: 0});
  const pan = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) =>
        Math.abs(g.dx) > 4 || Math.abs(g.dy) > 4,
      onPanResponderMove: (_, g) => {
        offset.setValue({
          x: clamp(start.current.x + g.dx, -maxX, 0),
          y: clamp(start.current.y + g.dy, -height * 0.25, 0),
        });
      },
      onPanResponderRelease: (_, g) => {
        start.current = {
          x: clamp(start.current.x + g.dx, -maxX, 0),
          y: clamp(start.current.y + g.dy, -height * 0.25, 0),
        };
      },
    }),
  ).current;

  return (
    <View
      style={styles.map}
      accessibilityLabel="Map of saved trip locations. Drag to explore"
      {...pan.panHandlers}
    >
      <Animated.View
        style={{
          width: mapWidth,
          height: mapHeight,
          transform: offset.getTranslateTransform(),
        }}
      >
        <Svg width={mapWidth} height={mapHeight} viewBox="0 0 640 760">
          <Path d="M0 0H640V760H0z" fill={colors.sea} />
          <G fill={colors.land} stroke={colors.landDark} strokeWidth={1.2}>
            <Path d="M70 62c22-14 52-10 74 2 18 10 34 6 46 20 10 14 2 34-12 44-18 12-40 8-58 18-20 10-42 6-58-4-14-10-26-26-18-44 6-14 14-28 26-36z" />
            <Path d="M640 0H500l-10 22-14 18-10 26-16 22-10 28-14 24-10 30-12 22-6 28-8 20-6 30-12 26 4 30-10 30 6 40-12 50 8 50-14 60 10 60-14 60 10 60H640z" />
            <Path d="M300 760c4-30 18-56 42-70 18-10 30 0 30 18 0 18-12 30-6 52h-66z" />
            <Path d="M318 520c8-6 16-2 16 6s-8 12-14 8-8-10-2-14zM338 476c6-4 12 0 12 6s-6 10-12 6-4-8 0-12zM300 440c6-6 14-4 16 2 2 8-6 14-12 12-6-2-8-8-4-14z" />
            <Path d="M268 600c8-4 16 0 16 8s-10 10-16 6-6-10 0-14z" />
            <Path d="M318 246c6-5 14-2 14 5s-8 10-13 7-5-8-1-12zM300 270c4-3 9-1 9 4s-5 7-8 5-4-6-1-9z" />
          </G>
          <SvgText x={96} y={120} fontSize={18} fill="#5b6b72">
            Iceland
          </SvgText>
          <SvgText x={440} y={192} fontSize={18} fill="#5b6b72">
            Norway
          </SvgText>
          <SvgText
            x={380}
            y={40}
            fontSize={12}
            fill="#7ea6b8"
            fontStyle="italic"
          >
            Norwegian Sea
          </SvgText>
          <SvgText
            x={190}
            y={470}
            fontSize={12}
            fill="#7ea6b8"
            fontStyle="italic"
          >
            North Atlantic Ocean
          </SvgText>
        </Svg>
      </Animated.View>
    </View>
  );
}
