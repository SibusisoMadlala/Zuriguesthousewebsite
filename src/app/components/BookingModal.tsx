import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Check, CheckCircle, Users, CalendarDays } from 'lucide-react';
import { differenceInDays, format, addDays } from 'date-fns';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useBooking } from '../contexts/BookingContext';
import { checkBookingAvailability, getUnavailableDates, submitBookingRequest } from '../lib/bookings';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

import standardRoom from '../../assets/images/zuri-bedroom-1.jpeg';
import deluxeRoom from '../../assets/images/zuri-room-interior-1.jpeg';
import kingRoom from '../../assets/images/zuri-bedroom-2.jpeg';

// ── Room catalogue ──────────────────────────────────────────────────────────

const ROOMS = [
  {
    id: 'standard',
    num: '01',
    name: 'Standard En-Suite',
    price: 650,
    features: ['Private en-suite bathroom', 'Comfortable bedding', 'Daily housekeeping'],
    image: standardRoom,
  },
  {
    id: 'deluxe',
    num: '02',
    name: 'Deluxe En-Suite',
    price: 750,
    features: ['Spacious layout', 'Private en-suite', 'Premium amenities', 'Garden view'],
    image: deluxeRoom,
  },
  {
    id: 'king',
    num: '03',
    name: 'King En-Suite',
    price: 985,
    features: ['King-size bed', 'Luxury en-suite', 'Premium amenities', 'Best views'],
    image: kingRoom,
  },
];

// ── Helpers ─────────────────────────────────────────────────────────────────

type RoomId = 'standard' | 'deluxe' | 'king' | '';
type Step = 'room' | 'dates' | 'details' | 'review' | 'confirmed';

interface BookingData {
  room: RoomId;
  checkIn: string;
  checkOut: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  requests: string;
}

const STEPS: { key: Step; label: string }[] = [
  { key: 'room', label: 'Room' },
  { key: 'dates', label: 'Dates' },
  { key: 'details', label: 'Details' },
  { key: 'review', label: 'Review' },
];

function genRef() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return 'ZV-' + Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

// ── Shared sub-components ───────────────────────────────────────────────────

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-white/50 text-[10px] tracking-[0.25em] uppercase mb-2 font-light">
        {label}
      </label>
      {children}
    </div>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = 'text',
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      style={{ colorScheme: 'dark' }}
      className="w-full bg-white/8 border border-white/18 text-white placeholder:text-white/25 px-4 py-3 text-sm font-light focus:outline-none focus:border-white/45 transition-colors disabled:opacity-35"
    />
  );
}

// ── Step 1: Room ─────────────────────────────────────────────────────────────

function StepRoom({
  data,
  setData,
}: {
  data: BookingData;
  setData: React.Dispatch<React.SetStateAction<BookingData>>;
}) {
  return (
    <div className="p-6 lg:p-8">
      <p className="text-white/50 text-[10px] tracking-[0.28em] uppercase mb-6 font-light">
        Select Your Room Type
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {ROOMS.map((room) => {
          const selected = data.room === room.id;
          return (
            <button
              key={room.id}
              onClick={() => setData((p) => ({ ...p, room: room.id as RoomId }))}
              className={`text-left transition-all duration-200 border ${
                selected
                  ? 'border-white bg-white/12'
                  : 'border-white/18 hover:border-white/45 hover:bg-white/5'
              }`}
            >
              {/* Room photo */}
              <div className="h-36 overflow-hidden relative">
                <ImageWithFallback
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
                {selected && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-white flex items-center justify-center">
                    <Check size={14} className="text-[#8C7040]" strokeWidth={2.5} />
                  </div>
                )}
                <div className="absolute bottom-0 left-0 px-2 py-1 bg-[#8C7040]/80">
                  <span className="text-white/60 text-[9px] tracking-widest font-light uppercase">
                    {room.num}
                  </span>
                </div>
              </div>
              {/* Details */}
              <div className="p-4">
                <p
                  className="text-white leading-tight mb-2"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '1.1rem',
                    fontWeight: 500,
                  }}
                >
                  {room.name}
                </p>
                <p
                  className="text-white mb-3"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '1.3rem',
                    fontWeight: 600,
                  }}
                >
                  R{room.price}
                  <span
                    className="text-white/40 text-xs font-light ml-1"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                  >
                    /night
                  </span>
                </p>
                <ul className="space-y-1.5">
                  {room.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-white/50 text-xs font-light">
                      <span className="text-white/25">—</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Step 2: Dates ────────────────────────────────────────────────────────────

function StepDates({
  data,
  setData,
  nights,
  total,
  selectedRoom,
  unavailableCheckInDates,
  unavailableCheckOutDates,
  isLoadingUnavailableDates,
  isCheckingAvailability,
  availabilityMessage,
  isAvailable,
}: {
  data: BookingData;
  setData: React.Dispatch<React.SetStateAction<BookingData>>;
  nights: number;
  total: number;
  selectedRoom: (typeof ROOMS)[number] | undefined;
  unavailableCheckInDates: Date[];
  unavailableCheckOutDates: Date[];
  isLoadingUnavailableDates: boolean;
  isCheckingAvailability: boolean;
  availabilityMessage: string;
  isAvailable: boolean | null;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const parsedCheckIn = data.checkIn ? new Date(`${data.checkIn}T00:00:00`) : undefined;
  const parsedCheckOut = data.checkOut ? new Date(`${data.checkOut}T00:00:00`) : undefined;
  const minCheckoutDate = parsedCheckIn ? addDays(parsedCheckIn, 1) : today;

  return (
    <div className="p-6 lg:p-8 max-w-lg">
      <p className="text-white/50 text-[10px] tracking-[0.28em] uppercase mb-6 font-light">
        Select Your Dates
      </p>

      {/* Selected room reminder */}
      {selectedRoom && (
        <div className="flex items-center gap-3 mb-6 bg-white/8 border border-white/12 px-4 py-3">
          <div className="w-12 h-10 overflow-hidden flex-shrink-0">
            <ImageWithFallback
              src={selectedRoom.image}
              alt={selectedRoom.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-white text-sm font-light">{selectedRoom.name}</p>
            <p className="text-white/50 text-xs font-light">R{selectedRoom.price}/night</p>
          </div>
        </div>
      )}

      <div className="space-y-5">
        <Field label="Check-in Date">
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="w-full bg-white/8 border border-white/18 text-white px-4 py-3 text-sm font-light flex items-center justify-between hover:border-white/45 transition-colors"
                type="button"
              >
                <span>{parsedCheckIn ? format(parsedCheckIn, 'EEE, dd MMM yyyy') : 'Select check-in date'}</span>
                <CalendarDays size={15} className="text-white/45" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 z-[220] bg-[#8C7040] text-white border-white/25"
              align="start"
            >
              <Calendar
                mode="single"
                selected={parsedCheckIn}
                onSelect={(value) => {
                  if (!value) return;
                  const iso = format(value, 'yyyy-MM-dd');
                  setData((p) => ({ ...p, checkIn: iso, checkOut: '' }));
                }}
                disabled={[{ before: today }, ...unavailableCheckInDates]}
                hidden={[{ before: today }, ...unavailableCheckInDates]}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </Field>

        <Field label="Check-out Date">
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="w-full bg-white/8 border border-white/18 text-white px-4 py-3 text-sm font-light flex items-center justify-between hover:border-white/45 transition-colors disabled:opacity-35"
                type="button"
                disabled={!parsedCheckIn}
              >
                <span>{parsedCheckOut ? format(parsedCheckOut, 'EEE, dd MMM yyyy') : 'Select check-out date'}</span>
                <CalendarDays size={15} className="text-white/45" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 z-[220] bg-[#8C7040] text-white border-white/25"
              align="start"
            >
              <Calendar
                mode="single"
                selected={parsedCheckOut}
                onSelect={(value) => {
                  if (!value) return;
                  const iso = format(value, 'yyyy-MM-dd');
                  setData((p) => ({ ...p, checkOut: iso }));
                }}
                disabled={[{ before: minCheckoutDate }, ...unavailableCheckOutDates]}
                hidden={[{ before: minCheckoutDate }, ...unavailableCheckOutDates]}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </Field>

        {/* Nights + total summary */}
        {nights > 0 && (
          <div className="bg-white/8 border border-white/15 px-5 py-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarDays size={14} className="text-white/45" strokeWidth={1.5} />
                <span className="text-white/50 text-xs font-light uppercase tracking-widest">
                  Duration
                </span>
              </div>
              <span className="text-white text-sm font-light">
                {nights} night{nights !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/50 text-xs font-light uppercase tracking-widest">
                Rate
              </span>
              <span className="text-white/70 text-sm font-light">
                R{selectedRoom?.price} × {nights}
              </span>
            </div>
            <div className="border-t border-white/12 pt-3 flex items-center justify-between">
              <span className="text-white/60 text-xs font-light uppercase tracking-widest">
                Estimated Total
              </span>
              <span
                className="text-white"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '1.5rem',
                  fontWeight: 600,
                }}
              >
                R{total.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {data.checkIn && !data.checkOut && (
          <p className="text-white/35 text-xs font-light">Select a check-out date to continue.</p>
        )}

        {isLoadingUnavailableDates && (
          <p className="text-white/45 text-xs font-light">Loading unavailable dates...</p>
        )}

        {isCheckingAvailability && (
          <p className="text-white/45 text-xs font-light">Checking live availability...</p>
        )}

        {!isCheckingAvailability && availabilityMessage && (
          <p className={`text-xs font-light ${isAvailable ? 'text-emerald-200' : 'text-red-200'}`}>
            {availabilityMessage}
          </p>
        )}
      </div>
    </div>
  );
}

// ── Step 3: Details ──────────────────────────────────────────────────────────

function StepDetails({
  data,
  setData,
}: {
  data: BookingData;
  setData: React.Dispatch<React.SetStateAction<BookingData>>;
}) {
  return (
    <div className="p-6 lg:p-8 max-w-lg">
      <p className="text-white/50 text-[10px] tracking-[0.28em] uppercase mb-6 font-light">
        Your Information
      </p>

      <div className="space-y-5">
        <Field label="Full Name *">
          <TextInput
            value={data.name}
            onChange={(v) => setData((p) => ({ ...p, name: v }))}
            placeholder="Your full name"
          />
        </Field>

        <Field label="Email Address *">
          <TextInput
            type="email"
            value={data.email}
            onChange={(v) => setData((p) => ({ ...p, email: v }))}
            placeholder="your@email.com"
          />
        </Field>

        <Field label="Phone Number *">
          <TextInput
            type="tel"
            value={data.phone}
            onChange={(v) => setData((p) => ({ ...p, phone: v }))}
            placeholder="+27 71 234 5678"
          />
        </Field>

        <Field label="Number of Guests">
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <button
                key={n}
                onClick={() => setData((p) => ({ ...p, guests: n }))}
                className={`w-11 h-11 text-sm font-light border transition-colors flex items-center justify-center ${
                  data.guests === n
                    ? 'bg-white/22 border-white text-white'
                    : 'border-white/20 text-white/55 hover:border-white/45 hover:text-white/80'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <p className="text-white/35 text-[10px] font-light mt-2 flex items-center gap-1.5">
            <Users size={11} strokeWidth={1.5} />
            Up to 20 guests total — contact us for larger groups
          </p>
        </Field>

        <Field label="Special Requests (optional)">
          <textarea
            value={data.requests}
            onChange={(e) => setData((p) => ({ ...p, requests: e.target.value }))}
            rows={3}
            placeholder="Dietary requirements, arrival time, special occasions..."
            className="w-full bg-white/8 border border-white/18 text-white placeholder:text-white/25 px-4 py-3 text-sm font-light focus:outline-none focus:border-white/45 transition-colors resize-none"
          />
        </Field>
      </div>
    </div>
  );
}

// ── Step 4: Review ───────────────────────────────────────────────────────────

function StepReview({
  data,
  nights,
  total,
  selectedRoom,
}: {
  data: BookingData;
  nights: number;
  total: number;
  selectedRoom: (typeof ROOMS)[number] | undefined;
}) {
  const checkIn = data.checkIn ? format(new Date(data.checkIn + 'T00:00:00'), 'EEE, dd MMM yyyy') : '';
  const checkOut = data.checkOut ? format(new Date(data.checkOut + 'T00:00:00'), 'EEE, dd MMM yyyy') : '';

  return (
    <div className="p-6 lg:p-8">
      <p className="text-white/50 text-[10px] tracking-[0.28em] uppercase mb-6 font-light">
        Review Your Booking
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Booking summary */}
        <div className="bg-white/8 border border-white/15 overflow-hidden">
          {/* Room image header */}
          {selectedRoom && (
            <div className="h-40 overflow-hidden">
              <ImageWithFallback
                src={selectedRoom.image}
                alt={selectedRoom.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-5 space-y-3">
            <p
              className="text-white"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.2rem',
                fontWeight: 500,
              }}
            >
              {selectedRoom?.name}
            </p>

            <div className="space-y-2 text-xs font-light">
              {[
                ['Check-in', checkIn],
                ['Check-out', checkOut],
                ['Nights', `${nights} night${nights !== 1 ? 's' : ''}`],
                ['Guests', `${data.guests} guest${data.guests !== 1 ? 's' : ''}`],
                ['Rate', `R${selectedRoom?.price}/night`],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-white/45 uppercase tracking-widest text-[10px]">{label}</span>
                  <span className="text-white/80">{value}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/15 pt-3 flex justify-between items-center">
              <span className="text-white/50 text-[10px] uppercase tracking-widest font-light">Total</span>
              <span
                className="text-white"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '1.6rem',
                  fontWeight: 600,
                }}
              >
                R{total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Guest info */}
        <div className="space-y-3">
          <div className="bg-white/8 border border-white/12 p-5 space-y-3">
            <p className="text-white/45 text-[10px] tracking-widest uppercase font-light mb-3">
              Guest Details
            </p>
            <div>
              <p className="text-white text-sm font-light">{data.name}</p>
              <p className="text-white/55 text-xs font-light mt-1">{data.email}</p>
              <p className="text-white/55 text-xs font-light">{data.phone}</p>
            </div>
            {data.requests && (
              <div className="border-t border-white/12 pt-3">
                <p className="text-white/35 text-[10px] uppercase tracking-widest mb-1 font-light">
                  Requests
                </p>
                <p className="text-white/55 text-xs font-light italic">"{data.requests}"</p>
              </div>
            )}
          </div>

          <div className="bg-white/5 border border-white/10 p-4">
            <p className="text-white/35 text-[10px] leading-relaxed font-light">
              This is a booking request. Our team will confirm your reservation via email at{' '}
              <span className="text-white/50">zurivillage.bookings@gmail.com</span> within 24 hours.
              Payment is settled on arrival.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Step 5: Confirmed ────────────────────────────────────────────────────────

function StepConfirmed({
  bookingRef,
  data,
  nights,
  total,
  selectedRoom,
  onClose,
}: {
  bookingRef: string;
  data: BookingData;
  nights: number;
  total: number;
  selectedRoom: (typeof ROOMS)[number] | undefined;
  onClose: () => void;
}) {
  const checkIn = data.checkIn ? format(new Date(data.checkIn + 'T00:00:00'), 'dd MMM yyyy') : '';
  const checkOut = data.checkOut ? format(new Date(data.checkOut + 'T00:00:00'), 'dd MMM yyyy') : '';

  return (
    <div className="p-6 lg:p-10 flex flex-col items-center text-center">
      {/* Icon */}
      <div className="w-16 h-16 border border-white/30 flex items-center justify-center mb-6 mt-4">
        <CheckCircle size={30} strokeWidth={1} className="text-white/80" />
      </div>

      <p className="text-white/45 text-[10px] tracking-[0.35em] uppercase font-light mb-1">
        Booking Request Received
      </p>
      <h3
        className="text-white mb-8"
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '2.5rem',
          fontWeight: 600,
          lineHeight: 0.95,
        }}
      >
        Confirmed
      </h3>

      {/* Reference */}
      <div className="bg-white/10 border border-white/20 px-10 py-5 mb-8 w-full max-w-xs">
        <p className="text-white/40 text-[9px] tracking-[0.35em] uppercase font-light mb-2">
          Booking Reference
        </p>
        <p
          className="text-white tracking-[0.15em]"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '1.8rem',
            fontWeight: 600,
          }}
        >
          {bookingRef}
        </p>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-px bg-white/10 border border-white/10 w-full max-w-sm mb-8 text-center">
        {[
          ['Room', selectedRoom?.name ?? ''],
          ['Stay', `${nights} night${nights !== 1 ? 's' : ''}`],
          ['Total', `R${total.toLocaleString()}`],
        ].map(([label, val]) => (
          <div key={label} className="bg-[#8C7040] px-3 py-4">
            <p className="text-white/40 text-[9px] tracking-widest uppercase font-light mb-1">{label}</p>
            <p className="text-white text-xs font-light">{val}</p>
          </div>
        ))}
      </div>

      <p className="text-white/50 text-xs font-light leading-relaxed max-w-xs mb-1">
        We'll reach out to <span className="text-white/70">{data.email}</span> within 24 hours to
        confirm your stay from <span className="text-white/70">{checkIn}</span> to{' '}
        <span className="text-white/70">{checkOut}</span>.
      </p>
      <p className="text-white/35 text-[10px] font-light mb-10">
        zurivillage.bookings@gmail.com · +27 713 422 547
      </p>

      <button
        onClick={onClose}
        className="relative px-10 py-3.5 text-white text-xs tracking-[0.28em] uppercase font-light hover:bg-white/10 transition-colors"
      >
        <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-white/50" />
        <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-white/50" />
        Return to Site
      </button>
    </div>
  );
}

// ── Main modal ───────────────────────────────────────────────────────────────

export function BookingModal() {
  const { isOpen, closeBooking, initialRoom } = useBooking();

  const [step, setStep] = useState<Step>('room');
  const [data, setData] = useState<BookingData>({
    room: '' as RoomId,
    checkIn: '',
    checkOut: '',
    guests: 2,
    name: '',
    email: '',
    phone: '',
    requests: '',
  });
  const [bookingRef, setBookingRef] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [availabilityMessage, setAvailabilityMessage] = useState('');
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [unavailableCheckInDates, setUnavailableCheckInDates] = useState<Date[]>([]);
  const [unavailableCheckOutDates, setUnavailableCheckOutDates] = useState<Date[]>([]);
  const [isLoadingUnavailableDates, setIsLoadingUnavailableDates] = useState(false);

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setStep('room');
      setBookingRef('');
      setSubmitError('');
      setIsSubmitting(false);
      setIsCheckingAvailability(false);
      setAvailabilityMessage('');
      setIsAvailable(null);
      setUnavailableCheckInDates([]);
      setUnavailableCheckOutDates([]);
      setIsLoadingUnavailableDates(false);
      setData({
        room: (initialRoom as RoomId) || '',
        checkIn: '',
        checkOut: '',
        guests: 2,
        name: '',
        email: '',
        phone: '',
        requests: '',
      });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialRoom]);

  useEffect(() => {
    setAvailabilityMessage('');
    setIsAvailable(null);
  }, [data.room, data.checkIn, data.checkOut, data.guests]);

  useEffect(() => {
    let cancelled = false;

    if (!isOpen || step !== 'dates' || !data.room) {
      setUnavailableCheckInDates([]);
      return () => {
        cancelled = true;
      };
    }

    const loadCheckInUnavailableDates = async () => {
      setIsLoadingUnavailableDates(true);

      try {
        const startDate = format(new Date(), 'yyyy-MM-dd');
        const unavailable = await getUnavailableDates({
          roomId: data.room,
          guests: data.guests,
          startDate,
          daysAhead: 120,
        });

        if (!cancelled) {
          setUnavailableCheckInDates(unavailable.map((d) => new Date(`${d}T00:00:00`)));
        }
      } catch {
        if (!cancelled) {
          setUnavailableCheckInDates([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoadingUnavailableDates(false);
        }
      }
    };

    loadCheckInUnavailableDates();

    return () => {
      cancelled = true;
    };
  }, [isOpen, step, data.room, data.guests]);

  useEffect(() => {
    let cancelled = false;

    if (!isOpen || step !== 'dates' || !data.room || !data.checkIn) {
      setUnavailableCheckOutDates([]);
      return () => {
        cancelled = true;
      };
    }

    const loadCheckOutUnavailableDates = async () => {
      setIsLoadingUnavailableDates(true);

      try {
        const unavailable = await getUnavailableDates({
          roomId: data.room,
          guests: data.guests,
          startDate: data.checkIn,
          daysAhead: 120,
          checkInDate: data.checkIn,
        });

        if (!cancelled) {
          setUnavailableCheckOutDates(unavailable.map((d) => new Date(`${d}T00:00:00`)));
        }
      } catch {
        if (!cancelled) {
          setUnavailableCheckOutDates([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoadingUnavailableDates(false);
        }
      }
    };

    loadCheckOutUnavailableDates();

    return () => {
      cancelled = true;
    };
  }, [isOpen, step, data.room, data.checkIn, data.guests]);

  if (!isOpen) return null;

  const selectedRoom = ROOMS.find((r) => r.id === data.room);

  const nights =
    data.checkIn && data.checkOut
      ? Math.max(0, differenceInDays(new Date(data.checkOut), new Date(data.checkIn)))
      : 0;

  const total = selectedRoom && nights > 0 ? selectedRoom.price * nights : 0;

  const stepIndex = STEPS.findIndex((s) => s.key === step);

  const canProceed = () => {
    if (step === 'room') return !!data.room;
    if (step === 'dates') return !!data.checkIn && !!data.checkOut && nights > 0;
    if (step === 'details') return !!data.name.trim() && !!data.email.trim() && !!data.phone.trim();
    return true;
  };

  const verifyAvailability = async () => {
    if (!selectedRoom || !data.checkIn || !data.checkOut || nights <= 0) {
      return false;
    }

    setIsCheckingAvailability(true);
    setAvailabilityMessage('');

    try {
      const result = await checkBookingAvailability({
        roomId: selectedRoom.id,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        guests: data.guests,
      });

      if (!result.available) {
        setIsAvailable(false);
        setAvailabilityMessage(result.message || 'This room is unavailable for selected dates.');
        return false;
      }

      setIsAvailable(true);
      setAvailabilityMessage(result.message || 'Room is available for your selected dates.');
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to check availability right now.';
      setIsAvailable(false);
      setAvailabilityMessage(message);
      return false;
    } finally {
      setIsCheckingAvailability(false);
    }
  };

  const goNext = async () => {
    if (step === 'dates') {
      const available = await verifyAvailability();
      if (!available) return;
    }

    const order: Step[] = ['room', 'dates', 'details', 'review'];
    const idx = order.indexOf(step as Step);
    if (idx < order.length - 1) setStep(order[idx + 1]);
  };

  const goBack = () => {
    const order: Step[] = ['room', 'dates', 'details', 'review'];
    const idx = order.indexOf(step as Step);
    if (idx > 0) setStep(order[idx - 1]);
  };

  const handleConfirm = async () => {
    if (!selectedRoom || isSubmitting) return;

    const available = await verifyAvailability();
    if (!available) {
      setStep('dates');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    submitBookingRequest({
      roomId: selectedRoom.id,
      roomName: selectedRoom.name,
      roomPrice: selectedRoom.price,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guests: data.guests,
      nights,
      total,
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      requests: data.requests.trim(),
    })
      .then((result) => {
        setBookingRef(result.booking_reference || genRef());
        setStep('confirmed');
      })
      .catch((error) => {
        const message = error instanceof Error ? error.message : 'Unable to submit your booking right now.';
        setSubmitError(message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1A0A04]/88 backdrop-blur-sm"
        onClick={step !== 'confirmed' ? closeBooking : undefined}
      />

      {/* Panel */}
      <div
        className="relative z-10 w-full max-w-3xl max-h-[92vh] flex flex-col bg-[#8C7040] border border-white/15 shadow-2xl"
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        {/* ── Header bar ── */}
        <div className="flex items-center justify-between px-6 lg:px-8 py-4 border-b border-white/15 flex-shrink-0">
          <div>
            <p className="text-white/45 text-[9px] tracking-[0.32em] uppercase font-light">
              Zuri Village Escapes
            </p>
            <h2
              className="text-white mt-0.5"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.4rem',
                fontWeight: 600,
                lineHeight: 1.1,
              }}
            >
              Book Your Stay
            </h2>
          </div>
          <button
            onClick={closeBooking}
            className="text-white/45 hover:text-white/80 transition-colors p-1"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* ── Step indicator ── */}
        {step !== 'confirmed' && (
          <div className="flex items-center px-6 lg:px-8 py-3 border-b border-white/10 flex-shrink-0 bg-[#7A6030]/30">
            {STEPS.map((s, i) => (
              <React.Fragment key={s.key}>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div
                    className={`w-5 h-5 flex items-center justify-center text-[10px] transition-colors ${
                      i < stepIndex
                        ? 'bg-white text-[#8C7040]'
                        : i === stepIndex
                        ? 'border border-white text-white'
                        : 'border border-white/20 text-white/30'
                    }`}
                  >
                    {i < stepIndex ? <Check size={10} strokeWidth={3} /> : i + 1}
                  </div>
                  <span
                    className={`text-[10px] tracking-widest uppercase font-light hidden sm:block transition-colors ${
                      i === stepIndex ? 'text-white' : i < stepIndex ? 'text-white/60' : 'text-white/30'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-px mx-3 transition-colors ${
                      i < stepIndex ? 'bg-white/35' : 'bg-white/12'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* ── Scrollable step content ── */}
        <div className="flex-1 overflow-y-auto">
          {step === 'room' && <StepRoom data={data} setData={setData} />}
          {step === 'dates' && (
            <StepDates
              data={data}
              setData={setData}
              nights={nights}
              total={total}
              selectedRoom={selectedRoom}
              unavailableCheckInDates={unavailableCheckInDates}
              unavailableCheckOutDates={unavailableCheckOutDates}
              isLoadingUnavailableDates={isLoadingUnavailableDates}
              isCheckingAvailability={isCheckingAvailability}
              availabilityMessage={availabilityMessage}
              isAvailable={isAvailable}
            />
          )}
          {step === 'details' && <StepDetails data={data} setData={setData} />}
          {step === 'review' && (
            <StepReview
              data={data}
              nights={nights}
              total={total}
              selectedRoom={selectedRoom}
            />
          )}
          {step === 'confirmed' && (
            <StepConfirmed
              bookingRef={bookingRef}
              data={data}
              nights={nights}
              total={total}
              selectedRoom={selectedRoom}
              onClose={closeBooking}
            />
          )}
        </div>

        {/* ── Footer nav ── */}
        {step !== 'confirmed' && (
          <div className="flex items-center justify-between px-6 lg:px-8 py-4 border-t border-white/15 bg-[#7A6030]/40 flex-shrink-0">
            {stepIndex > 0 ? (
              <button
                onClick={goBack}
                className="flex items-center gap-1.5 text-white/55 hover:text-white/85 text-xs tracking-widest uppercase font-light transition-colors"
              >
                <ChevronLeft size={15} strokeWidth={1.5} />
                Back
              </button>
            ) : (
              <div />
            )}

            {step === 'review' ? (
              <div className="flex flex-col items-end gap-2">
                {submitError && (
                  <p className="text-red-200 text-[11px] font-light max-w-xs text-right">
                    {submitError}
                  </p>
                )}
                <button
                onClick={handleConfirm}
                className="relative px-10 py-3 text-white text-xs tracking-[0.25em] uppercase font-light hover:bg-white/10 transition-colors disabled:opacity-35"
                disabled={!canProceed() || isSubmitting}
              >
                <span className="absolute top-0 left-0 w-5 h-5 border-t border-l border-white/55" />
                <span className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-white/55" />
                {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
                </button>
              </div>
            ) : (
              <button
                onClick={goNext}
                disabled={!canProceed() || isCheckingAvailability || isLoadingUnavailableDates}
                className="flex items-center gap-1.5 text-white/80 hover:text-white text-xs tracking-widest uppercase font-light disabled:opacity-30 transition-colors"
              >
                {isCheckingAvailability
                  ? 'Checking...'
                  : isLoadingUnavailableDates
                  ? 'Loading...'
                  : 'Continue'}
                <ChevronRight size={15} strokeWidth={1.5} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
