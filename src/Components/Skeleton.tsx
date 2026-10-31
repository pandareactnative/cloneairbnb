import React, {useEffect, useRef} from 'react';
import {Animated, StyleProp, View, ViewStyle} from 'react-native';
import {CARD_HEIGHT, CARD_WIDTH} from './ListingCard';
import {RAIL_GAP} from './ListingRail';
import {scale} from '../styles/responsiveSize';
import styles from './styles';

export function usePulse() {
  const pulse = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 0.45,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);
  return pulse;
}

export function Bone({style}: {style: StyleProp<ViewStyle>}) {
  return <View style={[styles.bone, style]} />;
}

export default function FeedSkeleton() {
  const pulse = usePulse();
  return (
    <Animated.View
      testID="feed-skeleton"
      accessibilityLabel="Loading"
      style={[styles.feedSkeleton, {opacity: pulse}]}
    >
      {[0, 1, 2].map(row => (
        <View key={row} style={styles.skeletonSection}>
          <Bone style={{width: scale(190), height: scale(14)}} />
          <View style={styles.skeletonRow}>
            {[0, 1, 2].map(card => (
              <View key={card} style={{marginRight: RAIL_GAP}}>
                <Bone
                  style={{
                    width: CARD_WIDTH,
                    height: CARD_HEIGHT,
                    borderRadius: scale(18),
                  }}
                />
                <Bone style={styles.skeletonLine} />
                <Bone style={[styles.skeletonLine, {width: scale(72)}]} />
              </View>
            ))}
          </View>
        </View>
      ))}
    </Animated.View>
  );
}
