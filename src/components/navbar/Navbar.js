import style from './Navbar.module.css'
import { Link } from 'react-router-dom';

export default function Navbar(){
    return (
        <div className={style.navbar}>
            <div className={style.left}>
                <img src="logo.png" alt="UCC" title="UCC"/>
                <h1>UCC CHAT</h1>
            </div>
            <div className={style.right}>
                <Link to="/">Chat</Link>
                <Link to="/admin">Admin</Link>
            </div>
        </div>
    )
}