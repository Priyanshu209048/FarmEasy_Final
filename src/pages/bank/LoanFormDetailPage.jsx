import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Spinner, Alert, Card, Table } from "react-bootstrap";
import { getLoanFormDetailByFarmerId } from "../../services/bank-service";
import { downloadDocument } from "../../services/farmer-service";

const LoanFormDetailPage = () => {
  const { id } = useParams();
  const [loanForm, setLoanForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloadLoading, setDownloadLoading] = useState({});

  useEffect(() => {
    if (id) {
      fetchLoanForm(id);
    }
  }, [id]);

  const fetchLoanForm = async (id) => {
    setLoading(true);
    try {
      const data = await getLoanFormDetailByFarmerId(id);
      setLoanForm(data);
      setError("");
    } catch {
      setError("Failed to fetch loan form details.");
      setLoanForm(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (documentType) => {
    if (!loanForm || !loanForm.id) return;
    setDownloadLoading((prev) => ({ ...prev, [documentType]: true }));
    try {
      const blob = await downloadDocument(loanForm.id, documentType);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${documentType}_${loanForm.id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch {
      alert(`Failed to download ${documentType} document.`);
    } finally {
      setDownloadLoading((prev) => ({ ...prev, [documentType]: false }));
    }
  };

  if (loading) return (
    <Container className="py-5 text-center">
      <Spinner animation="border" />
      <p>Loading loan form details...</p>
    </Container>
  );

  if (error) return (
    <Container className="py-5">
      <Alert variant="danger">{error}</Alert>
    </Container>
  );

  if (!loanForm) return (
    <Container className="py-5">
      <Alert variant="info">No loan form details available.</Alert>
    </Container>
  );

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center">Loan Form Details</h2>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h5>Personal Information</h5>
          <Table bordered striped responsive>
            <tbody>
              <tr><th>Name</th><td>{loanForm.name || "N/A"}</td></tr>
              <tr><th>Email</th><td>{loanForm.email || "N/A"}</td></tr>
              <tr><th>Contact</th><td>{loanForm.contact || "N/A"}</td></tr>
              <tr><th>Gender</th><td>{loanForm.gender || "N/A"}</td></tr>
              <tr><th>Age</th><td>{loanForm.age || "N/A"}</td></tr>
              <tr><th>CIBIL Score</th><td>{loanForm.cibil || "N/A"}</td></tr>
              <tr><th>Address</th><td>{loanForm.address || "N/A"}</td></tr>
              <tr><th>District</th><td>{loanForm.district || "N/A"}</td></tr>
              <tr><th>State</th><td>{loanForm.state || "N/A"}</td></tr>
              <tr><th>Pin Code</th><td>{loanForm.pinCode || "N/A"}</td></tr>
            </tbody>
          </Table>

          <h5>Identification</h5>
          <Table bordered striped responsive>
            <tbody>
              <tr><th>Aadhaar Number</th><td>{loanForm.aadhaarNumber || "N/A"}</td></tr>
              <tr>
                <th>Aadhaar Document</th>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={downloadLoading.aadhaar}
                    onClick={() => handleDownload("aadhaar")}
                  >
                    {downloadLoading.aadhaar ? "Downloading..." : "Download Aadhaar PDF"}
                  </Button>
                </td>
              </tr>
              <tr><th>PAN Number</th><td>{loanForm.panNumber || "N/A"}</td></tr>
              <tr>
                <th>PAN Document</th>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={downloadLoading.pan}
                    onClick={() => handleDownload("pan")}
                  >
                    {downloadLoading.pan ? "Downloading..." : "Download PAN PDF"}
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>

          <h5>Financial Details</h5>
          <Table bordered striped responsive>
            <tbody>
              <tr><th>Salary</th><td>{loanForm.salary ? `₹${loanForm.salary}` : "N/A"}</td></tr>
              <tr><th>Collateral Type</th><td>{loanForm.collateralType || "N/A"}</td></tr>
              <tr><th>Guarantor Name</th><td>{loanForm.guarantorName || "N/A"}</td></tr>
              <tr><th>Guarantor Contact</th><td>{loanForm.guarantorContact || "N/A"}</td></tr>
              <tr><th>Guarantor Relation</th><td>{loanForm.guarantorRelation || "N/A"}</td></tr>
            </tbody>
          </Table>

          <h5>Land Details</h5>
          <Table bordered striped responsive>
            <tbody>
              <tr><th>Land Amount</th><td>{loanForm.landAmount || "N/A"}</td></tr>
              <tr><th>Khasra Number</th><td>{loanForm.khsraNumber || "N/A"}</td></tr>
              <tr><th>Land Ownership</th><td>{loanForm.landOwnership || "N/A"}</td></tr>
              <tr><th>Soil Type</th><td>{loanForm.soilType || "N/A"}</td></tr>
              <tr><th>Crop Type</th><td>{loanForm.cropType || "N/A"}</td></tr>
              <tr>
                <th>Land Details Document</th>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={downloadLoading.land}
                    onClick={() => handleDownload("land")}
                  >
                    {downloadLoading.land ? "Downloading..." : "Download Land Details PDF"}
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoanFormDetailPage;
