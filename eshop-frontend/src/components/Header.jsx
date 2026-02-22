import logo from '../assets/images/logo.png'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
export default function Header() {
    return (
        <div className="flex justify-between items-center bg-white px-8 py-3 border-b border-gray-200">
            <div className="flex items-center gap-3">
                <img src={logo} alt="logo" className="w-36 h-36 object-contain -my-6" />
            </div>
            <div className="flex items-center gap-6">
                <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition">Home</a>
                <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition">Products</a>
                <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition">About Fwde</a>
                <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition">Jewel Tips</a>
                <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition">Contact</a>
                <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition"><FontAwesomeIcon icon={faCartShopping}/>
                    <div className="relative">
                        <span className="absolute -top-8 -right-3 bg-brand text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                            0
                        </span>
                    </div>
                </a>
                <a href="#" className="bg-linear-to-r from-brand to-brand-dark hover:from-brand/80 hover:to-brand-dark/80 text-white px-6 py-3 rounded-lg font-medium transition flex items-center gap-2"><FontAwesomeIcon icon={faRightToBracket} />Login</a>
            </div>
        </div>
    );
}