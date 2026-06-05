import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function CardsHome({products}) {

  return (
    <>
    {products.map((productos, index) => (
      <Card key={index} style={{ width: '13em', marginBottom: '1em' }}>
        <Card.Img variant="top" src={productos.img} alt={productos.nombre} />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{productos.nombre}</Card.Title>

          <Card.Text >
            {productos.autor}
          </Card.Text>

          <div className="mt-auto">
            <Card.Text>
              ${productos.precio}
            </Card.Text>

            <div className="d-flex">
              <Button as={Link} to={`/item/${productos.id}`} variant="primary">
                Comprar
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    ))}
  </>
  );
}

export default CardsHome;