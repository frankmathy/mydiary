import React, { useState } from 'react'
import { DiaryEntry, useDiaryStore } from './DiaryStore'
import Table from 'react-bootstrap/Table'
import DiaryEntryForm from './DiaryEntryForm'
import { Button, Modal } from 'react-bootstrap'

const DiaryEntryList: React.FC = () => {
    const { entries } = useDiaryStore()
    const [showEntryForm, setShowEntryForm] = useState(false)

    const openEntryForm = () => setShowEntryForm(true)
    const closeEntryForm = () => setShowEntryForm(false)

    const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null)

    const sortedEntries = Object.entries(entries).sort(
        ([dateA], [dateB]) =>
            new Date(dateB).getTime() - new Date(dateA).getTime()
    )

    return (
        <div>
            <h2>Diary Entries</h2>
            <Button
                variant="primary"
                onClick={() => {
                    setSelectedEntry(null) // Clear the selectedEntry to indicate a new entry
                    openEntryForm()
                }}
            >
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
                    {sortedEntries.map(([date, entry]) => (
                        <tr
                            key={date}
                            onClick={() => {
                                setSelectedEntry(entry)
                                openEntryForm()
                            }}
                        >
                            <td>{date}</td>
                            <td
                                dangerouslySetInnerHTML={{
                                    __html: entry.entry,
                                }}
                            />
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showEntryForm} onHide={closeEntryForm} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add Diary Entry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DiaryEntryForm
                        selectedEntry={selectedEntry}
                        onClose={closeEntryForm}
                    />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default DiaryEntryList
