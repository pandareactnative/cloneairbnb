import React from 'react';
import {Image, ImageSourcePropType, View} from 'react-native';
import Icon from './Icon';
import colors from '../styles/colors';
import styles from './styles';

type Props = {
  images: ImageSourcePropType[];
  size: number;
  hearts?: boolean;
};

const tilts = ['-9deg', '4deg', '12deg'];
const offsets = [-0.45, 0.02, 0.52];

export default function PhotoStack({images, size, hearts}: Props) {
  const frame = size * 0.06;
  return (
    <View
      style={[styles.photoStack, {width: size * 2.3, height: size * 1.25}]}
      pointerEvents="none"
    >
      {images.slice(0, 3).map((image, index) => (
        <View
          key={index}
          style={[
            styles.stackPhoto,
            {
              width: size,
              height: size,
              padding: frame,
              borderRadius: size * 0.14,
              zIndex: 3 - index,
              transform: [
                {translateX: offsets[index] * size},
                {translateY: index === 1 ? -size * 0.08 : 0},
                {rotate: tilts[index]},
              ],
            },
          ]}
        >
          <Image
            source={image}
            style={[styles.stackImage, {borderRadius: size * 0.1}]}
          />
          {hearts && (
            <View style={styles.stackHeart}>
              <Icon
                name="heart"
                size={size * 0.17}
                color={colors.white}
                fill="rgba(0,0,0,0.45)"
                strokeWidth={2}
              />
            </View>
          )}
        </View>
      ))}
    </View>
  );
}
