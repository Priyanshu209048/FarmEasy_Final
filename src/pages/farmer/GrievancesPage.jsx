import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
  Alert,
} from 'react-bootstrap';
import { getAllBanks } from '../../services/bank-service';
import { submitGrievance } from '../../services/farmer-service';

const grievanceTypes = [
  'Loan Delay',
  'Document Issue',
  'Bank Response',
  'Other',
];

const GrievancesPage = () => {
  const [formData, setFormData] = useState({
    grievencesType: '',
    grievencesDescription: '',
    bankId: '',
  });

  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    getAllBanks()
      .then((data) => setBanks(data))
      .catch((error) => console.error('Failed to fetch banks:', error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { grievencesType, grievencesDescription, bankId } = formData;

    if (!grievencesType || !grievencesDescription || !bankId) {
      return setMessage({ type: 'danger', text: 'Please fill in all fields.' });
    }

    setLoading(true);
    try {
      await submitGrievance(formData);
      setMessage({ type: 'success', text: 'Grievance submitted successfully!' });
      setFormData({ grievencesType: '', grievencesDescription: '', bankId: '' });
    } catch (error) {
      console.error(error);
      setMessage({ type: 'danger', text: 'Failed to submit grievance.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg">
            <Card.Body>
              <h3 className="text-success text-center mb-4">📩 Submit Grievance</h3>

              {message.text && (
                <Alert variant={message.type}>{message.text}</Alert>
              )}

              <Form onSubmit={handleSubmit}>
                {/* Grievance Type Dropdown */}
                <Form.Group className="mb-3" controlId="grievencesType">
                  <Form.Label>Grievance Type</Form.Label>
                  <Form.Select
                    name="grievencesType"
                    value={formData.grievencesType}
                    onChange={handleChange}
                  >
                    <option value="">-- Select Type --</option>
                    {grievanceTypes.map((type, idx) => (
                      <option key={idx} value={type}>
                        {type}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* Description */}
                <Form.Group className="mb-3" controlId="grievencesDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="grievencesDescription"
                    placeholder="Describe your issue clearly..."
                    value={formData.grievencesDescription}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Bank Dropdown */}
                <Form.Group className="mb-4" controlId="bankId">
                  <Form.Label>Select Bank</Form.Label>
                  <Form.Select
                    name="bankId"
                    value={formData.bankId}
                    onChange={handleChange}
                  >
                    <option value="">-- Select Bank --</option>
                    {banks.map((bank) => (
                      <option key={bank.id} value={bank.id}>
                        {bank.bankName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* Submit Button */}
                <div className="d-grid">
                  <Button
                    type="submit"
                    variant="success"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Submitting...
                      </>
                    ) : (
                      'Submit Grievance'
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default GrievancesPage;
