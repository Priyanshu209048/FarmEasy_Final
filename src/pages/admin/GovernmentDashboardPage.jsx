import React, { useEffect, useState } from 'react';
import {
  Container, Table, Button, Form, Spinner, Alert
} from 'react-bootstrap';
import {
  getAllGrievances,
  updateGrievance
} from '../../services/gov-service';

const statusOptions = ['PENDING', 'IN_PROGRESS', 'RESOLVED'];
const reviewOptions = ['-', 'Under Review', 'Needs Action', 'Reviewed'];

const GovernmentDashboardPage = () => {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [updatingId, setUpdatingId] = useState(null); // optional improvement

  useEffect(() => {
    fetchGrievances();
  }, []);

  const fetchGrievances = async () => {
    try {
      const data = await getAllGrievances();
      setGrievances(data);
    } catch (err) {
      console.error('Error loading grievances:', err);
      setMessage('Failed to load grievances.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (id, field, value) => {
    setGrievances(prev =>
      prev.map(g => (g.id === id ? { ...g, [field]: value } : g))
    );
  };

  const handleUpdate = async (id) => {
    const grievance = grievances.find(g => g.id === id);
    setUpdatingId(id);
    try {
      await updateGrievance(id, {
        status: grievance.grievencesStatus,
        review: grievance.grievencesReview
      });
      setMessage('Grievance updated successfully.');
    } catch (err) {
      console.error(err);
      setMessage('Update failed.');
    } finally {
      setUpdatingId(null);
    }
  };

  // Auto-clear alert after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">📊 Government Grievance Dashboard</h2>

      {message && <Alert variant="info">{message}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : grievances.length === 0 ? (
        <Alert variant="warning" className="text-center">
          No grievances found.
        </Alert>
      ) : (
        <Table striped bordered responsive hover>
          <thead>
            <tr>
              <th>Farmer</th>
              <th>Bank</th>
              <th>Date</th>
              <th>Type</th>
              <th>Description</th>
              <th>Status</th>
              <th>Review</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {grievances.map(g => (
              <tr key={g.id}>
                <td>{g.farmerDTO?.name}</td>
                <td>{g.bankDTO?.bankName}</td>
                <td>{g.grievencesDate}</td>
                <td>{g.grievencesType}</td>
                <td>{g.grievencesDescription}</td>
                <td>
                  <Form.Select
                    value={g.grievencesStatus}
                    onChange={(e) =>
                      handleChange(g.id, 'grievencesStatus', e.target.value)
                    }
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </Form.Select>
                </td>
                <td>
                  <Form.Select
                    value={g.grievencesReview}
                    onChange={(e) =>
                      handleChange(g.id, 'grievencesReview', e.target.value)
                    }
                  >
                    {reviewOptions.map(rev => (
                      <option key={rev} value={rev}>
                        {rev}
                      </option>
                    ))}
                  </Form.Select>
                </td>
                <td>
                  <Button
                    size="sm"
                    variant="primary"
                    disabled={updatingId === g.id}
                    onClick={() => handleUpdate(g.id)}
                  >
                    {updatingId === g.id ? 'Saving...' : 'Save'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default GovernmentDashboardPage;
