import React, {createContext, useCallback, useContext, useState} from 'react';

export type Trip = {
  id: string;
  listingId: string;
  dates: string;
  guests: string;
};

type AppState = {
  saved: string[];
  toggleSaved: (id: string) => void;
  recent: string[];
  viewListing: (id: string) => void;
  trips: Trip[];
  reserve: (listingId: string, dates: string, guests: string) => void;
  wishlistIntroSeen: boolean;
  dismissWishlistIntro: () => void;
};

const Context = createContext<AppState | null>(null);

export function AppProvider({children}: {children: React.ReactNode}) {
  const [saved, setSaved] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [wishlistIntroSeen, setWishlistIntroSeen] = useState(false);

  const toggleSaved = useCallback((id: string) => {
    setSaved(items =>
      items.includes(id) ? items.filter(item => item !== id) : [id, ...items],
    );
  }, []);
  const viewListing = useCallback((id: string) => {
    setRecent(items => [id, ...items.filter(item => item !== id)].slice(0, 12));
  }, []);
  const reserve = useCallback(
    (listingId: string, dates: string, guests: string) => {
      setTrips(items => [
        {id: `${listingId}-${items.length + 1}`, listingId, dates, guests},
        ...items,
      ]);
    },
    [],
  );
  const dismissWishlistIntro = useCallback(
    () => setWishlistIntroSeen(true),
    [],
  );

  return (
    <Context.Provider
      value={{
        saved,
        toggleSaved,
        recent,
        viewListing,
        trips,
        reserve,
        wishlistIntroSeen,
        dismissWishlistIntro,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useApp() {
  const context = useContext(Context);
  if (!context) throw new Error('AppProvider is required');
  return context;
}
