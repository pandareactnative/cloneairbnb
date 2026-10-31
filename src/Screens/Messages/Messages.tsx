import React, {useCallback, useRef, useState} from 'react';
import {
  Animated,
  Image,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from '../../Components/BottomSheet';
import CircleButton from '../../Components/CircleButton';
import GradientButton from '../../Components/GradientButton';
import Icon from '../../Components/Icon';
import {Bone, usePulse} from '../../Components/Skeleton';
import imagePath from '../../constants/imagePath';
import names from '../../navigation/navigationStrings';
import {TabNavigation} from '../../navigation/types';
import colors from '../../styles/colors';
import {scale} from '../../styles/responsiveSize';
import styles from './styles';

type Sheet = 'settings' | 'past' | null;

export default function Messages() {
  const navigation = useNavigation<TabNavigation>();
  const inset = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState('');
  const [sheet, setSheet] = useState<Sheet>(null);
  const [receipts, setReceipts] = useState(true);
  const [alerts, setAlerts] = useState(true);
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

  return (
    <View style={[styles.container, {paddingTop: inset.top}]}>
      <View style={styles.actions}>
        <CircleButton
          icon="search"
          label={searching ? 'Close message search' : 'Search messages'}
          onPress={() => {
            setSearching(value => !value);
            setQuery('');
          }}
        />
        <CircleButton
          icon="search"
          label="Message settings"
          onPress={() => setSheet('settings')}
        >
          <MaterialIcon
            name="cog-outline"
            size={scale(20)}
            color={colors.textPrimary}
          />
        </CircleButton>
      </View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
        <Text accessibilityRole="header" style={styles.title}>
          Messages
        </Text>
        {searching && (
          <View style={styles.search}>
            <Icon name="search" size={scale(16)} strokeWidth={2.2} />
            <TextInput
              autoFocus
              value={query}
              onChangeText={setQuery}
              placeholder="Search all messages"
              placeholderTextColor={colors.textSecondary}
              style={styles.searchInput}
            />
          </View>
        )}
        {loading ? (
          <Animated.View style={{opacity: pulse}}>
            <View style={styles.filters}>
              {['All', 'Travelling', 'Support'].map(label => (
                <View key={label} style={styles.filter}>
                  <Text style={styles.filterText}>{label}</Text>
                </View>
              ))}
            </View>
            <Bone style={styles.skeletonArt} />
          </Animated.View>
        ) : searching && query.trim() ? (
          <Text style={styles.noResults}>
            No messages match “{query.trim()}”.
          </Text>
        ) : (
          <View style={styles.empty}>
            <Image source={imagePath.messages} style={styles.art} />
            <Text style={styles.emptyTitle}>Nothing to see here</Text>
            <Text style={styles.emptyBody}>
              Plan a stay, experience or service to connect with your host here.
            </Text>
            <GradientButton
              label="Get started"
              onPress={() => navigation.navigate(names.EXPLORE)}
              style={styles.button}
            />
          </View>
        )}
        {!loading && (
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => setSheet('past')}
            style={styles.past}
          >
            <Text style={styles.pastText}>Past conversations</Text>
            <Icon name="chevronRight" size={scale(16)} strokeWidth={2} />
          </TouchableOpacity>
        )}
      </ScrollView>

      <BottomSheet visible={!!sheet} onClose={() => setSheet(null)}>
        {sheet === 'settings' ? (
          <View style={styles.settings}>
            <Text style={styles.sheetTitle}>Message settings</Text>
            <SettingRow
              title="Read receipts"
              hint="Let hosts see when you’ve read their messages"
              value={receipts}
              onChange={setReceipts}
            />
            <SettingRow
              title="Message alerts"
              hint="Get notified about new messages in this demo"
              value={alerts}
              onChange={setAlerts}
            />
          </View>
        ) : (
          <>
            <Text style={styles.sheetTitle}>Past conversations</Text>
            <Text style={styles.sheetBody}>
              Archived conversations with hosts will appear here. This demo has
              no message history.
            </Text>
          </>
        )}
        <GradientButton dark label="Done" onPress={() => setSheet(null)} />
      </BottomSheet>
    </View>
  );
}

function SettingRow({
  title,
  hint,
  value,
  onChange,
}: {
  title: string;
  hint: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <View style={styles.setting}>
      <View style={styles.settingText}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingHint}>{hint}</Text>
      </View>
      <Switch
        accessibilityLabel={title}
        value={value}
        onValueChange={onChange}
        trackColor={{true: colors.textPrimary, false: colors.border}}
      />
    </View>
  );
}
