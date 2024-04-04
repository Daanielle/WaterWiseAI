import React, { useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap'; // Assuming you're using Bootstrap for styling
import * as XLSX from 'xlsx'; // Import the XLSX library for Excel export
import "../TasksList.css"; // Import the CSS file

function TaskManagement() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('');
  const [exported, setExported] = useState(false);

  const handleAddTask = () => {
    const task = { name: newTask, dueDate, status };
    setTasks([...tasks, task]);
    setNewTask('');
    setDueDate('');
    setStatus('');
  };

  const handleExportToExcel = () => {
    const header = ['שם המשימה', 'תאריך יעד', 'סטטוס'];
    const data = tasks.map(task => [task.name, task.dueDate, task.status]);

    const ws = XLSX.utils.aoa_to_sheet([header, ...data]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'רשימת המשימות');
    XLSX.writeFile(wb, 'רשימת_משימות.xlsx');
    setExported(true);
  };

  const handleTaskStatusChange = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = 'בוצעה';
    setTasks(updatedTasks);
  };

  return (
    <div className="task-management-container">
      <h1>ניהול משימות</h1>
      <Form className="task-form">
        <Form.Group controlId="taskName">
          <FormControl type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
          <Form.Label style={{ marginLeft: '10px' }}>שם המשימה</Form.Label>
        </Form.Group>
        <Form.Group controlId="dueDate">
          <FormControl type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          <Form.Label style={{ marginLeft: '10px' }}>תאריך יעד</Form.Label>
        </Form.Group>
        <Form.Group controlId="status">
          <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">בחר סטטוס</option>
            <option value="בעיבוד">בעיבוד</option>
            <option value="בוצעת">בוצעה</option>
          </Form.Control>
          <Form.Label style={{ marginLeft: '10px' }}>סטטוס</Form.Label>
        </Form.Group>
        <Button variant="primary" onClick={handleAddTask}>הוסף משימה</Button>
      </Form>
      <div className="export-btn-container">
        <Button variant="primary" onClick={handleExportToExcel}>ייצא ל-Excel</Button>
      </div>
      <div className="task-list">
        {tasks.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>סטטוס</th>
                                <th>תאריך יעד</th>
                <th>שם המשימה</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.status}</td>
                  <td>{task.dueDate}</td>
                  <td>{task.name}</td>

                  <td>
                    {task.status !== 'בוצעה' && (
                      <Button variant="success" onClick={() => handleTaskStatusChange(index)}>סמן כבוצעה</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>אין משימות להצגה</p>
        )}
        {exported && <p>רשימת המשימות יוצאת ל-Excel!</p>}
      </div>
    </div>
  );
}

export default TaskManagement;
