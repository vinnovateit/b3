/**
 * Generates a unique alphanumeric string of length six 
 * Total possible codes 36 ^ 6
 * @returns String
 * 
 */
export function generateTeamCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}
