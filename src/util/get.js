/**
 * Simple version of _.get() to avoid the mostly useless dependency
 */
export default function get(object, field) {
  if (!object || !field) {
    return null;
  }

  const parts = field.split('.');
  return parts.reduce((acc, part) => acc && acc[part], object);
}
