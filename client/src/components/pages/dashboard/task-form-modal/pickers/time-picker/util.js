export function to24Hours(hour12Time) {
  const [time, modifier] = hour12Time.split(' ');
  let [hours, minutes] = time.split(':');
  if (hours === '12') {
    hours = '00';
  }
  if (modifier === 'pm') {
    hours = parseInt(hours, 10) + 12;
  }
  return `${hours}:${minutes}`;
}
