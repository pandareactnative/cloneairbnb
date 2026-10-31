import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';
import fontFamily, {fontWeight} from '../../styles/fontFamily';
import {scale, textScale} from '../../styles/responsiveSize';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.white},
  header: {zIndex: 2, paddingBottom: scale(4)},
  searchPill: {
    height: scale(58),
    marginHorizontal: scale(21),
    marginBottom: scale(10),
    borderRadius: scale(29),
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(9),
    shadowColor: colors.black,
    shadowOpacity: 0.14,
    shadowRadius: scale(12),
    shadowOffset: {width: 0, height: scale(4)},
    elevation: 6,
  },
  searchText: {
    fontFamily: fontFamily.medium,
    fontWeight: fontWeight.semibold,
    fontSize: textScale(14),
    color: colors.textPrimary,
  },
  headerLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  feed: {paddingTop: scale(8), paddingBottom: scale(80)},
  heading: {
    marginTop: scale(16),
    marginBottom: scale(22),
    paddingHorizontal: scale(24),
    fontFamily: fontFamily.medium,
    fontWeight: fontWeight.semibold,
    fontSize: textScale(26),
    color: colors.textPrimary,
  },
});
