import { useState, useEffect } from "react"

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode") === "true"
    setIsDarkMode(savedTheme)
    document.documentElement.classList.toggle("dark", savedTheme)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev)
    document.documentElement.classList.toggle("dark")
    localStorage.setItem("darkMode", (!isDarkMode).toString())
  }

  return { isDarkMode, toggleDarkMode }
}