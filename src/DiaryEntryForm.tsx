import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import { useDiaryStore } from './DiaryStore';

const DiaryEntryForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {

  const { addEntry } = useDiaryStore();

  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [diaryEntry, setDiaryEntry] = useState<string>('');

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleDiaryEntryChange = (value: string) => {
    setDiaryEntry(value);
  };

  const handleSaveEntry = () => {
    const newEntry = {
        date: selectedDate,
        entry: diaryEntry,
    };

    addEntry(selectedDate, newEntry);  
    onClose();
};

  return (
    <div className="container mt-5">
      <h2>Diary Entry</h2>
      <div className="form-group">
        <label>Date:</label>
        <input type="date" className="form-control" value={selectedDate} onChange={handleDateChange} />
      </div>
      <div className="form-group">
        <label>Diary Entry:</label>
        <ReactQuill
          value={diaryEntry}
          onChange={handleDiaryEntryChange}
          theme="snow"
        />
      </div>
      <div className="form-group">
        <button className="btn btn-primary" onClick={handleSaveEntry}>Save Entry</button>
      </div>
    </div>
  );
};

export default DiaryEntryForm;
