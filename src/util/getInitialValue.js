export default function getInitialValue({ value, defaultValue }) {
  const initialValue = typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  return value !== undefined && value !== null ? value : initialValue;
}
