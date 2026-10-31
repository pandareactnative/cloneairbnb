import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';
import fontFamily, {fontWeight} from '../../styles/fontFamily';
import {scale, textScale, width} from '../../styles/responsiveSize';

const gap = scale(14);
const tile = Math.floor((width - scale(50) - gap) / 2);
const tileShadow = {
  shadowColor: colors.black,
  shadowOpacity: 0.14,
  shadowRadius: scale(12),
  shadowOffset: {width: 0, height: scale(5)},
  elevation: 4,
};

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.white},
  content: {paddingHorizontal: scale(25), paddingBottom: scale(40)},
  title: {
    marginTop: scale(66),
    marginBottom: scale(22),
    fontFamily: fontFamily.bold,
    fontWeight: fontWeight.bold,
    fontSize: textScale(32),
    color: colors.textPrimary,
  },
  grid: {flexDirection: 'row', flexWrap: 'wrap', gap},
  emptyTile: {
    width: tile,
    height: scale(160),
    borderRadius: scale(20),
    backgroundColor: colors.tile,
    alignItems: 'center',
    justifyContent: 'center',
    ...tileShadow,
  },
  collage: {
    width: tile,
    height: scale(160),
    borderRadius: scale(20),
    overflow: 'hidden',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(2),
    backgroundColor: colors.white,
  },
  collageCell: {
    width: (tile - scale(2)) / 2,
    height: scale(79),
    backgroundColor: colors.surface,
  },
  collageImage: {width: '100%', height: '100%'},
  cover: {
    width: tile,
    height: scale(160),
    borderRadius: scale(20),
    backgroundColor: colors.surface,
  },
  tileTitle: {
    marginTop: scale(9),
    fontFamily: fontFamily.medium,
    fontWeight: fontWeight.medium,
    fontSize: textScale(15),
    color: colors.textPrimary,
  },
  tileCaption: {
    fontFamily: fontFamily.regular,
    fontSize: textScale(13),
    color: colors.textSecondary,
  },
  skeletonTile: {
    width: tile,
    height: scale(160),
    borderRadius: scale(20),
    overflow: 'hidden',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(3),
  },
  skeletonCell: {
    width: (tile - scale(3)) / 2,
    height: scale(78.5),
    backgroundColor: colors.background,
  },
  skeletonLabel: {
    width: scale(120),
    height: scale(10),
    marginTop: scale(12),
    backgroundColor: colors.background,
  },
  sheet: {backgroundColor: colors.cream, paddingTop: scale(16)},
  introArt: {
    alignItems: 'center',
    marginTop: scale(40),
    marginBottom: scale(10),
  },
  introTitle: {
    textAlign: 'center',
    fontFamily: fontFamily.medium,
    fontWeight: fontWeight.semibold,
    fontSize: textScale(26),
    lineHeight: textScale(32),
    color: colors.textPrimary,
    paddingHorizontal: scale(28),
  },
  introBody: {
    marginTop: scale(16),
    marginBottom: scale(52),
    textAlign: 'center',
    fontFamily: fontFamily.regular,
    fontSize: textScale(15),
    lineHeight: textScale(21),
    color: colors.textPrimary,
    paddingHorizontal: scale(6),
  },
});
