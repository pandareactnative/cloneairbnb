import React from 'react';
import ReactTestRenderer, {act} from 'react-test-renderer';
import {AppProvider, useApp} from '../src/store/AppContext';
import {dateLabel, guestLabel} from '../src/Screens/Search/Search';

let state: ReturnType<typeof useApp>;
function Probe() {
  state = useApp();
  return null;
}

let app: ReactTestRenderer.ReactTestRenderer;
beforeEach(async () => {
  await act(() => {
    app = ReactTestRenderer.create(
      <AppProvider>
        <Probe />
      </AppProvider>,
    );
  });
});
afterEach(async () => {
  await act(() => app.unmount());
});

test('saving toggles a listing in and out of the wishlist', async () => {
  await act(() => state.toggleSaved('hyd-1'));
  await act(() => state.toggleSaved('gur-1'));
  expect(state.saved).toEqual(['gur-1', 'hyd-1']);
  await act(() => state.toggleSaved('hyd-1'));
  expect(state.saved).toEqual(['gur-1']);
});

test('recently viewed keeps the latest twelve without duplicates', async () => {
  for (let i = 0; i < 14; i += 1) {
    await act(() => state.viewListing(`item-${i}`));
  }
  await act(() => state.viewListing('item-5'));
  expect(state.recent).toHaveLength(12);
  expect(state.recent[0]).toBe('item-5');
  expect(state.recent.filter(id => id === 'item-5')).toHaveLength(1);
});

test('demo reservations are added to trips and the intro can be dismissed', async () => {
  await act(() => state.reserve('hyd-2', 'Nov 6 – 8', '2 guests'));
  expect(state.trips).toEqual([
    {id: 'hyd-2-1', listingId: 'hyd-2', dates: 'Nov 6 – 8', guests: '2 guests'},
  ]);
  expect(state.wishlistIntroSeen).toBe(false);
  await act(() => state.dismissWishlistIntro());
  expect(state.wishlistIntroSeen).toBe(true);
});

test('search summary labels describe dates and guests', () => {
  expect(dateLabel(null, null)).toBe('Add dates');
  expect(dateLabel(new Date(2026, 10, 6), null)).toBe('Nov 6');
  expect(dateLabel(new Date(2026, 10, 6), new Date(2026, 10, 8))).toBe(
    'Nov 6 – 8',
  );
  expect(dateLabel(new Date(2026, 10, 29), new Date(2026, 11, 2))).toBe(
    'Nov 29 – Dec 2',
  );
  expect(guestLabel({adults: 0, children: 0, infants: 0, pets: 0})).toBe(
    'Add guests',
  );
  expect(guestLabel({adults: 2, children: 1, infants: 1, pets: 2})).toBe(
    '3 guests, 1 infant, 2 pets',
  );
});
