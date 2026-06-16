import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { TooltipProvider } from '@/components/ui/tooltip'
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import DashboardPage from '@/pages/Dashboard'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <TooltipProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={
              <>
                <SignedIn>
                  <DashboardPage />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          {/* Catch-all route to redirect any other URL to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  )
}

export default App
