import React, { useState, useEffect } from 'react';
import { Dropdown, Badge, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BellFill } from 'react-bootstrap-icons';
import { getAllNotifications } from '../../services/notification-service';

const FarmerNotificationDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const data = await getAllNotifications();
      setNotifications(data);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Dropdown align="end">
      <Dropdown.Toggle variant="light" id="dropdown-notifications" className="position-relative">
        <OverlayTrigger placement="bottom" overlay={<Tooltip>Notifications</Tooltip>}>
          <span>
            <BellFill size={20} />
            {unreadCount > 0 && (
              <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                {unreadCount}
              </Badge>
            )}
          </span>
        </OverlayTrigger>
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ minWidth: '300px', maxHeight: '400px', overflowY: 'auto' }}>
        {loading ? (
          <div className="text-center p-3">
            <Spinner animation="border" size="sm" /> Loading...
          </div>
        ) : notifications.length === 0 ? (
          <Dropdown.ItemText className="text-muted text-center">No notifications</Dropdown.ItemText>
        ) : (
          notifications.map((notification) => (
            <Dropdown.Item key={notification.id} className="text-wrap">
              <div className="fw-bold">{notification.title || 'Notification'}</div>
              <small>{notification.shortMessage}</small>
              <br />
              <small className="text-muted">
                {new Date(notification.timestamp).toLocaleString()}
              </small>
            </Dropdown.Item>
          ))
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default FarmerNotificationDropdown;
