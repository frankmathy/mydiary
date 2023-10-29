import create from 'zustand';

type DiaryEntry = {
  date: string;
  entry: string;
};

type DiaryStore = {
  entries: Record<string, DiaryEntry>;
  addEntry: (date: string, entry: DiaryEntry) => void;
};

export const useDiaryStore = create<DiaryStore>((set) => ({
  entries: {},
  addEntry: (date, entry) => set((state) => ({ entries: { ...state.entries, [date]: entry } })),
}));
