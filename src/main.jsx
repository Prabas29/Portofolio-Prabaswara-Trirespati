import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { LanguageProvider } from './i18n/LanguageContext.jsx'
import './index.css'

// The admin dashboard is a separate experience on /admin. Loading it lazily
// keeps its code out of the bundle regular visitors download.
const AdminApp = React.lazy(() => import('./admin/AdminApp.jsx'))

const isAdmin = window.location.pathname.replace(/\/+$/, '') === '/admin'

const Loading = () => (
  <div
    style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0E1420',
      color: '#94A3B8',
      fontFamily: 'monospace',
      fontSize: 14,
    }}
  >
    Memuat…
  </div>
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isAdmin ? (
      <Suspense fallback={<Loading />}>
        <AdminApp />
      </Suspense>
    ) : (
      <LanguageProvider>
        <App />
      </LanguageProvider>
    )}
  </React.StrictMode>,
)
