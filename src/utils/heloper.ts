let timeout: any;

// Delays the API call
export const debounce = (func: () => void, delay: number) => {
  clearTimeout(timeout);

  timeout = setTimeout(func, delay);
};
