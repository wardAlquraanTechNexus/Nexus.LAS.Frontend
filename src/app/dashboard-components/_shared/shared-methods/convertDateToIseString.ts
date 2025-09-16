function convertDateToIsoString(date: any): string | null {
    debugger;
  if (!date) return null;
  return new Date(date).toISOString().split('T')[0];
}