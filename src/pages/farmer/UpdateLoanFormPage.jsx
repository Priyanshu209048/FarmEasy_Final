import React, { useEffect, useState } from 'react';
import { Form, Button, Alert, Container, Row, Col, Spinner } from 'react-bootstrap';
import { getLoanFormDetail, updateLoanForm } from '../../services/farmer-service';

const UpdateLoanFormPage = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', contact: '', gender: '', age: '', cibil: '',
    address: '', district: '', state: '', pinCode: '',
    aadhaarNumber: '', panNumber: '',
    salary: '', collateralType: '',
    guarantorName: '', guarantorContact: '', guarantorRelation: '',
    landAmount: '', khsraNumber: '', landOwnership: '',
    soilType: '', cropType: ''
  });

  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [landFile, setLandFile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    getLoanFormDetail()
      .then(data => setFormData(data))
      .catch(() => setMessage({ type: 'danger', text: 'Failed to load loan form details.' }))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === 'aadhaar') setAadhaarFile(file);
    else if (type === 'pan') setPanFile(file);
    else if (type === 'land') setLandFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const formPayload = new FormData();
      formPayload.append("loanFormDTO", JSON.stringify(formData));
      if (aadhaarFile) formPayload.append("aadhaar", aadhaarFile);
      if (panFile) formPayload.append("pan", panFile);
      if (landFile) formPayload.append("land", landFile);

      await updateLoanForm(formPayload);
      setMessage({ type: 'success', text: 'Loan application updated successfully!' });
    } catch (err) {
      setMessage({ type: 'danger', text: 'Failed to update loan application.' });
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) return <Container className="mt-4 text-center"><Spinner animation="border" /></Container>;

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-primary">Update Loan Application</h2>
      {message.text && <Alert variant={message.type}>{message.text}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}><Form.Group className="mb-3"><Form.Label>Name</Form.Label><Form.Control type="text" name="name" value={formData.name} onChange={handleChange} /></Form.Group></Col>
          <Col md={6}><Form.Group className="mb-3"><Form.Label>Email</Form.Label><Form.Control type="email" name="email" value={formData.email} onChange={handleChange} readOnly /></Form.Group></Col>
        </Row>
        <Row>
          <Col md={6}><Form.Group className="mb-3"><Form.Label>Contact</Form.Label><Form.Control type="text" name="contact" value={formData.contact} onChange={handleChange} /></Form.Group></Col>
          <Col md={6}><Form.Group className="mb-3"><Form.Label>Gender</Form.Label><Form.Control type="text" name="gender" value={formData.gender} onChange={handleChange} /></Form.Group></Col>
        </Row>
        <Row>
          <Col md={6}><Form.Group className="mb-3"><Form.Label>Age</Form.Label><Form.Control type="number" name="age" value={formData.age} onChange={handleChange} /></Form.Group></Col>
          <Col md={6}><Form.Group className="mb-3"><Form.Label>CIBIL Score</Form.Label><Form.Control type="number" name="cibil" value={formData.cibil} onChange={handleChange} /></Form.Group></Col>
        </Row>
        <Form.Group className="mb-3"><Form.Label>Address</Form.Label><Form.Control type="text" name="address" value={formData.address} onChange={handleChange} /></Form.Group>
        <Row>
          <Col md={4}><Form.Group className="mb-3"><Form.Label>District</Form.Label><Form.Control type="text" name="district" value={formData.district} onChange={handleChange} /></Form.Group></Col>
          <Col md={4}><Form.Group className="mb-3"><Form.Label>State</Form.Label><Form.Control type="text" name="state" value={formData.state} onChange={handleChange} /></Form.Group></Col>
          <Col md={4}><Form.Group className="mb-3"><Form.Label>Pin Code</Form.Label><Form.Control type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} /></Form.Group></Col>
        </Row>
        <Row>
          <Col md={6}><Form.Group className="mb-3"><Form.Label>Aadhaar Number</Form.Label><Form.Control type="text" name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} /></Form.Group></Col>
          <Col md={6}><Form.Group className="mb-3"><Form.Label>PAN Number</Form.Label><Form.Control type="text" name="panNumber" value={formData.panNumber} onChange={handleChange} /></Form.Group></Col>
        </Row>
        <Form.Group className="mb-3"><Form.Label>Salary</Form.Label><Form.Control type="number" name="salary" value={formData.salary} onChange={handleChange} /></Form.Group>
        <Form.Group className="mb-3"><Form.Label>Collateral Type</Form.Label><Form.Control type="text" name="collateralType" value={formData.collateralType} onChange={handleChange} /></Form.Group>
        <Row>
          <Col md={4}><Form.Group className="mb-3"><Form.Label>Guarantor Name</Form.Label><Form.Control type="text" name="guarantorName" value={formData.guarantorName} onChange={handleChange} /></Form.Group></Col>
          <Col md={4}><Form.Group className="mb-3"><Form.Label>Guarantor Contact</Form.Label><Form.Control type="text" name="guarantorContact" value={formData.guarantorContact} onChange={handleChange} /></Form.Group></Col>
          <Col md={4}><Form.Group className="mb-3"><Form.Label>Guarantor Relation</Form.Label><Form.Control type="text" name="guarantorRelation" value={formData.guarantorRelation} onChange={handleChange} /></Form.Group></Col>
        </Row>
        <Row>
          <Col md={4}><Form.Group className="mb-3"><Form.Label>Land Amount (acres)</Form.Label><Form.Control type="text" name="landAmount" value={formData.landAmount} onChange={handleChange} /></Form.Group></Col>
          <Col md={4}><Form.Group className="mb-3"><Form.Label>Khasra Number</Form.Label><Form.Control type="text" name="khsraNumber" value={formData.khsraNumber} onChange={handleChange} /></Form.Group></Col>
          <Col md={4}><Form.Group className="mb-3"><Form.Label>Ownership</Form.Label><Form.Control type="text" name="landOwnership" value={formData.landOwnership} onChange={handleChange} /></Form.Group></Col>
        </Row>
        <Row>
          <Col md={6}><Form.Group className="mb-3"><Form.Label>Soil Type</Form.Label><Form.Control type="text" name="soilType" value={formData.soilType} onChange={handleChange} /></Form.Group></Col>
          <Col md={6}><Form.Group className="mb-3"><Form.Label>Crop Type</Form.Label><Form.Control type="text" name="cropType" value={formData.cropType} onChange={handleChange} /></Form.Group></Col>
        </Row>
        <Form.Group className="mb-3"><Form.Label>Upload Aadhaar PDF</Form.Label><Form.Control type="file" accept=".pdf" onChange={(e) => handleFileChange(e, 'aadhaar')} /></Form.Group>
        <Form.Group className="mb-3"><Form.Label>Upload PAN PDF</Form.Label><Form.Control type="file" accept=".pdf" onChange={(e) => handleFileChange(e, 'pan')} /></Form.Group>
        <Form.Group className="mb-3"><Form.Label>Upload Land PDF</Form.Label><Form.Control type="file" accept=".pdf" onChange={(e) => handleFileChange(e, 'land')} /></Form.Group>
        <Button type="submit" variant="primary" disabled={submitLoading}>
          {submitLoading ? <><Spinner size="sm" animation="border" /> Updating...</> : 'Update Application'}
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateLoanFormPage;
