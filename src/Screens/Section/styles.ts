import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';
import fontFamily, {fontWeight} from '../../styles/fontFamily';
import {scale, textScale} from '../../styles/responsiveSize';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.white},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: scale(10),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  headerText: {flex: 1, alignItems: 'center', paddingHorizontal: scale(8)},
  spacer: {width: scale(36)},
  title: {
    fontFamily: fontFamily.medium,
    fontWeight: fontWeight.semibold,
    fontSize: textScale(16),
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: scale(2),
    fontFamily: fontFamily.regular,
    fontSize: textScale(12.5),
    color: colors.textSecondary,
  },
  list: {paddingHorizontal: scale(24), paddingTop: scale(20)},
  item: {marginBottom: scale(22)},
  notice: {
    marginBottom: scale(18),
    padding: scale(14),
    borderRadius: scale(12),
    backgroundColor: colors.background,
    fontFamily: fontFamily.regular,
    fontSize: textScale(14),
    lineHeight: textScale(19),
    color: colors.textPrimary,
  },
  empty: {
    marginTop: scale(80),
    textAlign: 'center',
    paddingHorizontal: scale(30),
    fontFamily: fontFamily.regular,
    fontSize: textScale(15),
    lineHeight: textScale(21),
    color: colors.textSecondary,
  },
});
