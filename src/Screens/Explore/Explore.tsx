import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  RefreshControl,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CategoryChips from '../../Components/CategoryChips';
import GradientBackground from '../../Components/GradientBackground';
import Icon from '../../Components/Icon';
import ListingRail from '../../Components/ListingRail';
import PromoBanner from '../../Components/PromoBanner';
import FeedSkeleton from '../../Components/Skeleton';
import Toast from '../../Components/Toast';
import {
  Category,
  FeedItem,
  FeedSection,
  Listing,
  feeds,
} from '../../constants/listings';
import names from '../../navigation/navigationStrings';
import {SearchTab, TabNavigation} from '../../navigation/types';
import colors from '../../styles/colors';
import {scale} from '../../styles/responsiveSize';
import styles from './styles';

const FEES_MESSAGE = 'Prices include all fees';
const searchTabs: Record<Category, SearchTab> = {
  all: 'homes',
  homes: 'homes',
  experiences: 'experiences',
  services: 'services',
};

export default function Explore() {
  const navigation = useNavigation<TabNavigation>();
  const inset = useSafeAreaInsets();
  const [category, setCategory] = useState<Category>('all');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const list = useRef<FlatList<FeedItem>>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const later = useCallback((callback: () => void, ms: number) => {
    timers.current.push(setTimeout(callback, ms));
  }, []);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const showToast = useCallback(() => {
    setToast(FEES_MESSAGE);
    later(() => setToast(null), 3200);
  }, [later]);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      showToast();
    }, [showToast]),
  );

  useEffect(
    () =>
      navigation.addListener('tabPress', () => {
        if (navigation.isFocused()) {
          list.current?.scrollToOffset({offset: 0, animated: true});
        }
      }),
    [navigation],
  );

  const selectCategory = (next: Category) => {
    if (next === category) return;
    setCategory(next);
    setLoading(true);
    list.current?.scrollToOffset({offset: 0, animated: false});
    later(() => setLoading(false), 700);
  };

  const refresh = () => {
    setRefreshing(true);
    later(() => {
      setRefreshing(false);
      showToast();
    }, 900);
  };

  const openListing = (listing: Listing) =>
    navigation.navigate(names.LISTING, {id: listing.id});
  const openSection = (section: FeedSection) =>
    navigation.navigate(names.SECTION, {
      title: section.title,
      subtitle: section.subtitle,
      ids: section.listingIds,
    });

  const renderItem = ({item}: {item: FeedItem}) => {
    if (item.type === 'banner') {
      return <PromoBanner onPress={() => selectCategory('homes')} />;
    }
    if (item.type === 'heading') {
      return <Text style={styles.heading}>{item.title}</Text>;
    }
    return (
      <ListingRail
        section={item}
        onOpenListing={openListing}
        onOpenSection={openSection}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, {paddingTop: inset.top}]}>
        <GradientBackground
          colors={[
            colors.headerTop,
            colors.headerMiddle,
            colors.headerBottom,
            colors.white,
          ]}
        />
        <TouchableOpacity
          accessibilityRole="search"
          accessibilityLabel="Start your search"
          activeOpacity={0.9}
          onPress={() =>
            navigation.navigate(names.SEARCH, {tab: searchTabs[category]})
          }
          style={styles.searchPill}
        >
          <Icon name="search" size={scale(16)} strokeWidth={2.4} />
          <Text style={styles.searchText}>Start your search</Text>
        </TouchableOpacity>
        <CategoryChips selected={category} onSelect={selectCategory} />
        <Animated.View
          pointerEvents="none"
          style={[
            styles.headerLine,
            {
              opacity: scrollY.interpolate({
                inputRange: [0, 24],
                outputRange: [0, 1],
                extrapolate: 'clamp',
              }),
            },
          ]}
        />
      </View>
      {loading ? (
        <FeedSkeleton />
      ) : (
        <Animated.FlatList
          ref={list}
          data={feeds[category]}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.feed}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }
        />
      )}
      <Toast message={toast} bottom={scale(16)} />
    </View>
  );
}
