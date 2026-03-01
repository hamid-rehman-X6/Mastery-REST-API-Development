/**
 * @copyright 2026 HamidRehman
 * @license Apache-2.0
 */

/**
 * Generate a random username (e.g user-abc123)
 */
export const generateRandomUserName = (): string => {
  const userPrefix = 'user-';
  const randomChars = Math.random().toString(36).slice(2);

  const username = userPrefix + randomChars;

  return username;
};

/**
 *  Generate a slug from a given title (e.g "Hello World" -> "hello-world")
 * @param title
 */
export const genSlug = (title: string): string => {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]\s-/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  const randomChars = Math.random().toString(36).slice(2);
  const uniqueSlug = `${slug}-${randomChars}`;

  return uniqueSlug;
};
