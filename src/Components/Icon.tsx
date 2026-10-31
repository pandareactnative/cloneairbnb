import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
import colors from '../styles/colors';

export type IconName =
  | 'search'
  | 'heart'
  | 'logo'
  | 'message'
  | 'profile'
  | 'arrowRight'
  | 'chevronRight'
  | 'chevronLeft'
  | 'close'
  | 'bell'
  | 'share'
  | 'star'
  | 'nearby'
  | 'plus'
  | 'minus'
  | 'history'
  | 'tag'
  | 'check';

const paths: Record<
  Exclude<IconName, 'logo' | 'search' | 'profile'>,
  string
> = {
  heart:
    'M12 20.6c-5.3-3.6-9.6-7.3-9.6-11.8A5 5 0 0 1 7.4 3.8c1.9 0 3.5 1 4.6 2.6 1.1-1.6 2.7-2.6 4.6-2.6a5 5 0 0 1 5 5c0 4.5-4.3 8.2-9.6 11.8z',
  message:
    'M4.3 4h15.4c1 0 1.8.8 1.8 1.8v10c0 1-.8 1.8-1.8 1.8h-6.2L9 21.3v-3.7H4.3c-1 0-1.8-.8-1.8-1.8v-10C2.5 4.8 3.3 4 4.3 4z',
  arrowRight: 'M4.5 12h15M13.5 6l6 6-6 6',
  chevronRight: 'M9 4.5l7.5 7.5L9 19.5',
  chevronLeft: 'M15 4.5L7.5 12l7.5 7.5',
  close: 'M6 6l12 12M18 6L6 18',
  bell: 'M6.2 16.8v-5.6a5.8 5.8 0 0 1 11.6 0v5.6l1.7 2H4.5l1.7-2zM9.8 21.2h4.4',
  share: 'M12 15V3.5M7.5 8L12 3.5 16.5 8M5 12.5V20h14v-7.5',
  star: 'M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z',
  nearby: 'M20 4L4.5 10.6l6.9 2 2 6.9z',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  history:
    'M4.6 12a7.4 7.4 0 1 0 2.2-5.3L4.3 9.2M4.3 4.6v4.6h4.6M12 8v4.6l3.2 2',
  tag: 'M3.5 12.2V4.5c0-.6.4-1 1-1h7.7l8.3 8.3-8.7 8.7-8.3-8.3zM8 8h.01',
  check: 'M5 12.5l4.5 4.5L19 7.5',
};

const logo =
  'M16 1c2 0 3.46.96 4.75 3.27l.53 1.02 7.5 15.17.71 1.45c.4.89.6 1.64.6 2.42A6.68 6.68 0 0 1 23.42 31c-1.4 0-2.71-.52-4.15-1.6l-.63-.5-.62-.57a17.7 17.7 0 0 1-2.02 1.77A6.33 6.33 0 0 1 12.14 31c-3.7 0-6.13-2.84-6.13-6.38 0-.78.2-1.53.6-2.42l.71-1.45 7.5-15.17.53-1.02C12.54 1.96 14 1 16 1zm0 2c-1.24 0-2.1.6-3.06 2.32l-.47.9L4.97 21.4l-.7 1.41c-.29.67-.42 1.18-.42 1.69a4.38 4.38 0 0 0 4.42 4.5c1.19 0 2.3-.45 3.45-1.3l.53-.42.52-.47-1.33-1.6c-1.98-2.58-3.08-5.1-3.08-7.27C8.36 13.92 11.69 11 16 11s7.64 2.92 7.64 6.95c0 2.16-1.1 4.69-3.08 7.27l-1.33 1.6.52.47.53.42c1.14.85 2.26 1.3 3.45 1.3a4.38 4.38 0 0 0 4.42-4.5c0-.5-.13-1.02-.42-1.7l-.7-1.4-7.5-15.17-.47-.9C18.1 3.6 17.24 3 16 3zm0 10c-3.24 0-5.64 2.06-5.64 4.95 0 1.62.92 3.75 2.72 6.08l.55.7.37.45.46.53L16 26.24c.6-.63 1.19-1.31 1.54-1.73l.55-.7c1.8-2.33 2.72-4.46 2.72-6.08 0-2.89-2.4-4.95-5.64-4.95z';

type Props = {
  name: IconName;
  size?: number;
  color?: string;
  fill?: string;
  strokeWidth?: number;
};

export default function Icon({
  name,
  size = 24,
  color = colors.textPrimary,
  fill = 'none',
  strokeWidth = 1.6,
}: Props) {
  const stroke = {
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  if (name === 'logo') {
    return (
      <Svg width={size} height={size} viewBox="0 0 32 32">
        <Path d={logo} fill={color} />
      </Svg>
    );
  }
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'search' && (
        <>
          <Circle cx={10.5} cy={10.5} r={6.8} fill="none" {...stroke} />
          <Path d="M15.5 15.5l5.2 5.2" {...stroke} />
        </>
      )}
      {name === 'profile' && (
        <>
          <Circle cx={12} cy={12} r={9.6} fill="none" {...stroke} />
          <Circle cx={12} cy={9.6} r={3.6} fill="none" {...stroke} />
          <Path d="M5.6 19c1.4-2.6 3.7-4 6.4-4s5 1.4 6.4 4" {...stroke} />
        </>
      )}
      {name !== 'search' && name !== 'profile' && (
        <Path d={paths[name]} fill={fill} {...stroke} />
      )}
    </Svg>
  );
}
