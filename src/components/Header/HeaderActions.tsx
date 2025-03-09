import { Bars3Icon, BellIcon, MagnifyingGlassIcon, MoonIcon, SunIcon, UserCircleIcon } from "@heroicons/react/24/outline"
import { useDarkMode } from "../../hooks/useDarkMode"

interface HeaderActionProps {
    onClick: () => void
}

export const HeaderActions: React.FC<HeaderActionProps> = ({ onClick }) => {
    const { isDarkMode, toggleDarkMode } = useDarkMode()

    return (
        <div className="header-actions">
            <button className="header-action-button header-search-button">
                <MagnifyingGlassIcon className="h-5 w-5" />
            </button>

            <button className="header-action-button header-notification-button">
                <BellIcon className="h-5 w-5" />
                <span className="header-notification-badge">3</span>
            </button>

            <button className="header-action-button header-theme-button" onClick={toggleDarkMode}>
                {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>

            <div className="header-profile">
                <UserCircleIcon className="h-8 w-8 text-blue-500" />
            </div>

            <button className="header-menu-button" onClick={onClick}>
                <Bars3Icon className="h-6 w-6" />
            </button>
        </div>
    )
}