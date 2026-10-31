import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Modal,
  PanResponder,
  Pressable,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CircleButton from './CircleButton';
import {height, scale} from '../styles/responsiveSize';
import styles from './styles';

type Props = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  closeButton?: boolean;
};

export default function BottomSheet({
  visible,
  onClose,
  children,
  style,
  closeButton = true,
}: Props) {
  const inset = useSafeAreaInsets();
  const [mounted, setMounted] = useState(visible);
  const progress = useRef(new Animated.Value(0)).current;
  const drag = useRef(new Animated.Value(0)).current;
  const close = useRef(onClose);
  close.current = onClose;

  useEffect(() => {
    if (visible) {
      setMounted(true);
      drag.setValue(0);
      Animated.spring(progress, {
        toValue: 1,
        friction: 10,
        tension: 70,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(progress, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }).start(({finished}) => finished && setMounted(false));
    }
  }, [drag, progress, visible]);

  const pan = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => g.dy > 6 && g.dy > Math.abs(g.dx),
      onPanResponderMove: (_, g) => drag.setValue(Math.max(0, g.dy)),
      onPanResponderRelease: (_, g) => {
        if (g.dy > 110 || g.vy > 1.1) close.current();
        else Animated.spring(drag, {toValue: 0, useNativeDriver: true}).start();
      },
    }),
  ).current;

  return (
    <Modal
      visible={mounted}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.modal}>
        <Animated.View style={[styles.backdrop, {opacity: progress}]}>
          <Pressable
            accessibilityLabel="Dismiss"
            style={styles.fill}
            onPress={onClose}
          />
        </Animated.View>
        <Animated.View
          {...pan.panHandlers}
          accessibilityViewIsModal
          style={[
            styles.sheet,
            {paddingBottom: inset.bottom + scale(16)},
            style,
            {
              transform: [
                {
                  translateY: Animated.add(
                    drag,
                    progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [height, 0],
                    }),
                  ),
                },
              ],
            },
          ]}
        >
          {children}
          {closeButton && (
            <CircleButton
              icon="close"
              label="Close"
              onPress={onClose}
              size={scale(32)}
              iconSize={scale(16)}
              style={styles.sheetClose}
            />
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}
