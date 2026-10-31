import React, {useEffect, useRef} from 'react';
import {Image, ScrollView, Text, TouchableOpacity} from 'react-native';
import {Category, categories} from '../constants/listings';
import {width} from '../styles/responsiveSize';
import styles from './styles';

type Props = {selected: Category; onSelect: (category: Category) => void};

export default function CategoryChips({selected, onSelect}: Props) {
  const scroll = useRef<React.ComponentRef<typeof ScrollView>>(null);
  const frames = useRef<Record<string, {x: number; width: number}>>({});

  useEffect(() => {
    const frame = frames.current[selected];
    if (!frame) return;
    const target = frame.x + frame.width / 2 - width / 2;
    scroll.current?.scrollTo({x: Math.max(0, target), animated: true});
  }, [selected]);

  return (
    <ScrollView
      ref={scroll}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.chips}
    >
      {categories.map(item => {
        const active = item.id === selected;
        return (
          <TouchableOpacity
            key={item.id}
            accessibilityRole="tab"
            accessibilityLabel={item.label}
            accessibilityState={{selected: active}}
            activeOpacity={0.8}
            onLayout={event => {
              frames.current[item.id] = event.nativeEvent.layout;
            }}
            onPress={() => onSelect(item.id)}
            style={[styles.chip, active && styles.chipActive]}
          >
            <Image
              source={item.icon}
              style={styles.chipIcon}
              resizeMode="contain"
            />
            <Text style={styles.chipText}>{item.label}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
