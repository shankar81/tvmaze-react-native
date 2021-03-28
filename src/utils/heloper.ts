let timeout: any;

// Delays the API call
export const debounce = (func: () => void, delay: number) => {
  clearTimeout(timeout);

  timeout = setTimeout(func, delay);
};

// Parsing date to pass to the API in right format
export function parseDate(date: Date) {
  // Parsing the incoming date
  date = new Date(date);
  if (!date) {
    return '';
  }

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${isZeroNeeded(month)}-${isZeroNeeded(day)}`;
}

// Checks is zero needs to add
// EX. 2 -> 02, 10 -> 10
function isZeroNeeded(num: number) {
  return num < 10 ? `0${num}` : num;
}
