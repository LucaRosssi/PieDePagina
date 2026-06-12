import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import ProductImage from './SkeletonImage'

function CardsHome({products}) {
  return (
    <>
    {products.map((product) => (
      <Card key={product.id} style={{ width: '13em', marginBottom: '1em' }} className="card-home">
        <ProductImage
            src={product.img}
            alt={product.nombre}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{product.nombre}</Card.Title>

          <Card.Text >
            {product.autor}
          </Card.Text>

          <div className="mt-auto price">
            <Card.Text>
              ${product.precio} 
              {/* .toLocaleString("es-AR") //Rompe PRODUCTS*/} 
            </Card.Text>

            <div className="d-flex">
              <Button as={Link} to={`/item/${product.id}`} variant="primary">
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