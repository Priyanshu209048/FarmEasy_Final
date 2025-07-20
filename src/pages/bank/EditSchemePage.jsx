import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSchemeById, updateScheme } from "../../services/bank-service";
import { Form, Button, Container, Spinner, Alert, Card } from "react-bootstrap";

const EditSchemePage = () => {
  const { id } = useParams(); // Get scheme ID from URL
  const navigate = useNavigate();
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchScheme = async () => {
      try {
        const data = await getSchemeById(id);
        setScheme(data);
      } catch (err) {
        setError("Failed to fetch scheme details.");
      } finally {
        setLoading(false);
      }
    };

    fetchScheme();
  }, [id]);

  const handleChange = (e) => {
    setScheme({ ...scheme, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setSaving(true);
    try {
        const { id: _, ...schemeDataWithoutId } = scheme;
        await updateScheme(id, schemeDataWithoutId);
        setSuccess("Scheme updated successfully!");
        
        // Delay before redirecting
        setTimeout(() => {
        navigate("/bank/my-schemes");
        }, 1500); // 1.5 seconds
    } catch (err) {
        setError("Failed to update scheme.");
    } finally {
        setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading scheme details...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger" className="text-center mt-4">{error}</Alert>;
  }

  return (
    <Container className="py-5">
      <Card className="shadow-sm p-4">
        <h3 className="text-center mb-4">✏️ Edit Scheme</h3>

        {success && (
            <Alert variant="success" className="text-center">
                {success}
            </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Scheme Name</Form.Label>
            <Form.Control
              type="text"
              name="schemeName"
              value={scheme.schemeName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Scheme Type</Form.Label>
            <Form.Control
              type="text"
              name="schemeType"
              value={scheme.schemeType}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tenure (months)</Form.Label>
            <Form.Control
              type="number"
              name="tenure"
              value={scheme.tenure}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Rate of Interest (ROI %)</Form.Label>
            <Form.Control
              type="number"
              name="roi"
              value={scheme.roi}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="schemeDescription"
              rows={3}
              value={scheme.schemeDescription}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-grid">
            <Button variant="primary" type="submit" disabled={saving}>
              {saving ? "Saving..." : "Update Scheme"}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default EditSchemePage;
