import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import HeartButton from './HeartButton';
import Icon from './Icon';
import {Listing, priceLine} from '../constants/listings';
import colors from '../styles/colors';
import {scale} from '../styles/responsiveSize';
import styles from './styles';

type Props = {
  listing: Listing;
  onPress: (listing: Listing) => void;
  width?: number;
  height?: number;
};

export const CARD_WIDTH = scale(168);
export const CARD_HEIGHT = scale(160);

export function ListingMeta({listing}: {listing: Listing}) {
  return (
    <Text style={styles.cardMeta} numberOfLines={1}>
      {priceLine(listing)}
      {listing.rating !== undefined && (
        <>
          <Text style={styles.cardDot}> · </Text>
          <Icon
            name="star"
            size={scale(10)}
            color={colors.textSecondary}
            fill={colors.textSecondary}
            strokeWidth={1}
          />
          {` ${listing.rating === 5 ? '5.0' : listing.rating}`}
        </>
      )}
    </Text>
  );
}

export default function ListingCard({
  listing,
  onPress,
  width = CARD_WIDTH,
  height = CARD_HEIGHT,
}: Props) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={`${listing.title}, ${priceLine(listing)}`}
      activeOpacity={0.9}
      onPress={() => onPress(listing)}
      style={{width}}
    >
      <View style={[styles.cardPhoto, {width, height}]}>
        <Image source={listing.image} style={styles.cardImage} />
        {listing.badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{listing.badge}</Text>
          </View>
        )}
        <HeartButton
          id={listing.id}
          title={listing.title}
          style={styles.cardHeart}
        />
      </View>
      <Text style={styles.cardTitle} numberOfLines={2}>
        {listing.title}
      </Text>
      <ListingMeta listing={listing} />
    </TouchableOpacity>
  );
}
