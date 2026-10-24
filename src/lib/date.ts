/* Date formatting for the notes.
 *
 * The content rules set the house format as "14 March 2026": day first, month
 * spelled out, no ordinal suffix, no comma. That is the South African
 * convention and it removes the 03/04 ambiguity that a numeric date carries
 * between SA and US readers.
 *
 * en-ZA is passed explicitly rather than relying on the build machine's
 * locale, so the output does not change depending on who runs the build.
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-ZA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
