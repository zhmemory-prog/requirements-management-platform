import { useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LayoutShell } from './components/LayoutShell';
import { DashboardPage } from './pages/DashboardPage';
import { IntelligentGenerationPage } from './pages/IntelligentGenerationPage';
import { RequirementDetailPage } from './pages/RequirementDetailPage';
import { RequirementsPage } from './pages/RequirementsPage';
import { generateRequirementDraft, requirements as initialRequirements, type Requirement } from './data/mockData';

export function App() {
  const [requirements, setRequirements] = useState<Requirement[]>(initialRequirements);

  const handleSaveGeneratedRequirement = (draft: ReturnType<typeof generateRequirementDraft>) => {
    const newRequirement: Requirement = {
      id: `REQ-${String(requirements.length + 101).padStart(3, '0')}`,
      title: draft.title,
      category: draft.category,
      owner: draft.owner,
      priority: draft.priority,
      status: '待评审',
      progress: 5,
      createdAt: new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10),
      description: draft.description,
      iteration: 'Sprint 新需求',
      linkedUsers: 1,
      comments: 0,
      votes: 0,
    };

    setRequirements((prev) => [newRequirement, ...prev]);
  };

  return (
    <Routes>
      <Route element={<LayoutShell />}>
        <Route index element={<DashboardPage requirements={requirements} />} />
        <Route path="/requirements" element={<RequirementsPage requirements={requirements} />} />
        <Route path="/requirements/:id" element={<RequirementDetailPage requirements={requirements} />} />
        <Route path="/generate" element={<IntelligentGenerationPage onSave={handleSaveGeneratedRequirement} />} />
      </Route>
    </Routes>
  );
}
