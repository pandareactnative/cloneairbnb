import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import imagePath from '../constants/imagePath';
import styles from './styles';

export default function PromoBanner({onPress}: {onPress: () => void}) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel="Get 10% off your next stay. Browse homes"
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.banner}
    >
      <View style={styles.bannerText}>
        <Text style={styles.bannerTitle}>Get 10% off your next stay</Text>
        <View style={styles.bannerPill}>
          <Text style={styles.bannerPillText}>Browse homes</Text>
        </View>
      </View>
      <Image source={imagePath.bannerHouse} style={styles.bannerImage} />
    </TouchableOpacity>
  );
}
