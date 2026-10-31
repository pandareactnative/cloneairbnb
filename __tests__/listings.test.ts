import {
  feeds,
  formatPrice,
  listingById,
  listings,
  priceLine,
  searchDestinations,
  searchListings,
} from '../src/constants/listings';
import {clamp, shouldCollapse} from '../src/constants/gestures';

test('every feed section points at existing listings', () => {
  Object.values(feeds)
    .flat()
    .forEach(item => {
      if (item.type !== 'section') return;
      expect(item.listingIds.length).toBeGreaterThan(0);
      item.listingIds.forEach(id => expect(listingById(id)).toBeDefined());
    });
});

test('listing ids are unique', () => {
  const ids = listings.map(item => item.id);
  expect(new Set(ids).size).toBe(ids.length);
});

test('prices use rupee grouping and kind-specific wording', () => {
  expect(formatPrice(160829)).toBe('₹160,829');
  expect(formatPrice(786)).toBe('₹786');
  const home = listings.find(item => item.kind === 'home')!;
  const experience = listings.find(item => item.kind === 'experience')!;
  expect(priceLine(home)).toBe(`${formatPrice(home.price)} ${home.unit}`);
  expect(priceLine(experience).startsWith('From ₹')).toBe(true);
});

test('destination search shows suggestions, filters by name and hides nearby', () => {
  expect(searchDestinations('  ').map(item => item.id)[0]).toBe('nearby');
  expect(searchDestinations('').length).toBe(4);
  const goa = searchDestinations('GOA');
  expect(goa.length).toBeGreaterThan(0);
  goa.forEach(item => expect(item.name.toLowerCase()).toContain('goa'));
  expect(searchDestinations('near')).toHaveLength(0);
  expect(searchDestinations('zzz')).toHaveLength(0);
});

test('listing search filters by kind and optional city', () => {
  const homes = searchListings(undefined, 'home');
  expect(homes.every(item => item.kind === 'home')).toBe(true);
  const city = homes[0].city;
  const inCity = searchListings(city, 'home');
  expect(inCity.length).toBeGreaterThan(0);
  expect(inCity.every(item => item.city === city)).toBe(true);
});

test('sheet gestures clamp and snap to the nearest resting point', () => {
  expect(clamp(-20, 0, 300)).toBe(0);
  expect(clamp(420, 0, 300)).toBe(300);
  expect(shouldCollapse(200, 0, 300)).toBe(true);
  expect(shouldCollapse(100, 0, 300)).toBe(false);
  expect(shouldCollapse(40, 1.2, 300)).toBe(true);
  expect(shouldCollapse(260, -1.2, 300)).toBe(false);
});
