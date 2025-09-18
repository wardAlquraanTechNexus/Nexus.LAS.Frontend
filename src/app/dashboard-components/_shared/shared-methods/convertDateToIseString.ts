function convertDateToIsoString(date: any): string | null {
  if (!date) return null;
  return new Date(date).toISOString().split('T')[0];
}