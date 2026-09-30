// vocab.ts
export interface VocabItem {
  word: string;
  meaning: string;
  status?: 'correct' | 'wrong' | 'unseen';
}

export const vocabList: VocabItem[] = [
  { word: 'de', meaning: 'the' },
  { word: 'en', meaning: 'and' },
  { word: 'een', meaning: 'a' },
  { word: 'het', meaning: 'it' },
  { word: 'in', meaning: 'in' },
  { word: 'te', meaning: 'too' },
  { word: 'ik', meaning: 'I' },
  { word: 'hebben', meaning: 'to have' },
  { word: 'hij', meaning: 'he' },
  { word: 'niet', meaning: 'not' },
  { word: 'op', meaning: 'on' },
  { word: 'dat', meaning: 'that' },
  { word: 'voor', meaning: 'before' },
  { word: 'er', meaning: 'there' },
  { word: 'je', meaning: 'you' },
  { word: 'zullen', meaning: 'shall' },
  { word: 'kunnen', meaning: 'can, to be able to' },
  { word: 'haar', meaning: 'her' },
  { word: 'of', meaning: 'or' },
  { word: 'wat', meaning: 'what' },
];
