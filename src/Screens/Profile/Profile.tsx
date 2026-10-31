import React, {useCallback, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from '../../Components/BottomSheet';
import CircleButton from '../../Components/CircleButton';
import GradientButton from '../../Components/GradientButton';
import Icon from '../../Components/Icon';
import {Bone, usePulse} from '../../Components/Skeleton';
import imagePath from '../../constants/imagePath';
import {guest, menuGroups, profileCards} from '../../constants/profile';
import colors from '../../styles/colors';
import {scale} from '../../styles/responsiveSize';
import styles from './styles';

type Info = {title: string; description: string} | null;

export default function Profile() {
  const inset = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<Info>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pulse = usePulse();

  useFocusEffect(
    useCallback(() => {
      timer.current = setTimeout(() => setLoading(false), 600);
      return () => {
        if (timer.current) clearTimeout(timer.current);
      };
    }, []),
  );

  const logOut = () =>
    Alert.alert(
      'Log out',
      'This demo has no real account, so there is nothing to sign out of.',
      [{text: 'OK'}],
    );

  const compact = scrollY.interpolate({
    inputRange: [scale(50), scale(80)],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.compactHeader,
          {
            paddingTop: inset.top,
            height: inset.top + scale(56),
            opacity: compact,
          },
        ]}
      >
        <Text style={styles.compactTitle}>Profile</Text>
      </Animated.View>
      <CircleButton
        icon="bell"
        label="Notifications"
        onPress={() => setInfo(profileCards.notifications)}
        iconSize={scale(19)}
        style={[styles.bell, {top: inset.top + scale(9)}]}
      />
      <Animated.ScrollView
        contentContainerStyle={[
          styles.content,
          {paddingTop: inset.top + scale(56)},
        ]}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
      >
        <Text accessibilityRole="header" style={styles.title}>
          Profile
        </Text>
        {loading ? (
          <Animated.View style={{opacity: pulse}}>
            <View style={[styles.card, styles.skeletonCard]}>
              <View style={styles.skeletonAvatar} />
              <View style={styles.skeletonLines}>
                <Bone style={styles.skeletonShort} />
                <Bone style={styles.skeletonShort} />
                <Bone style={styles.skeletonShort} />
              </View>
            </View>
            <Bone style={styles.skeletonBlock} />
            <Bone style={[styles.skeletonBlock, styles.skeletonTall]} />
          </Animated.View>
        ) : (
          <>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={`${guest.name}, ${guest.role}. View profile`}
              activeOpacity={0.9}
              onPress={() =>
                setInfo({
                  title: menuGroups[0][2].label,
                  description: menuGroups[0][2].description,
                })
              }
              style={[styles.card, styles.profileCard]}
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{guest.name[0]}</Text>
              </View>
              <Text style={styles.name}>{guest.name}</Text>
              <Text style={styles.role}>{guest.role}</Text>
            </TouchableOpacity>

            <View style={styles.pair}>
              {[
                {card: profileCards.trips, image: imagePath.suitcase},
                {card: profileCards.connections, image: imagePath.connections},
              ].map(({card, image}) => (
                <TouchableOpacity
                  key={card.title}
                  accessibilityRole="button"
                  accessibilityLabel={card.title}
                  activeOpacity={0.9}
                  onPress={() => setInfo(card)}
                  style={[styles.card, styles.smallCard]}
                >
                  <View style={styles.newBadge}>
                    <Text style={styles.newText}>NEW</Text>
                  </View>
                  <Image
                    source={image}
                    style={styles.smallImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.smallTitle}>{card.title}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Become a host"
              activeOpacity={0.9}
              onPress={() => setInfo(profileCards.host)}
              style={[styles.card, styles.hostCard]}
            >
              <Image
                source={imagePath.host}
                style={styles.hostImage}
                resizeMode="contain"
              />
              <View style={styles.hostText}>
                <Text style={styles.hostTitle}>Become a host</Text>
                <Text style={styles.hostBody}>
                  It’s easy to start hosting and earn extra income.
                </Text>
              </View>
            </TouchableOpacity>

            {menuGroups.map((group, index) => (
              <View
                key={index}
                style={[styles.group, index > 0 && styles.groupBorder]}
              >
                {group.map(item => (
                  <MenuRow
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    onPress={() =>
                      setInfo({
                        title: item.label,
                        description: item.description,
                      })
                    }
                  />
                ))}
              </View>
            ))}
            <MenuRow icon="door" label="Log out" onPress={logOut} last />
          </>
        )}
      </Animated.ScrollView>

      <BottomSheet visible={!!info} onClose={() => setInfo(null)}>
        <Text style={styles.sheetTitle}>{info?.title}</Text>
        <Text style={styles.sheetBody}>{info?.description}</Text>
        <GradientButton dark label="Done" onPress={() => setInfo(null)} />
      </BottomSheet>
    </View>
  );
}

function MenuRow({
  icon,
  label,
  onPress,
  last,
}: {
  icon: string;
  label: string;
  onPress: () => void;
  last?: boolean;
}) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={styles.row}
    >
      <MaterialIcon name={icon} size={scale(25)} color={colors.textPrimary} />
      <Text style={styles.rowText}>{label}</Text>
      {!last && (
        <Icon
          name="chevronRight"
          size={scale(17)}
          color={colors.textSecondary}
          strokeWidth={1.8}
        />
      )}
    </TouchableOpacity>
  );
}
