import { type ClassValue, clsx } from 'clsx';
import { google } from 'googleapis';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getGooglePlaceData = async () => {
  const places = google.places({
    version: 'v1',
    auth: process.env.GOOGLE_PLACES_API_KEY,
  });
  const place = await places.places.get({
    name: `places/${process.env.GOOGLE_PLACE_ID}`,
    fields: 'reviews,rating',
  });

  return place.data;
};
