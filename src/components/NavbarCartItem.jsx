const NavbarCartItem = ({compra}) => {

    return (
        <div style={{display:'flex', justifyContent: 'space-between', margin: ' 2px 10px', alignItems: 'center', padding: '10px', fontSize:'1.3em', width:'100%', color:'#e9e4e4', borderTop: '2px solid #e9e4e4' }}>
            <img src={compra.img} alt={compra.nombre} style={{height: '4em', marginRight: '20px'}}/>
            <span style={{width:'100%', alignItems:'center'}}>{compra.nombre}</span>
            <span style={{paddingRight:'1em'}}>{compra.quantity}</span>
        </div>
    )
}

export default NavbarCartItem