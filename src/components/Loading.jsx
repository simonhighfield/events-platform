import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

export default function Loading() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100%' }}
    >
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  );
}
