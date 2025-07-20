import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Spinner,
  Alert,
} from 'react-bootstrap';
import { getGrievences } from '../../services/bank-service';

const BankGrievancesPage = () => {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    getGrievences()
      .then((data) => {
        setGrievances(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setErrorMsg('Failed to load grievances.');
        setLoading(false);
      });
  }, []);

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="text-center text-primary mb-4">📋 Grievance Records</h3>

              {loading && (
                <div className="text-center">
                  <Spinner animation="border" variant="primary" />
                </div>
              )}

              {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

              {!loading && grievances.length === 0 && (
                <Alert variant="info">No grievances submitted yet.</Alert>
              )}

              {!loading && grievances.length > 0 && (
                <Table striped bordered hover responsive>
                  <thead className="table-success">
                    <tr>
                      <th>#</th>
                      <th>Farmer</th>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Review</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grievances.map((g, index) => (
                      <tr key={g.id}>
                        <td>{index + 1}</td>
                        <td>{g.farmerDTO?.name || 'N/A'}</td>
                        <td>{g.grievencesDate}</td>
                        <td>{g.grievencesType}</td>
                        <td>{g.grievencesDescription}</td>
                        <td>
                          <span
                            className={`badge ${
                              g.grievencesStatus === 'PENDING'
                                ? 'bg-warning text-dark'
                                : g.grievencesStatus === 'RESOLVED'
                                ? 'bg-success'
                                : 'bg-danger'
                            }`}
                          >
                            {g.grievencesStatus}
                          </span>
                        </td>
                        <td>{g.grievencesReview || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BankGrievancesPage;
