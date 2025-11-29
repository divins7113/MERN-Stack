import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

function Timer() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Using a for loop to schedule every second
    for (let i = 1; ; i++) {
      setTimeout(() => {
        setSeconds((prev) => {
          if (prev === 59) {
            setMinutes((m) => m + 1);
            return 0;
          }
          return prev + 1;
        });
      }, i * 1000);
    }
  }, []); // empty array = run only once when component mounts

  return (
    <h1>
      {String(minutes).padStart(2, '0')} {String(seconds).padStart(2, '0')}
    </h1>
  );
}

createRoot(document.getElementById('root')).render(<Timer />);