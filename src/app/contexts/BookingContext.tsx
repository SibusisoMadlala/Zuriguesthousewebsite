import React, { createContext, useContext, useState } from 'react';

interface BookingContextValue {
  isOpen: boolean;
  initialRoom: string;
  openBooking: (roomId?: string) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextValue>({
  isOpen: false,
  initialRoom: '',
  openBooking: () => {},
  closeBooking: () => {},
});

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialRoom, setInitialRoom] = useState('');

  const openBooking = (roomId = '') => {
    setInitialRoom(roomId);
    setIsOpen(true);
  };

  const closeBooking = () => setIsOpen(false);

  return (
    <BookingContext.Provider value={{ isOpen, initialRoom, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => useContext(BookingContext);
