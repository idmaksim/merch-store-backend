import { transliterate } from 'transliteration';
import { v4 as uuidv4 } from 'uuid';

async function normalizeString(str: string): Promise<string> {
  return str.trim().toLowerCase();
}

async function appendUuidToUrl(url: string): Promise<string> {
  const uuid = uuidv4();
  return `${url}-${uuid}`;
}

export async function generateUrl(name: string): Promise<string> {
  const transliterated = transliterate(await normalizeString(name));
  const urlFriendly = transliterated
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return appendUuidToUrl(urlFriendly);
}
