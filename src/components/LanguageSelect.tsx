'use client';

import { Select } from '@/components/ui';

interface LanguageSelectProps {
  language: 'en' | 'pt';
  setLanguage: (lang: 'en' | 'pt') => void;
}

export function LanguageSelect({ language, setLanguage }: LanguageSelectProps) {
  return (
    <Select
      value={language}
      onChange={(e) => setLanguage(e.target.value as 'en' | 'pt')}
    >
      <option value="en">English</option>
      <option value="pt">Português</option>
    </Select>
  );
}
