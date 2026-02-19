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
}