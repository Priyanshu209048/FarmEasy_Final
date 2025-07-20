import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import farmerDashboardImg from '../../assets/images/farmer-dashboard.jpg';
import '../../assets/styles/FarmerDashboard.css';
import FarmerNotificationDropdown from './FarmerNotificationDropdown'; // Import notification

const FarmerDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleGrievance = () => {
    setShowModal(false);
    navigate('/farmer/grievances');
  };

  const renderTooltip = (message) => <Tooltip>{message}</Tooltip>;

  return (
    <Container className="dashboard-container">
      <Row>
        <Col className="d-flex justify-content-end">
          <FarmerNotificationDropdown />
        </Col>
      </Row>

      {/* Welcome Text */}
      <Row className="mt-4">
        <Col className="text-center">
          <h1 className="text-primary fw-bold">Welcome to Farmer Dashboard</h1>
          <p className="text-secondary fs-5">Manage your farm activities with ease.</p>
        </Col>
      </Row>

      <Row className="mb-4 w-100 justify-content-center">
        <Col xs={12} md={10} lg={6} xl={5}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="card-custom">
              <Card.Img
                variant="top"
                src={farmerDashboardImg}
                alt="Farmer Dashboard"
                className="card-img-top"
              />
              <Card.Body className="text-center">
                <Card.Text className="mb-4">
                  Select an action below to get started.
                </Card.Text>
                <div className="d-grid gap-3">

                  <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip('Check available government schemes')}
                  >
                    <Link to="/farmer/view-schemes">
                      <Button variant="success" size="lg" className="w-100">
                        Apply Scheme
                      </Button>
                    </Link>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip('Submit loan application')}
                  >
                    <Link to="/farmer/loan-form">
                      <Button variant="primary" size="lg" className="w-100">
                        Loan Form
                      </Button>
                    </Link>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip('Report any issue or complaint')}
                  >
                    <Button
                      variant="warning"
                      size="lg"
                      className="w-100"
                      onClick={() => setShowModal(true)}
                    >
                      Raise Grievance
                    </Button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip('View your loan form details')}
                  >
                    <Link to="/farmer/view-loan-form" className="w-100" style={{ textDecoration: 'none' }}>
                      <Button variant="secondary" size="lg" className="w-100">
                        View Loan Form
                      </Button>
                    </Link>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip('Edit your submitted loan form')}
                  >
                    <div className="d-grid">
                      <Link to="/farmer/update-loan-form" className="btn btn-dark btn-lg w-100">
                        Update Loan Form
                      </Link>
                    </div>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip('Check status of scheme applications')}
                  >
                    <Link to="/farmer/apply-status">
                      <Button variant="info" size="lg" className="w-100">
                        View Scheme Apply Status
                      </Button>
                    </Link>
                  </OverlayTrigger>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to raise a grievance?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleGrievance}>
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default FarmerDashboard;
