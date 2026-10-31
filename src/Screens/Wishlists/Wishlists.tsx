import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BottomSheet from '../../Components/BottomSheet';
import GradientButton from '../../Components/GradientButton';
import Icon from '../../Components/Icon';
import PhotoStack from '../../Components/PhotoStack';
import {Bone, usePulse} from '../../Components/Skeleton';
import imagePath from '../../constants/imagePath';
import {Listing, listingById} from '../../constants/listings';
import names from '../../navigation/navigationStrings';
import {TabNavigation} from '../../navigation/types';
import {useApp} from '../../store/AppContext';
import colors from '../../styles/colors';
import {scale} from '../../styles/responsiveSize';
import styles from './styles';

const introPhotos = [
  imagePath.puducherry2,
  imagePath.lucknow2,
  imagePath.mumbai2,
];
const toListings = (ids: string[]) =>
  ids.map(listingById).filter((item): item is Listing => !!item);

export default function Wishlists() {
  const navigation = useNavigation<TabNavigation>();
  const inset = useSafeAreaInsets();
  const {saved, recent, wishlistIntroSeen, dismissWishlistIntro} = useApp();
  const [loading, setLoading] = useState(true);
  const [intro, setIntro] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pulse = usePulse();

  useFocusEffect(
    useCallback(() => {
      timer.current = setTimeout(() => {
        setLoading(false);
        if (!wishlistIntroSeen) setIntro(true);
      }, 650);
      return () => {
        if (timer.current) clearTimeout(timer.current);
      };
    }, [wishlistIntroSeen]),
  );
  useEffect(() => {
    if (wishlistIntroSeen) setIntro(false);
  }, [wishlistIntroSeen]);

  const open = (title: string, ids: string[], empty: string) =>
    navigation.navigate(names.SECTION, {title, ids, empty});

  const savedItems = toListings(saved);
  const recentItems = toListings(recent);

  return (
    <View style={[styles.container, {paddingTop: inset.top}]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text accessibilityRole="header" style={styles.title}>
          Wishlists
        </Text>
        {loading ? (
          <Animated.View style={[styles.grid, {opacity: pulse}]}>
            <View>
              <View style={styles.skeletonTile}>
                {[0, 1, 2, 3].map(i => (
                  <View key={i} style={styles.skeletonCell} />
                ))}
              </View>
              <Bone style={styles.skeletonLabel} />
            </View>
          </Animated.View>
        ) : (
          <View style={styles.grid}>
            <Tile
              title="Recently viewed"
              items={recentItems}
              caption={recentItems.length ? 'Today' : undefined}
              onPress={() =>
                open(
                  'Recently viewed',
                  recent,
                  'Homes and experiences you open will appear here.',
                )
              }
            />
            {savedItems.length > 0 && (
              <Tile
                title="Saved"
                items={savedItems}
                caption={`${savedItems.length} saved`}
                onPress={() =>
                  open(
                    'Saved',
                    saved,
                    'Tap the heart on any listing to save it.',
                  )
                }
              />
            )}
          </View>
        )}
      </ScrollView>

      <BottomSheet
        visible={intro}
        onClose={dismissWishlistIntro}
        style={styles.sheet}
      >
        <View style={styles.introArt}>
          <PhotoStack images={introPhotos} size={scale(132)} hearts />
        </View>
        <Text style={styles.introTitle}>Save your favourites in one place</Text>
        <Text style={styles.introBody}>
          Tap the heart icon as you browse to save stays and experiences to a
          wishlist.
        </Text>
        <GradientButton dark label="Got it" onPress={dismissWishlistIntro} />
      </BottomSheet>
    </View>
  );
}

function Tile({
  title,
  items,
  caption,
  onPress,
}: {
  title: string;
  items: Listing[];
  caption?: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={title}
      activeOpacity={0.85}
      onPress={onPress}
    >
      {items.length > 0 && items.length < 4 ? (
        <Image source={items[0].image} style={styles.cover} />
      ) : items.length ? (
        <View style={styles.collage}>
          {[0, 1, 2, 3].map(i => (
            <View key={i} style={styles.collageCell}>
              {items[i] && (
                <Image source={items[i].image} style={styles.collageImage} />
              )}
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyTile}>
          <Icon
            name="history"
            size={scale(74)}
            color={colors.white}
            strokeWidth={1.8}
          />
        </View>
      )}
      <Text style={styles.tileTitle}>{title}</Text>
      {caption && <Text style={styles.tileCaption}>{caption}</Text>}
    </TouchableOpacity>
  );
}
