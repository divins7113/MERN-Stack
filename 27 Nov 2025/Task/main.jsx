import { createRoot } from 'react-dom/client';
import { Suspense, lazy, useState } from 'react';

const Header = lazy(() => import('./header'));
const Content = lazy(() => import('./content'));
const Sidebar = lazy(() => import('./sidebar'));

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </Suspense>

      <div style={{ display: 'flex' }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Sidebar />
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <Content currentPage={currentPage} />
        </Suspense>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);