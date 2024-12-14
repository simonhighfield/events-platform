import { useContext } from 'react'
import { SessionContext } from '../Contexts'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';

export default function EventsFeed ({ events }) {
  const { session } = useContext(SessionContext);  

    return (
      <>
        <Row xs={1} md={2} className="g-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Col key={idx}>
              <Card>
                <Card.Img variant="top" src="holder.js/100px160" />
                <Card.Body>
                  <Card.Title>Event Name</Card.Title>
                  <Card.Text>
                    This is a longer card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>Contributors</ListGroup.Item>
                  <ListGroup.Item>Date</ListGroup.Item>
                  <ListGroup.Item>Location</ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          ))}
        </Row>
        {/* {events.map((event) => {
          return <p>{event.event_name}</p>;
        })} */}
      </>
    );
}