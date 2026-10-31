import {Dimensions} from 'react-native';

export const {width, height} = Dimensions.get('window');
// Sizes are measured against the 393 x 852 pt reference recording.
export const scale = (size: number) => (width / 393) * size;
export const verticalScale = (size: number) => (height / 852) * size;
export const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;
export const moderateScaleVertical = (size: number, factor = 0.5) =>
  size + (verticalScale(size) - size) * factor;
export const textScale = (size: number) => moderateScale(size, 0.3);
