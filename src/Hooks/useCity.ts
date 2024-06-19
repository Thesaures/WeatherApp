export async function reverseGeocode(latitude: any, longitude: any) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
  );
  const data = await response.json();
  return data.display_name; // This will return a human-readable address
}
