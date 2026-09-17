export interface BookingInquiry {
  fullName: string;
  phoneNumber: string;
  eventType: string;
  preferredDate: string;
  guestCount: string;
  slotTime: string;
  message: string;
}

export function buildBookingUrl(number: string, inquiry: BookingInquiry): string | null {
  const digits = number.replace(/\D/g, '');
  if (!/^[1-9]\d{7,14}$/.test(digits)) return null;
  const lines = [
    '*Booking inquiry — HS Valley Farmhouse*',
    `Name: ${inquiry.fullName.trim()}`,
    `Phone: ${inquiry.phoneNumber.trim()}`,
    `Occasion: ${inquiry.eventType}`,
    ...(inquiry.preferredDate ? [`Preferred date: ${inquiry.preferredDate}`] : []),
    `Guests: ${inquiry.guestCount}`,
    `Slot: ${inquiry.slotTime}`,
    ...(inquiry.message.trim() ? [`Notes: ${inquiry.message.trim()}`] : []),
    '',
    'Please confirm availability and pricing for our visit.',
  ];
  return `https://wa.me/${digits}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export function localDateToday() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
