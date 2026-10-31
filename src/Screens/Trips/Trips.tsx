import React, {useRef, useState} from 'react';
import {
  Animated,
  Image,
  PanResponder,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import GradientButton from '../../Components/GradientButton';
import Icon from '../../Components/Icon';
import MapBackdrop from '../../Components/MapBackdrop';
import imagePath from '../../constants/imagePath';
import {clamp, shouldCollapse} from '../../constants/gestures';
import {listingById} from '../../constants/listings';
import names from '../../navigation/navigationStrings';
import {TabNavigation} from '../../navigation/types';
import {useApp} from '../../store/AppContext';
import colors from '../../styles/colors';
import {scale} from '../../styles/responsiveSize';
import styles from './styles';

const PEEK = scale(132);

export default function Trips() {
  const navigation = useNavigation<TabNavigation>();
  const {trips} = useApp();
  const [area, setArea] = useState(0);
  const offset = useRef(new Animated.Value(0)).current;
  const position = useRef(0);
  const bounds = useRef({open: 0, closed: 0});

  const snap = (to: number) => {
    position.current = to;
    Animated.spring(offset, {
      toValue: to,
      friction: 10,
      tension: 70,
      useNativeDriver: true,
    }).start();
  };

  const pan = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) =>
        Math.abs(g.dy) > 6 && Math.abs(g.dy) > Math.abs(g.dx),
      onPanResponderMove: (_, g) => {
        offset.setValue(
          clamp(position.current + g.dy, 0, bounds.current.closed),
        );
      },
      onPanResponderRelease: (_, g) => {
        const {closed} = bounds.current;
        const current = clamp(position.current + g.dy, 0, closed);
        snap(shouldCollapse(current, g.vy, closed) ? closed : 0);
      },
    }),
  ).current;

  const onLayout = (h: number) => {
    setArea(h);
    bounds.current = {open: 0, closed: h * 0.64 - PEEK};
  };

  const toggle = () => snap(position.current > 0 ? 0 : bounds.current.closed);

  return (
    <View
      style={styles.container}
      onLayout={event => onLayout(event.nativeEvent.layout.height)}
    >
      <MapBackdrop />
      {area > 0 && (
        <Animated.View
          style={[
            styles.sheet,
            {top: area * 0.36, transform: [{translateY: offset}]},
          ]}
        >
          <View {...pan.panHandlers} style={styles.handleArea}>
            <TouchableOpacity
              accessibilityRole="adjustable"
              accessibilityLabel="Expand or collapse trips"
              onPress={toggle}
              hitSlop={12}
            >
              <View style={styles.handle} />
            </TouchableOpacity>
          </View>
          {trips.length ? (
            <ScrollView contentContainerStyle={styles.list}>
              <Text style={styles.listTitle}>Upcoming trips</Text>
              {trips.map(trip => {
                const listing = listingById(trip.listingId);
                if (!listing) return null;
                return (
                  <TouchableOpacity
                    key={trip.id}
                    accessibilityRole="button"
                    onPress={() =>
                      navigation.navigate(names.LISTING, {id: listing.id})
                    }
                    style={styles.trip}
                  >
                    <Image source={listing.image} style={styles.tripImage} />
                    <View style={styles.tripText}>
                      <Text style={styles.tripTitle} numberOfLines={1}>
                        {listing.title}
                      </Text>
                      <Text style={styles.tripMeta}>
                        {trip.dates} · {trip.guests}
                      </Text>
                      <Text style={styles.tripDemo}>
                        Demo booking · not charged
                      </Text>
                    </View>
                    <Icon
                      name="chevronRight"
                      size={scale(16)}
                      color={colors.textSecondary}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          ) : (
            <View {...pan.panHandlers} style={styles.empty}>
              <Image source={imagePath.tripMap} style={styles.art} />
              <Text style={styles.title}>Map out your next trip</Text>
              <Text style={styles.body}>
                After you book a trip, experience or service, come back here to
                see details, explore the map and save places to visit.
              </Text>
              <GradientButton
                label="Get started"
                onPress={() => navigation.navigate(names.EXPLORE)}
                style={styles.button}
              />
            </View>
          )}
        </Animated.View>
      )}
    </View>
  );
}
