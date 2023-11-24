import { Link } from "react-router-dom";
import Home from "./pages/Home";

function Menue(){
    
    return(
        <div>
            <ul>
                {/* <li><Link to={<Home />}>Home</Link></li> */}
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/contents'>Contents</Link></li>
                <li><Link to='/countries'>Countries</Link></li>
            </ul>
        </div>
    )
}

export default Menue;