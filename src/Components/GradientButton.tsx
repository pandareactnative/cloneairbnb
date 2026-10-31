import React from 'react';
import {StyleProp, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import GradientBackground from './GradientBackground';
import Icon, {IconName} from './Icon';
import colors from '../styles/colors';
import {scale} from '../styles/responsiveSize';
import styles from './styles';

type Props = {
  label: string;
  onPress: () => void;
  icon?: IconName;
  dark?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function GradientButton({
  label,
  onPress,
  icon,
  dark,
  disabled,
  style,
}: Props) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{disabled}}
      activeOpacity={0.85}
      disabled={disabled}
      onPress={onPress}
      style={[styles.gradientButton, dark && styles.darkButton, style]}
    >
      {!dark && (
        <GradientBackground
          horizontal
          colors={[colors.rauschStart, colors.rauschEnd]}
        />
      )}
      <View style={styles.gradientContent}>
        {icon && (
          <Icon
            name={icon}
            size={scale(18)}
            color={colors.white}
            strokeWidth={2.2}
          />
        )}
        <Text style={styles.gradientLabel}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}
