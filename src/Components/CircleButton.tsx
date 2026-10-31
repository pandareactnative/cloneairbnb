import React from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import Icon, {IconName} from './Icon';
import {scale} from '../styles/responsiveSize';
import styles from './styles';

type Props = {
  icon: IconName;
  label: string;
  onPress: () => void;
  raised?: boolean;
  size?: number;
  iconSize?: number;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

export default function CircleButton({
  icon,
  label,
  onPress,
  raised,
  size = scale(40),
  iconSize = scale(18),
  style,
  children,
}: Props) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={6}
      onPress={onPress}
      style={[
        styles.circleButton,
        raised && styles.circleRaised,
        {width: size, height: size, borderRadius: size / 2},
        style,
      ]}
    >
      {children ?? <Icon name={icon} size={iconSize} strokeWidth={2} />}
    </TouchableOpacity>
  );
}
