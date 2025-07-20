import React, { useEffect, useState } from 'react';
import { Table, Button, Alert, Spinner, Container, Badge, Form } from 'react-bootstrap';
import { getApplyStatusByBank, updateApplyStatus } from '../../services/bank-service';
import { useNavigate } from 'react-router-dom';  // import useNavigate

const ApplyRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState('');
  const [reviews, setReviews] = useState({}); // To store review for each request
  const navigate = useNavigate(); // initialize navigate

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await getApplyStatusByBank();
      setRequests(res || []);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewChange = (requestId, value) => {
    setReviews({ ...reviews, [requestId]: value });
  };

  const statusMap = {
    APPROVED: 1,
    REJECTED: 2,
  };

  const handleAction = async (requestId, statusStr) => {
    const status = statusMap[statusStr];
    const review = reviews[requestId] || "";

    try {
      await updateApplyStatus(requestId, { status, review });
      setActionMsg(`Request ${statusStr.toLowerCase()} successfully.`);
      fetchRequests();
      setTimeout(() => setActionMsg(''), 3000);
    } catch (error) {
      console.error(`Failed to ${statusStr.toLowerCase()} request`, error);
    }
  };

  // New function to handle redirection
  const handleViewForm = (farmerId) => {
    navigate(`/bank/loan-form/${farmerId}`);
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center fw-bold">Loan Applications</h2>

      {actionMsg && <Alert variant="success">{actionMsg}</Alert>}

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Loading applications...</p>
        </div>
      ) : requests.length === 0 ? (
        <Alert variant="info">No loan applications found.</Alert>
      ) : (
        <div className="table-responsive">
          <Table bordered hover responsive className="shadow-sm">
            <thead className="table-secondary">
              <tr>
                <th>#</th>
                <th>Farmer Name</th>
                <th>Loan Form</th>
                <th>Scheme</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Review</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, index) => (
                <tr key={req.id}>
                  <td>{index + 1}</td>
                  <td>{req.farmerDTO?.name || 'N/A'}</td>
                  <td>
                    {req.farmerDTO?.id ? (
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => handleViewForm(req.farmerDTO.id)}  // navigate on click
                      >
                        View Form
                      </Button>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td>{req.schemeDTO?.schemeName || 'N/A'}</td>
                  <td>₹{req.amount}</td>
                  <td>
                    <Badge
                      bg={
                        req.status === 'PENDING'
                          ? 'warning'
                          : req.status === 'APPROVED'
                          ? 'success'
                          : 'danger'
                      }
                    >
                      {req.status}
                    </Badge>
                  </td>
                  <td>
                    {req.status === 'PENDING' ? (
                      <Form.Control
                        type="text"
                        placeholder="Enter review..."
                        value={reviews[req.id] || ''}
                        onChange={(e) => handleReviewChange(req.id, e.target.value)}
                      />
                    ) : (
                      req.review || '-'
                    )}
                  </td>
                  <td>
                    {req.status === 'PENDING' && (
                      <>
                        <Button
                          variant="success"
                          size="sm"
                          className="me-2"
                          onClick={() => handleAction(req.id, 'APPROVED')}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleAction(req.id, 'REJECTED')}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default ApplyRequestsPage;
