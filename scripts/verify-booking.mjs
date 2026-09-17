import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildBookingUrl, localDateToday } from '../src/utils/booking.ts';

const inquiry = {
  fullName: '  Ayesha & family  ', phoneNumber: '0310 275 5957', eventType: 'Family Gathering',
  preferredDate: '2026-10-12', guestCount: '45 - 50 Guests', slotTime: 'Night Slot (8:00 PM – 6:00 AM)',
  message: 'Tea & BBQ?\nبچوں کے لیے',
};

test('WhatsApp destination and encoded details preserve the reviewed inquiry', () => {
  const url = new URL(buildBookingUrl('+92 310 275 5957', inquiry));
  assert.equal(url.origin + url.pathname, 'https://wa.me/923102755957');
  const message = url.searchParams.get('text');
  for (const value of [inquiry.fullName.trim(), inquiry.preferredDate, inquiry.guestCount, inquiry.slotTime, inquiry.message]) assert.ok(message.includes(value));
  assert.equal([...url.searchParams].length, 1);
});

test('Optional fields do not produce empty labels or undefined text', () => {
  const message = new URL(buildBookingUrl('923102755957', { ...inquiry, message: ' ', preferredDate: '' })).searchParams.get('text');
  assert.doesNotMatch(message, /Notes:|Preferred date:|undefined/);
});

test('Missing or invalid destinations cannot open a malformed WhatsApp URL', () => {
  for (const value of ['', 'abc', '123', '00123456789', '1234567890123456']) assert.equal(buildBookingUrl(value, inquiry), null);
});

test('Date minimum uses the local calendar date', () => {
  const now = new Date();
  assert.equal(localDateToday(), [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-'));
});
