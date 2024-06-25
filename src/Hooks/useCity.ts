export async function useCity(latitude: any, longitude: any) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=en`
  );
  const data = await response.json();
  return data.display_name; // This will return a human-readable address
}
