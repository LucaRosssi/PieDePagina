import React from "react";
import HomeSection from "./HomeSection";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../css/BodyContainer.css"
import { useProducts } from "./CustomHooks";
import LoaderComponent from "./LoaderComponent";

function BodyContainer() {
    const {products, loader} = useProducts();

    return (
        loader
        ? <LoaderComponent/>
        :
        <div className="body-container">
            <div className="title-container">
                <h1>Bienvenido a Pie de Página!</h1>
                <p>El lugar en donde encontrarás lo mejor de la literatural universal.</p>
            </div>
            <div className="sections-container">
                <div className="section">
                    <h2>Los más vendidos</h2>
                    <HomeSection categoria="mas_vendidos" />
                </div>
                <div className="section">
                    <h2>Clásicos de siempre</h2>
                    <HomeSection categoria="clasico" />
                </div>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "40px" }}>
                    <Button as={Link} to='/productos'>Ver todo</Button>
                </div>
            </div>
        </div>
    )
}

export default BodyContainer;