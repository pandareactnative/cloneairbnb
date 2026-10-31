import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CircleButton from '../../Components/CircleButton';
import DestinationIcon from '../../Components/DestinationIcon';
import GradientButton from '../../Components/GradientButton';
import Icon from '../../Components/Icon';
import imagePath from '../../constants/imagePath';
import {
  Destination,
  ListingKind,
  searchDestinations,
  searchListings,
} from '../../constants/listings';
import names from '../../navigation/navigationStrings';
import {
  RootNavigation,
  RootStackParamList,
  SearchTab,
} from '../../navigation/types';
import colors from '../../styles/colors';
import {scale} from '../../styles/responsiveSize';
import styles from './styles';

type Step = 'where' | 'when' | 'who';
type Guests = {adults: number; children: number; infants: number; pets: number};

const tabs: {id: SearchTab; label: string; icon: number; kind: ListingKind}[] =
  [
    {id: 'homes', label: 'Homes', icon: imagePath.houseLarge, kind: 'home'},
    {
      id: 'experiences',
      label: 'Experiences',
      icon: imagePath.balloonLarge,
      kind: 'experience',
    },
    {
      id: 'services',
      label: 'Services',
      icon: imagePath.bellLarge,
      kind: 'service',
    },
  ];
const guestRows: {key: keyof Guests; title: string; hint: string}[] = [
  {key: 'adults', title: 'Adults', hint: 'Ages 13 or above'},
  {key: 'children', title: 'Children', hint: 'Ages 2–12'},
  {key: 'infants', title: 'Infants', hint: 'Under 2'},
  {key: 'pets', title: 'Pets', hint: 'Bringing a service animal?'},
];
const noGuests: Guests = {adults: 0, children: 0, infants: 0, pets: 0};
const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const monthName = (date: Date) =>
  date.toLocaleString('en-US', {month: 'long', year: 'numeric'});
const shortDate = (date: Date) =>
  date.toLocaleString('en-US', {month: 'short', day: 'numeric'});
const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const dateLabel = (start: Date | null, end: Date | null) => {
  if (!start) return 'Add dates';
  if (!end) return shortDate(start);
  return start.getMonth() === end.getMonth()
    ? `${shortDate(start)} – ${end.getDate()}`
    : `${shortDate(start)} – ${shortDate(end)}`;
};

export const guestLabel = (guests: Guests) => {
  const people = guests.adults + guests.children;
  if (!people) return 'Add guests';
  const parts = [`${people} guest${people > 1 ? 's' : ''}`];
  if (guests.infants)
    parts.push(`${guests.infants} infant${guests.infants > 1 ? 's' : ''}`);
  if (guests.pets)
    parts.push(`${guests.pets} pet${guests.pets > 1 ? 's' : ''}`);
  return parts.join(', ');
};

export default function Search() {
  const navigation = useNavigation<RootNavigation>();
  const route = useRoute<RouteProp<RootStackParamList, 'Search'>>();
  const inset = useSafeAreaInsets();
  const [tab, setTab] = useState<SearchTab>(route.params?.tab ?? 'homes');
  const [step, setStep] = useState<Step>('where');
  const [query, setQuery] = useState('');
  const [place, setPlace] = useState<Destination | null>(null);
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  const [guests, setGuests] = useState<Guests>(noGuests);
  const enter = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(enter, {
      toValue: 1,
      friction: 9,
      tension: 60,
      useNativeDriver: true,
    }).start();
  }, [enter]);

  const results = useMemo(() => searchDestinations(query), [query]);
  const today = useMemo(() => startOfDay(new Date()), []);
  const months = useMemo(
    () =>
      [0, 1].map(i => new Date(today.getFullYear(), today.getMonth() + i, 1)),
    [today],
  );

  const choosePlace = (item: Destination) => {
    setPlace(item);
    setQuery(item.id === 'nearby' ? '' : item.name);
    setStep('when');
  };

  const pickDay = (day: Date) => {
    if (!start || end || day <= start) {
      setStart(day);
      setEnd(null);
    } else {
      setEnd(day);
    }
  };

  const changeGuests = (key: keyof Guests, delta: number) =>
    setGuests(current => {
      const next = {...current, [key]: Math.max(0, current[key] + delta)};
      if (key !== 'adults' && delta > 0 && !next.adults) next.adults = 1;
      return next;
    });

  const clearAll = () => {
    setQuery('');
    setPlace(null);
    setStart(null);
    setEnd(null);
    setGuests(noGuests);
    setStep('where');
  };

  const submit = () => {
    const active = tabs.find(item => item.id === tab)!;
    const city = place?.city;
    let ids = searchListings(city, active.kind).map(item => item.id);
    let empty: string | undefined;
    if (!ids.length) {
      ids = searchListings(undefined, active.kind).map(item => item.id);
      empty = `No ${active.label.toLowerCase()} in ${
        place?.name
      } yet. Here are popular picks nearby.`;
    }
    navigation.replace(names.SECTION, {
      title: city ? `${active.label} in ${city}` : `${active.label} nearby`,
      subtitle: [dateLabel(start, end), guestLabel(guests)].join(' · '),
      ids,
      empty,
    });
  };

  const rise = {
    opacity: enter,
    transform: [
      {
        translateY: enter.interpolate({
          inputRange: [0, 1],
          outputRange: [-scale(36), 0],
        }),
      },
      {scale: enter.interpolate({inputRange: [0, 1], outputRange: [0.94, 1]})},
    ],
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, {paddingTop: inset.top}]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Animated.View style={[styles.topBar, {opacity: enter}]}>
        <View style={styles.tabs}>
          {tabs.map(item => {
            const active = item.id === tab;
            return (
              <TouchableOpacity
                key={item.id}
                accessibilityRole="tab"
                accessibilityLabel={item.label}
                accessibilityState={{selected: active}}
                onPress={() => setTab(item.id)}
                style={styles.tab}
              >
                <Image
                  source={item.icon}
                  style={[styles.tabIcon, !active && styles.tabIconIdle]}
                  resizeMode="contain"
                />
                <Text style={[styles.tabText, active && styles.tabTextActive]}>
                  {item.label}
                </Text>
                <View
                  style={[styles.tabLine, active && styles.tabLineActive]}
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <CircleButton
          raised
          icon="close"
          label="Close search"
          onPress={navigation.goBack}
          size={scale(40)}
          iconSize={scale(18)}
          style={styles.close}
        />
      </Animated.View>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Animated.View style={rise}>
          {step === 'where' ? (
            <View style={[styles.card, styles.cardOpen]}>
              <Text style={styles.cardTitle}>Where?</Text>
              <View style={styles.input}>
                <Icon name="search" size={scale(18)} strokeWidth={2.2} />
                <TextInput
                  testID="destination-input"
                  value={query}
                  onChangeText={setQuery}
                  placeholder="Search destinations"
                  placeholderTextColor={colors.textSecondary}
                  returnKeyType="search"
                  autoCorrect={false}
                  onSubmitEditing={() => results[0] && choosePlace(results[0])}
                  style={styles.inputText}
                />
                {!!query && (
                  <TouchableOpacity
                    accessibilityLabel="Clear destination"
                    onPress={() => setQuery('')}
                  >
                    <Icon name="close" size={scale(14)} strokeWidth={2.2} />
                  </TouchableOpacity>
                )}
              </View>
              <Text style={styles.label}>
                {query.trim() ? 'Results' : 'Suggested destinations'}
              </Text>
              {results.map(item => (
                <TouchableOpacity
                  key={item.id}
                  accessibilityRole="button"
                  accessibilityLabel={item.name}
                  onPress={() => choosePlace(item)}
                  style={styles.destination}
                >
                  <DestinationIcon item={item} />
                  <View style={styles.destinationText}>
                    <Text style={styles.destinationName}>{item.name}</Text>
                    <Text style={styles.destinationHint} numberOfLines={1}>
                      {item.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
              {!results.length && (
                <Text style={styles.empty}>
                  No destinations match “{query.trim()}”. Try another city.
                </Text>
              )}
            </View>
          ) : (
            <Row
              title="Where"
              value={place?.name ?? 'I’m flexible'}
              onPress={() => setStep('where')}
            />
          )}

          {step === 'when' ? (
            <View style={[styles.card, styles.cardOpen]}>
              <Text style={styles.cardTitle}>When’s your trip?</Text>
              <View style={styles.weekdays}>
                {weekdays.map((day, index) => (
                  <Text key={index} style={styles.weekday}>
                    {day}
                  </Text>
                ))}
              </View>
              {months.map(month => (
                <Month
                  key={month.toISOString()}
                  month={month}
                  today={today}
                  start={start}
                  end={end}
                  onPick={pickDay}
                />
              ))}
            </View>
          ) : (
            <Row
              title="When"
              value={dateLabel(start, end)}
              onPress={() => setStep('when')}
            />
          )}

          {step === 'who' ? (
            <View style={[styles.card, styles.cardOpen]}>
              <Text style={styles.cardTitle}>Who’s coming?</Text>
              {guestRows.map((row, index) => (
                <View
                  key={row.key}
                  style={[styles.guestRow, index > 0 && styles.guestBorder]}
                >
                  <View style={styles.fill}>
                    <Text style={styles.guestTitle}>{row.title}</Text>
                    <Text style={styles.guestHint}>{row.hint}</Text>
                  </View>
                  <Stepper
                    label={row.title}
                    value={guests[row.key]}
                    onChange={delta => changeGuests(row.key, delta)}
                  />
                </View>
              ))}
            </View>
          ) : (
            <Row
              title="Who"
              value={guestLabel(guests)}
              onPress={() => setStep('who')}
            />
          )}
        </Animated.View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          {paddingBottom: inset.bottom + scale(14)},
        ]}
      >
        <TouchableOpacity accessibilityRole="button" onPress={clearAll}>
          <Text style={styles.clear}>Clear all</Text>
        </TouchableOpacity>
        <GradientButton
          label={step === 'when' && start && !end ? 'Next' : 'Search'}
          icon={step === 'when' && start && !end ? undefined : 'search'}
          onPress={() =>
            step === 'when' && start && !end ? setStep('who') : submit()
          }
          style={styles.searchButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

function Row({
  title,
  value,
  onPress,
}: {
  title: string;
  value: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={`${title}: ${value}`}
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.card, styles.row]}
    >
      <Text style={styles.rowTitle}>{title}</Text>
      <Text style={styles.rowValue} numberOfLines={1}>
        {value}
      </Text>
    </TouchableOpacity>
  );
}

function Stepper({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (delta: number) => void;
}) {
  return (
    <View style={styles.stepper}>
      <TouchableOpacity
        accessibilityLabel={`Decrease ${label}`}
        accessibilityState={{disabled: !value}}
        disabled={!value}
        onPress={() => onChange(-1)}
        style={[styles.stepButton, !value && styles.stepDisabled]}
      >
        <Icon
          name="minus"
          size={scale(14)}
          strokeWidth={2}
          color={value ? colors.textPrimary : colors.border}
        />
      </TouchableOpacity>
      <Text style={styles.stepValue}>{value}</Text>
      <TouchableOpacity
        accessibilityLabel={`Increase ${label}`}
        onPress={() => onChange(1)}
        style={styles.stepButton}
      >
        <Icon name="plus" size={scale(14)} strokeWidth={2} />
      </TouchableOpacity>
    </View>
  );
}

function Month({
  month,
  today,
  start,
  end,
  onPick,
}: {
  month: Date;
  today: Date;
  start: Date | null;
  end: Date | null;
  onPick: (day: Date) => void;
}) {
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = Array(month.getDay()).fill(null);
  for (let day = 1; day <= days; day++) {
    cells.push(new Date(month.getFullYear(), month.getMonth(), day));
  }
  return (
    <View style={styles.month}>
      <Text style={styles.monthTitle}>{monthName(month)}</Text>
      <View style={styles.days}>
        {cells.map((day, index) => {
          if (!day) return <View key={index} style={styles.day} />;
          const past = day < today;
          const edge =
            day.getTime() === start?.getTime() ||
            day.getTime() === end?.getTime();
          const between = !!start && !!end && day > start && day < end;
          return (
            <TouchableOpacity
              key={index}
              accessibilityLabel={day.toDateString()}
              accessibilityState={{disabled: past, selected: edge}}
              disabled={past}
              onPress={() => onPick(day)}
              style={[styles.day, between && styles.dayBetween]}
            >
              <View style={[styles.dayCircle, edge && styles.dayEdge]}>
                <Text
                  style={[
                    styles.dayText,
                    past && styles.dayPast,
                    edge && styles.dayTextEdge,
                  ]}
                >
                  {day.getDate()}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
