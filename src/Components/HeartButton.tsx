import React, {useRef} from 'react';
import {Animated, StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import Icon from './Icon';
import {useApp} from '../store/AppContext';
import colors from '../styles/colors';
import {scale} from '../styles/responsiveSize';

type Props = {
  id: string;
  title: string;
  size?: number;
  outlineColor?: string;
  emptyFill?: string;
  style?: StyleProp<ViewStyle>;
};

export default function HeartButton({
  id,
  title,
  size = scale(25),
  outlineColor = colors.white,
  emptyFill = 'rgba(0,0,0,0.5)',
  style,
}: Props) {
  const {saved, toggleSaved} = useApp();
  const active = saved.includes(id);
  const pop = useRef(new Animated.Value(1)).current;
  const onPress = () => {
    toggleSaved(id);
    pop.setValue(0.75);
    Animated.spring(pop, {
      toValue: 1,
      friction: 3,
      tension: 160,
      useNativeDriver: true,
    }).start();
  };
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={
        active ? `Remove ${title} from wishlist` : `Save ${title}`
      }
      accessibilityState={{selected: active}}
      hitSlop={10}
      onPress={onPress}
      style={style}
    >
      <Animated.View style={{transform: [{scale: pop}]}}>
        <Icon
          name="heart"
          size={size}
          color={outlineColor}
          fill={active ? colors.favourite : emptyFill}
          strokeWidth={2}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}
