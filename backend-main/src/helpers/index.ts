import crypto from 'crypto';

export function extractTokenFromHeader(bearerString: string): string | null {
  if (bearerString?.startsWith('Bearer ')) {
    return bearerString.split('Bearer ')[1];
  }

  return null;
}

function reverseNumber(num: string) {
  return parseInt(num.toString().split('').reverse().join(''), 10);
}

export function generateUniqueKey(description: string): string {
  return description
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
