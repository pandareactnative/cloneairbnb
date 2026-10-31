import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CircleButton from '../../Components/CircleButton';
import ListingCard from '../../Components/ListingCard';
import {Listing, listingById} from '../../constants/listings';
import names from '../../navigation/navigationStrings';
import {RootNavigation, RootStackParamList} from '../../navigation/types';
import {scale, width} from '../../styles/responsiveSize';
import styles from './styles';

const GAP = scale(14);
const CARD = Math.floor((width - scale(48) - GAP) / 2);

export default function Section() {
  const navigation = useNavigation<RootNavigation>();
  const {params} = useRoute<RouteProp<RootStackParamList, 'Section'>>();
  const inset = useSafeAreaInsets();
  const items = params.ids
    .map(listingById)
    .filter((item): item is Listing => !!item);

  return (
    <View style={[styles.container, {paddingTop: inset.top}]}>
      <View style={styles.header}>
        <CircleButton
          icon="chevronLeft"
          label="Back"
          onPress={navigation.goBack}
          size={scale(36)}
          iconSize={scale(16)}
        />
        <View style={styles.headerText}>
          <Text style={styles.title} numberOfLines={1}>
            {params.title}
          </Text>
          {params.subtitle && (
            <Text style={styles.subtitle} numberOfLines={1}>
              {params.subtitle}
            </Text>
          )}
        </View>
        <View style={styles.spacer} />
      </View>
      <FlatList
        data={items}
        numColumns={2}
        keyExtractor={item => item.id}
        columnWrapperStyle={{gap: GAP}}
        contentContainerStyle={[
          styles.list,
          {paddingBottom: inset.bottom + scale(24)},
        ]}
        ListHeaderComponent={
          params.empty && items.length ? (
            <Text style={styles.notice}>{params.empty}</Text>
          ) : undefined
        }
        ListEmptyComponent={
          <Text style={styles.empty}>
            {params.empty ?? 'Nothing here yet.'}
          </Text>
        }
        renderItem={({item}) => (
          <View style={styles.item}>
            <ListingCard
              listing={item}
              width={CARD}
              height={CARD * 0.95}
              onPress={listing =>
                navigation.push(names.LISTING, {id: listing.id})
              }
            />
          </View>
        )}
      />
    </View>
  );
}
