import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';

export function bootstrapApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}
