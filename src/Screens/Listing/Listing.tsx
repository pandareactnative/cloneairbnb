import React, {useEffect} from 'react';
import {Alert, Image, ScrollView, Share, Text, View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CircleButton from '../../Components/CircleButton';
import GradientButton from '../../Components/GradientButton';
import HeartButton from '../../Components/HeartButton';
import Icon from '../../Components/Icon';
import {listingById, priceLine} from '../../constants/listings';
import names from '../../navigation/navigationStrings';
import {RootNavigation, RootStackParamList} from '../../navigation/types';
import {useApp} from '../../store/AppContext';
import colors from '../../styles/colors';
import {scale} from '../../styles/responsiveSize';
import styles from './styles';

const amenities = {
  home: [
    ['wifi', 'Wifi'],
    ['silverware-fork-knife', 'Kitchen'],
    ['air-conditioner', 'Air conditioning'],
    ['washing-machine', 'Washing machine'],
    ['car-outline', 'Free parking on premises'],
  ],
  experience: [
    ['account-group-outline', 'Small group'],
    ['translate', 'Hosted in English'],
    ['walk', 'Moderate walking'],
  ],
  service: [
    ['camera-outline', 'Professional camera'],
    ['image-multiple-outline', 'Edited photos within 3 days'],
    ['map-marker-outline', 'Comes to your location'],
  ],
};

export default function Listing() {
  const navigation = useNavigation<RootNavigation>();
  const {params} = useRoute<RouteProp<RootStackParamList, 'Listing'>>();
  const inset = useSafeAreaInsets();
  const {viewListing, reserve} = useApp();
  const listing = listingById(params.id);

  useEffect(() => {
    if (listing) viewListing(listing.id);
  }, [listing, viewListing]);

  if (!listing) return null;

  const isHome = listing.kind === 'home';
  const dates = isHome ? 'Nov 14 – 16' : 'Tomorrow, 10:00';
  const guests = isHome ? '2 guests' : '1 guest';

  const confirm = () =>
    Alert.alert(
      isHome ? 'Reserve this stay?' : 'Book this demo?',
      `${listing.title}\n${dates} · ${guests}\n\nThis is a demo. No payment is taken and no host is contacted.`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Confirm',
          onPress: () => {
            reserve(listing.id, dates, guests);
            Alert.alert(
              'Added to Trips',
              'Your demo booking is saved for this session.',
              [
                {text: 'Keep browsing'},
                {
                  text: 'View trips',
                  onPress: () =>
                    navigation.navigate(names.TABS, {screen: names.TRIPS}),
                },
              ],
            );
          },
        },
      ],
    );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{paddingBottom: inset.bottom + scale(100)}}
        showsVerticalScrollIndicator={false}
      >
        <Image source={listing.image} style={styles.hero} />
        <View style={styles.body}>
          <Text style={styles.title}>{listing.title}</Text>
          <Text style={styles.summary}>{listing.summary}</Text>
          <View style={styles.ratingRow}>
            {listing.rating !== undefined ? (
              <>
                <Icon
                  name="star"
                  size={scale(13)}
                  fill={colors.textPrimary}
                  strokeWidth={1}
                />
                <Text style={styles.rating}>
                  {listing.rating === 5 ? '5.0' : listing.rating} ·{' '}
                  <Text style={styles.underline}>
                    {listing.reviews} reviews
                  </Text>
                </Text>
              </>
            ) : (
              <Text style={styles.rating}>New on Airbnb</Text>
            )}
          </View>

          {listing.badge === 'Guest favourite' && (
            <View style={styles.favourite}>
              <MaterialIcon
                name="trophy-outline"
                size={scale(26)}
                color={colors.textPrimary}
              />
              <Text style={styles.favouriteText}>
                One of the most loved homes on Airbnb, according to guests
              </Text>
            </View>
          )}

          <View style={styles.divider} />
          <View style={styles.host}>
            <View style={styles.hostAvatar}>
              <MaterialIcon
                name="account"
                size={scale(26)}
                color={colors.white}
              />
            </View>
            <View>
              <Text style={styles.hostTitle}>
                {isHome ? 'Hosted by a Superhost' : 'Hosted by a local expert'}
              </Text>
              <Text style={styles.hostMeta}>
                {listing.city} · Hosting for 4 years
              </Text>
            </View>
          </View>
          <View style={styles.divider} />

          <Text style={styles.paragraph}>
            {isHome
              ? `A bright, comfortable place in ${listing.city} with a fully equipped kitchen, fast wifi and easy access to local food and sights.`
              : `Spend time with a local in ${listing.city} and see the city through their eyes. Small groups keep it relaxed and personal.`}
          </Text>

          <Text style={styles.subheading}>
            {isHome ? 'What this place offers' : 'What’s included'}
          </Text>
          {amenities[listing.kind].map(([icon, label]) => (
            <View key={label} style={styles.amenity}>
              <MaterialIcon
                name={icon}
                size={scale(24)}
                color={colors.textPrimary}
              />
              <Text style={styles.amenityText}>{label}</Text>
            </View>
          ))}
          <Text style={styles.note}>
            Sample listing for a UI demo. Prices and availability are not live.
          </Text>
        </View>
      </ScrollView>

      <View style={[styles.actions, {top: inset.top + scale(6)}]}>
        <CircleButton
          raised
          icon="chevronLeft"
          label="Back"
          onPress={navigation.goBack}
          size={scale(34)}
          iconSize={scale(15)}
        />
        <View style={styles.actionGroup}>
          <CircleButton
            raised
            icon="share"
            label="Share"
            onPress={() =>
              Share.share({message: `${listing.title} · ${priceLine(listing)}`})
            }
            size={scale(34)}
            iconSize={scale(15)}
          />
          <View style={styles.heartCircle}>
            <HeartButton
              id={listing.id}
              title={listing.title}
              size={scale(17)}
              outlineColor={colors.textPrimary}
              emptyFill="transparent"
            />
          </View>
        </View>
      </View>

      <View style={[styles.footer, {paddingBottom: inset.bottom + scale(10)}]}>
        <View style={styles.fill}>
          <Text style={styles.price}>{priceLine(listing)}</Text>
          <Text style={styles.dates}>{dates}</Text>
        </View>
        <GradientButton
          label={isHome ? 'Reserve' : 'Book'}
          onPress={confirm}
          style={styles.reserve}
        />
      </View>
    </View>
  );
}
