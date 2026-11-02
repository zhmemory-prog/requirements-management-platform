import { Route, Routes } from 'react-router-dom';
import { LayoutShell } from './components/LayoutShell';
import { DashboardPage } from './pages/DashboardPage';
import { RequirementDetailPage } from './pages/RequirementDetailPage';
import { RequirementsPage } from './pages/RequirementsPage';
import { requirements } from './data/mockData';

export function App() {
  return (
    <Routes>
      <Route element={<LayoutShell />}>
        <Route index element={<DashboardPage requirements={requirements} />} />
        <Route path="/requirements" element={<RequirementsPage requirements={requirements} />} />
        <Route path="/requirements/:id" element={<RequirementDetailPage requirements={requirements} />} />
      </Route>
    </Routes>
  );
}
