import { useState } from "react"
import "../../assets/styles/Header.css"
import { useScroll } from "../../hooks/useScroll"
import { HeaderLogo } from "./HeaderLogo"
import { HeaderNav } from "./HeaderNav"
import { HeaderActions } from "./HeaderActions"

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true)
  const scrolled = useScroll()

  return (
    <header className={`header-container ${scrolled ? "header-scrolled" : ""}`}>
      <div className="header-wrapper">
        <HeaderLogo />
        <HeaderNav isMenuOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        <HeaderActions onClick={() => setIsMenuOpen(true)}/>
      </div>
    </header>
  )
}
