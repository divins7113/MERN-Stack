import { createRoot } from 'react-dom/client';
import { Suspense } from 'react';
import MyFruits from './Fruits';
//Click the "Fruits.jsx" tab to check out the Fruits.jsx file

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <MyFruits />
      </Suspense>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <App />
);