import logo from '../assets/ecomLogo.png'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Header() {
    return (
        <div className="flex justify-between items-center bg-gray-50 px-8 py-3 border-b border-gray-200">
            <div className="flex items-center gap-3">
                <img src={logo} alt="logo" className="w-20 h-20 object-contain" />
                <span className="text-2xl font-bold text-gray-800 tracking-wide">MyShop</span>
            </div>
            <div className="flex items-center gap-6">
                <a href="#" className="text-gray-500 hover:text-gray-900 font-medium transition">Home</a>
                <a href="#" className="text-gray-500 hover:text-gray-900 font-medium transition">Products</a>
                <a href="#" className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition">Cart <FontAwesomeIcon icon={faCartShopping}/></a>
            </div>
        </div>
    );
}