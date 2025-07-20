import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner, Alert, Button } from "react-bootstrap";
import { getSchemesByBank } from "../../services/bank-service";
import { useLocation, useNavigate } from "react-router-dom";

const BankSchemesPage = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Show success message if redirected with state
    if (location.state?.success) {
      setSuccess(location.state.success);
      // Clear it so it doesn't persist on refresh
      window.history.replaceState({}, document.title);
    }

    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const data = await getSchemesByBank();
      setSchemes(data);
    } catch (err) {
      console.error("Error fetching schemes:", err);
      setError("Failed to load schemes.");
    } finally {
      setLoading(false);
    }
  };

  // Utility to trim description
  const trimDescription = (text, maxLength = 100) => {
    if (!text) return "";
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4 fw-bold">📋 Your Created Schemes</h2>

      {success && (
        <Alert variant="success" className="text-center">{success}</Alert>
      )}

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
          <Spinner animation="border" />
          <span className="ms-2">Loading schemes...</span>
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">{error}</Alert>
      ) : schemes.length === 0 ? (
        <Alert variant="info" className="text-center">No schemes created yet.</Alert>
      ) : (
        <Row>
          {schemes.map((scheme) => (
            <Col md={6} lg={4} key={scheme.id} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{scheme.schemeName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{scheme.schemeType}</Card.Subtitle>
                  <Card.Text>
                    <strong>Tenure:</strong> {scheme.tenure} months<br />
                    <strong>ROI:</strong> {scheme.roi}%<br />
                    <strong>Description:</strong> {trimDescription(scheme.schemeDescription)}
                  </Card.Text>

                  <div className="d-grid">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => navigate(`/bank/edit-scheme/${scheme.id}`)}
                    >
                      ✏️ Edit Scheme
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default BankSchemesPage;
