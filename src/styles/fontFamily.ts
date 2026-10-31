import {Platform} from 'react-native';

const ios = Platform.OS === 'ios';

export default {
  regular: ios ? 'System' : 'sans-serif',
  medium: ios ? 'System' : 'sans-serif-medium',
  bold: ios ? 'System' : 'sans-serif-medium',
};

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

// Matches the native launch screen artwork.
export const splashFont = {
  regular: ios ? 'HelveticaNeue' : 'sans-serif',
  bold: ios ? 'HelveticaNeue-Bold' : 'sans-serif-medium',
};
