import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import CircleButton from './CircleButton';
import ListingCard, {CARD_HEIGHT, CARD_WIDTH} from './ListingCard';
import PhotoStack from './PhotoStack';
import {FeedSection, Listing, listingById} from '../constants/listings';
import {scale} from '../styles/responsiveSize';
import styles from './styles';

type Props = {
  section: FeedSection;
  onOpenListing: (listing: Listing) => void;
  onOpenSection: (section: FeedSection) => void;
};

export const RAIL_GAP = scale(11);

export function SectionHeader({
  title,
  subtitle,
  onPress,
}: {
  title: string;
  subtitle?: string;
  onPress: () => void;
}) {
  return (
    <View style={styles.sectionHeader}>
      <TouchableOpacity
        accessibilityRole="header"
        onPress={onPress}
        style={styles.sectionText}
      >
        <Text style={styles.sectionTitle}>{title}</Text>
        {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
      </TouchableOpacity>
      <CircleButton
        icon="arrowRight"
        label={`Show all ${title}`}
        onPress={onPress}
        size={scale(30)}
        iconSize={scale(15)}
      />
    </View>
  );
}

export default function ListingRail({
  section,
  onOpenListing,
  onOpenSection,
}: Props) {
  const items = section.listingIds
    .map(listingById)
    .filter((item): item is Listing => !!item);
  return (
    <View style={styles.section}>
      <SectionHeader
        title={section.title}
        subtitle={section.subtitle}
        onPress={() => onOpenSection(section)}
      />
      <FlatList
        horizontal
        data={items}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + RAIL_GAP}
        contentContainerStyle={styles.railContent}
        ItemSeparatorComponent={RailGap}
        renderItem={({item}) => (
          <ListingCard listing={item} onPress={onOpenListing} />
        )}
        ListFooterComponent={
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={`See all ${section.title}`}
            activeOpacity={0.85}
            onPress={() => onOpenSection(section)}
            style={[
              styles.seeAll,
              {width: CARD_WIDTH, height: CARD_HEIGHT, marginLeft: RAIL_GAP},
            ]}
          >
            <PhotoStack
              images={items.slice(-3).map(item => item.image)}
              size={scale(40)}
            />
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
}

function RailGap() {
  return <View style={{width: RAIL_GAP}} />;
}
