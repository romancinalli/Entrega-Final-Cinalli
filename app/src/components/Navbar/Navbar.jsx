
import CartWidget from './CartWitget.jsx';
import Logo from '../../assets/logo.png';
import { Link, Outlet } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <>
            <nav className='navbar'>
                <Link to='/'>
                    <img src={Logo} alt="Logo" className="logo" />
                    <h5>PRODUCTOS</h5>
                </Link>
                <ul className='category'>
                    <Link to='/category/medias' className='categoryItems'>
                        Medias
                    </Link>
                    <Link to='/category/vendas' className='categoryItems'>
                        Vendas
                    </Link>
                    <Link to='/category/compresion' className='categoryItems'>
                        Compresión
                    </Link>
                </ul>
                <CartWidget />
            </nav>
            <Outlet />
        </>
    );
}

export default Navbar;
