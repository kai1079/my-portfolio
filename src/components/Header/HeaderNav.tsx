import { XMarkIcon } from "@heroicons/react/24/solid"

interface HeaderNavProps {
    isMenuOpen: boolean
    onClose: () => void
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ isMenuOpen, onClose }) => {
    return (
        <nav className={`header-nav ${isMenuOpen ? "header-nav-open" : ""}`}>
            {!isMenuOpen && <button className="header-close-menu" onClick={onClose}>
          <XMarkIcon className="h-6 w-6" />
        </button>}
        {/* <button className="header-close-menu" onClick={onClose}>
          <XMarkIcon className="h-6 w-6" />
        </button> */}

        <ul className="header-nav-list">
          <li className="header-nav-item">
            <a href="#" className="header-nav-link header-nav-link-active">
              Home
            </a>
          </li>
          <li className="header-nav-item">
            <a href="#" className="header-nav-link">
              About
            </a>
          </li>
          <li className="header-nav-item">
            <a href="#" className="header-nav-link">
              Projects
            </a>
          </li>
          <li className="header-nav-item">
            <a href="#" className="header-nav-link">
              Blog
            </a>
          </li>
          <li className="header-nav-item">
            <a href="#" className="header-nav-link">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    )
}
