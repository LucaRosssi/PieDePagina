import HomeSection from "./HomeSection";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../css/BodyContainer.css"

function BodyContainer() {
    const sections = [
        {
            title: "Los más vendidos",
            category: "mas_vendidos"
        },
        {
            title: "Clásicos de siempre",
            category: "clasico"
        }
    ];
    return (
        <div className="body-container">
            <div className="title-container hero">
                <h1 className="hero-title">Bienvenido a Pie de Página!</h1>
                <p className="hero-subtitle">El lugar en donde encontrarás lo mejor de la literatura universal</p>
                <div className="see-all-container">
                    <Button className="hero-button" as={Link} to='/productos'>Ver Catálogo</Button>
                </div>
            </div>
            <div className="sections-container">
                {sections.map((section, index) => (
                    <div className="section" key={index}>
                        <h2>{section.title}</h2>
                        <HomeSection categoria={section.category} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BodyContainer;