import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAllSchemes } from "../../services/farmer-service";
import { Container, Card, Spinner, Alert, Button } from "react-bootstrap";

const SchemeDetailsPage = () => {
  const { id } = useParams();
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllSchemes()
      .then((res) => {
        const match = res.find(s => s.id.toString() === id);
        if (!match) {
          setError("Scheme not found");
        } else {
          setScheme(match);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load scheme.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Container className="text-center mt-5"><Spinner animation="border" /></Container>;
  if (error) return <Container className="mt-5"><Alert variant="danger">{error}</Alert></Container>;

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>{scheme.schemeName}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{scheme.bankDTO.bankName}</Card.Subtitle>
          <Card.Text>
            <strong>Type:</strong> {scheme.schemeType}<br />
            <strong>Tenure:</strong> {scheme.tenure}<br />
            <strong>ROI:</strong> {scheme.roi}<br />
            <strong>Description:</strong><br />{scheme.schemeDescription}
          </Card.Text>
          <Link to="/farmer/view-schemes" className="btn btn-outline-primary">← Back to Schemes</Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SchemeDetailsPage;
