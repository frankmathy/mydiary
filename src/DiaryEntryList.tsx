import React, { useState } from 'react';
import { useDiaryStore } from './DiaryStore';
import Table from 'react-bootstrap/Table';
import DiaryEntryForm from './DiaryEntryForm';
import { Button, Modal } from 'react-bootstrap';

const DiaryEntryList: React.FC = () => {
  const { entries } = useDiaryStore();
  const [showEntryForm, setShowEntryForm] = useState(false);

  const openEntryForm = () => setShowEntryForm(true);
  const closeEntryForm = () => setShowEntryForm(false);
  
  return (
    <div>
      <h2>Diary Entries</h2>
          <Button variant="primary" onClick={openEntryForm}>
        Add Entry
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Diary Entry</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(entries).map(([date, entry]) => (
            <tr key={date}>
              <td>{date}</td>
              <td dangerouslySetInnerHTML={{ __html: entry.entry }} />
            </tr>
          ))}
        </tbody>
      </Table>

    <Modal show={showEntryForm} onHide={closeEntryForm} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Diary Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DiaryEntryForm onClose={closeEntryForm}/>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DiaryEntryList;
