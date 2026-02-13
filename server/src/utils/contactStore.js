import { readFile, writeFile } from 'node:fs/promises';

const messagesFilePath = new URL('../../data/messages.json', import.meta.url);

const ensureArray = (data) => {
  if (Array.isArray(data)) return data;
  return [];
};

export const saveContactMessage = async (payload) => {
  let existing = [];

  try {
    const fileData = await readFile(messagesFilePath, 'utf-8');
    existing = ensureArray(JSON.parse(fileData));
  } catch (error) {
    existing = [];
  }

  const newMessage = {
    id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    ...payload,
    createdAt: new Date().toISOString()
  };

  const updated = [newMessage, ...existing].slice(0, 200);
  await writeFile(messagesFilePath, JSON.stringify(updated, null, 2), 'utf-8');

  return newMessage;
};
