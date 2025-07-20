import React, { useEffect, useState } from 'react';
import { Container, Table, Spinner, Alert, Badge } from 'react-bootstrap';
import { getApplyStatus } from '../../services/farmer-service';

const ApplyStatusPage = () => {
  const [statusList, setStatusList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getApplyStatus()
      .then(data => setStatusList(data || []))
      .catch(err => {
        console.error(err);
        setError('Failed to load application status.');
      })
      .finally(() => setLoading(false));
  }, []);

  // Maps integer or string status codes to status labels
  const getStatusLabel = (statusCode) => {
    const map = {
      0: 'PENDING',
      1: 'APPROVED',
      2: 'REJECTED',
      3: 'DEACTIVATED',
      4: 'PAID',
      5: 'SUCCESS',
      6: 'FAILED',
      7: 'COMPLETED',
      8: 'DELIVERED',
    };
    const code = typeof statusCode === 'string' && !isNaN(statusCode)
      ? parseInt(statusCode)
      : statusCode;
    return map[code] || statusCode?.toString().toUpperCase() || 'UNKNOWN';
  };

  // Maps status label to Bootstrap badge variants
  const getStatusVariant = (label) => {
    switch (label) {
      case 'APPROVED': return 'success';
      case 'REJECTED': return 'danger';
      case 'PENDING': return 'warning';
      case 'PAID':
      case 'SUCCESS':
      case 'COMPLETED':
      case 'DELIVERED': return 'primary';
      case 'FAILED': return 'danger';
      case 'DEACTIVATED': return 'secondary';
      default: return 'dark';
    }
  };

  // Formats ISO date string to readable format
  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Container className="mt-4">
      <h3 className="text-primary mb-4">📄 My Application Status</h3>

      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : statusList.length === 0 ? (
        <Alert variant="info">You haven’t applied for any scheme yet.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Scheme</th>
              <th>Bank</th>
              <th>Amount</th>
              <th>Applied On</th>
              <th>Status</th>
              <th>Reviewed On</th>
              <th>Review Comment</th>
            </tr>
          </thead>
          <tbody>
            {statusList.map((item, index) => {
              const statusLabel = getStatusLabel(item.status);

              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.schemeDTO?.schemeName || 'N/A'}</td>
                  <td>{item.bankDTO?.bankName || 'N/A'}</td>
                  <td>₹{item.amount}</td>
                  <td>{formatDate(item.date)}</td>
                  <td>
                    <Badge bg={getStatusVariant(statusLabel)}>
                      {statusLabel}
                    </Badge>
                  </td>
                  <td>
                    {statusLabel === 'PENDING'
                      ? 'Not reviewed yet'
                      : formatDate(item.statusDate)}
                  </td>
                  <td>{item.review || '—'}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ApplyStatusPage;
