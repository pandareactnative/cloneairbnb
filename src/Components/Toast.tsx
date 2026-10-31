import React, {useEffect, useRef} from 'react';
import {Animated, Text} from 'react-native';
import Icon from './Icon';
import colors from '../styles/colors';
import {scale} from '../styles/responsiveSize';
import styles from './styles';

type Props = {message: string | null; bottom: number};

export default function Toast({message, bottom}: Props) {
  const progress = useRef(new Animated.Value(0)).current;
  const lastMessage = useRef(message);
  if (message) lastMessage.current = message;

  useEffect(() => {
    Animated.spring(progress, {
      toValue: message ? 1 : 0,
      friction: 9,
      tension: 90,
      useNativeDriver: true,
    }).start();
  }, [message, progress]);

  return (
    <Animated.View
      pointerEvents="none"
      accessibilityLiveRegion="polite"
      style={[
        styles.toast,
        {
          bottom,
          opacity: progress,
          transform: [
            {
              translateY: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [scale(24), 0],
              }),
            },
            {
              scale: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0.9, 1],
              }),
            },
          ],
        },
      ]}
    >
      <Icon
        name="tag"
        size={scale(19)}
        color={colors.white}
        fill={colors.rausch}
        strokeWidth={1.4}
      />
      <Text style={styles.toastText}>{lastMessage.current}</Text>
    </Animated.View>
  );
}
