import { createContext, useContext, useState, useEffect } from 'react'

const RoleContext = createContext()

export function RoleProvider({ children }) {
  const [role, setRole] = useState(() => {
    // Get from localStorage or default to 'customer'
    return localStorage.getItem('userRole') || 'customer'
  })

  useEffect(() => {
    localStorage.setItem('userRole', role)
  }, [role])

  const switchRole = (newRole) => {
    setRole(newRole)
  }

  return (
    <RoleContext.Provider value={{ role, switchRole }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  const context = useContext(RoleContext)
  if (!context) {
    throw new Error('useRole must be used within RoleProvider')
  }
  return context
}

