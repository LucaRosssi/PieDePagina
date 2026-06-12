import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import '../css/Skeleton.css'

const Skeleton = () => {
    return (
        <>
            <Card style={{ width: '13em', marginBottom: '1em' }} className="card-home">
                <div className='skeleton-image skeleton'></div>
                <Card.Body className="d-flex flex-column">
                    <div className='skeleton skeleton-text'></div>
                    
                    <div className='skeleton skeleton-author'></div>

                <div className="mt-auto ">
                    <div className='skeleton skeleton-price'></div>

                    <div className="d-flex">
                    <Button className="skeleton skeleton-button" disabled/>
                    </div>
                </div>
                </Card.Body>
            </Card>
        </>
    );
};

export default Skeleton