import { supabase, supabaseAnonKey, supabaseUrl } from './supabase';

interface BookingRequestPayload {
  roomId: string;
  roomName: string;
  roomPrice: number;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  total: number;
  name: string;
  email: string;
  phone: string;
  requests?: string;
}

interface SubmitBookingApiResponse {
  success: boolean;
  data?: {
    booking_id: string;
    booking_reference: string;
    message: string;
  };
  error?: string;
  details?: string;
  message?: string;
}

interface CheckAvailabilityApiResponse {
  success: boolean;
  data?: {
    available: boolean;
    message: string;
    room_name?: string;
    capacity_adults?: number;
    capacity_children?: number;
  };
  error?: string;
}

interface RoomRow {
  id: string;
  room_name: string;
  room_type: string;
}

const ROOM_TYPE_FALLBACK: Record<string, string[]> = {
  standard: ['standard'],
  deluxe: ['deluxe'],
  king: ['king', 'suite'],
};

const roomUuidCache = new Map<string, string>();

function toIsoDateLocal(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function splitName(fullName: string) {
  const trimmed = fullName.trim();
  const [firstName, ...rest] = trimmed.split(/\s+/);

  return {
    firstName: firstName || trimmed,
    lastName: rest.length > 0 ? rest.join(' ') : 'Guest',
  };
}

async function resolveRoomUuid(roomSlug: string) {
  const slug = roomSlug.trim().toLowerCase();

  const cached = roomUuidCache.get(slug);
  if (cached) return cached;

  const envRoomIdMap: Record<string, string | undefined> = {
    standard: import.meta.env.VITE_SUPABASE_ROOM_STANDARD_ID,
    deluxe: import.meta.env.VITE_SUPABASE_ROOM_DELUXE_ID,
    king: import.meta.env.VITE_SUPABASE_ROOM_KING_ID,
  };

  const envRoomId = envRoomIdMap[slug];
  if (envRoomId) {
    roomUuidCache.set(slug, envRoomId);
    return envRoomId;
  }

  if (!supabase) {
    throw new Error('Booking is temporarily unavailable. Please try again later.');
  }

  const { data, error } = await supabase
    .from('rooms')
    .select('id, room_name, room_type')
    .eq('is_active', true);

  if (error) {
    throw new Error('Unable to resolve room availability right now. Please try again.');
  }

  const rooms = (data || []) as RoomRow[];
  const keywords = ROOM_TYPE_FALLBACK[slug] || [slug];

  const match = rooms.find((room) => {
    const roomType = room.room_type.toLowerCase();
    const roomName = room.room_name.toLowerCase();
    return keywords.some((kw) => roomType.includes(kw) || roomName.includes(kw));
  });

  if (!match) {
    throw new Error('Selected room could not be matched to our booking system. Please contact us directly.');
  }

  roomUuidCache.set(slug, match.id);
  return match.id;
}

async function runAvailabilityCheck(params: {
  roomUuid: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}) {
  const response = await fetch(`${supabaseUrl}/functions/v1/check-availability`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: supabaseAnonKey,
    },
    body: JSON.stringify({
      room_id: params.roomUuid,
      check_in: params.checkIn,
      check_out: params.checkOut,
      num_adults: params.guests,
      num_children: 0,
    }),
  });

  const result = (await response.json()) as CheckAvailabilityApiResponse;

  if (!response.ok || !result.success || !result.data) {
    throw new Error(result.error || 'Unable to check availability right now.');
  }

  return result.data;
}

export async function checkBookingAvailability(payload: {
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}) {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Booking is temporarily unavailable. Please try again later.');
  }

  const roomUuid = await resolveRoomUuid(payload.roomId);
  return runAvailabilityCheck({
    roomUuid,
    checkIn: payload.checkIn,
    checkOut: payload.checkOut,
    guests: payload.guests,
  });
}

export async function getUnavailableDates(payload: {
  roomId: string;
  guests: number;
  startDate: string;
  daysAhead?: number;
  checkInDate?: string;
}) {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Booking is temporarily unavailable. Please try again later.');
  }

  const roomUuid = await resolveRoomUuid(payload.roomId);
  const daysAhead = Math.max(1, Math.min(payload.daysAhead ?? 90, 180));
  const start = new Date(`${payload.startDate}T00:00:00`);

  const checks = Array.from({ length: daysAhead }, (_, i) => {
    const day = new Date(start);
    day.setDate(start.getDate() + i);

    const checkOut = new Date(day);
    checkOut.setDate(day.getDate() + 1);

    const dayIso = toIsoDateLocal(day);
    const checkOutIso = toIsoDateLocal(checkOut);

    if (payload.checkInDate) {
      if (dayIso <= payload.checkInDate) {
        return Promise.resolve({ dayIso, available: false });
      }

      return runAvailabilityCheck({
        roomUuid,
        checkIn: payload.checkInDate,
        checkOut: dayIso,
        guests: payload.guests,
      }).then((result) => ({ dayIso, available: !!result.available }));
    }

    return runAvailabilityCheck({
      roomUuid,
      checkIn: dayIso,
      checkOut: checkOutIso,
      guests: payload.guests,
    }).then((result) => ({ dayIso, available: !!result.available }));
  });

  const settled = await Promise.allSettled(checks);

  return settled
    .map((item) => (item.status === 'fulfilled' ? item.value : null))
    .filter((entry): entry is { dayIso: string; available: boolean } => !!entry)
    .filter((entry) => !entry.available)
    .map((entry) => entry.dayIso);
}

export async function submitBookingRequest(payload: BookingRequestPayload) {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Booking is temporarily unavailable. Please try again later.');
  }

  const roomUuid = await resolveRoomUuid(payload.roomId);
  const { firstName, lastName } = splitName(payload.name);

  const response = await fetch(`${supabaseUrl}/functions/v1/submit-booking`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: supabaseAnonKey,
    },
    body: JSON.stringify({
      room_id: roomUuid,
      room_name: payload.roomName,
      room_price: payload.roomPrice,
      num_adults: payload.guests,
      num_children: 0,
      first_name: firstName,
      last_name: lastName,
      email: payload.email,
      phone: payload.phone,
      country: 'South Africa',
      special_requests: payload.requests || null,
      estimated_nights: payload.nights,
      estimated_total: payload.total,
      check_in: payload.checkIn,
      check_out: payload.checkOut,
    }),
  });

  let result: SubmitBookingApiResponse;

  try {
    result = (await response.json()) as SubmitBookingApiResponse;
  } catch {
    throw new Error('Booking request failed due to an unexpected server response.');
  }

  if (!response.ok || !result.success || !result.data) {
    const detail = result.details || result.message;
    const base = result.error || 'Unable to submit booking request.';
    throw new Error(detail ? `${base} ${detail}` : base);
  }

  return result.data;
}
