import { useContext } from 'react'
import { SessionContext } from '../Contexts'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

export default function EventsFeed ({ events }) {
  const { session } = useContext(SessionContext);  

    return (
      <>
        <Row xs={1} md={2} className="g-4">
          {events.map((event, idx) => (
            <Col key={idx}>
              <Card>
                <Card.Img variant="top" src={event.event_photo_url} />
                <Card.Body>
                  <Card.Title>{event.event_name}</Card.Title>
                  <Card.Text>
                    {event.description}
                  </Card.Text>
                  <div className="d-grid gap-2">
                    <Button variant="primary" size="lg">
                      More Info + tickets
                    </Button>
                  </div>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  {/* <ListGroup.Item>{event.contributors.length > 0 ? event.contributors : 'n/a'}</ListGroup.Item> */}
                  <ListGroup.Item>{event.event_date}</ListGroup.Item>
                  <ListGroup.Item>{event.location}</ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          ))}
        </Row>
      </>
    );
}