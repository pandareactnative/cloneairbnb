import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';
import fontFamily, {fontWeight} from '../../styles/fontFamily';
import {scale, textScale} from '../../styles/responsiveSize';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.sea, overflow: 'hidden'},
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: scale(-400),
    paddingBottom: scale(400),
    backgroundColor: colors.white,
    borderTopLeftRadius: scale(26),
    borderTopRightRadius: scale(26),
    shadowColor: colors.black,
    shadowOpacity: 0.12,
    shadowRadius: scale(12),
    shadowOffset: {width: 0, height: -scale(2)},
    elevation: 10,
  },
  handleArea: {alignItems: 'center', paddingVertical: scale(8)},
  handle: {
    width: scale(32),
    height: scale(4),
    borderRadius: scale(2),
    backgroundColor: colors.textSecondary,
  },
  empty: {alignItems: 'center', paddingHorizontal: scale(32)},
  art: {width: scale(290), height: scale(211), marginTop: scale(8)},
  title: {
    marginTop: scale(16),
    fontFamily: fontFamily.medium,
    fontWeight: fontWeight.semibold,
    fontSize: textScale(22),
    color: colors.textPrimary,
  },
  body: {
    marginTop: scale(12),
    textAlign: 'center',
    fontFamily: fontFamily.regular,
    fontSize: textScale(15),
    lineHeight: textScale(20),
    color: colors.textSecondary,
  },
  button: {
    marginTop: scale(22),
    height: scale(47),
    paddingHorizontal: scale(26),
  },
  list: {paddingHorizontal: scale(24), paddingBottom: scale(40)},
  listTitle: {
    fontFamily: fontFamily.medium,
    fontWeight: fontWeight.semibold,
    fontSize: textScale(22),
    color: colors.textPrimary,
    marginVertical: scale(12),
  },
  trip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(14),
    paddingVertical: scale(12),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  tripImage: {width: scale(64), height: scale(64), borderRadius: scale(12)},
  tripText: {flex: 1},
  tripTitle: {
    fontFamily: fontFamily.medium,
    fontWeight: fontWeight.semibold,
    fontSize: textScale(15),
    color: colors.textPrimary,
  },
  tripMeta: {
    marginTop: scale(3),
    fontFamily: fontFamily.regular,
    fontSize: textScale(13),
    color: colors.textSecondary,
  },
  tripDemo: {
    marginTop: scale(3),
    fontFamily: fontFamily.regular,
    fontSize: textScale(12),
    color: colors.success,
  },
});
