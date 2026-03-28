import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import CompliancePage from './pages/CompliancePage'
import IngredientsPage from './pages/IngredientsPage'
import FormulasPage from './pages/FormulasPage'
import BriefPage from './pages/BriefPage'
import KnowledgePage from './pages/KnowledgePage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="compliance" element={<CompliancePage />} />
          <Route path="ingredients" element={<IngredientsPage />} />
          <Route path="formulas" element={<FormulasPage />} />
          <Route path="brief" element={<BriefPage />} />
          <Route path="knowledge" element={<KnowledgePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
