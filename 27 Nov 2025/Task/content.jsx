import { useState, useEffect } from 'react';

function Content({ currentPage }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [currentPage]);

  const contentMap = {
    home: (
      <>
        <h2>Welcome to World of Tatya Vinchu</h2>
        <article style={{ marginBottom: '20px' }}>
          <h3>Lorem</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </article>
      </>
    ),
    about: (
      <>
        <h2>About Us</h2>
        <p>a fictional, possessed puppet and the main antagonist from the Marathi horror-comedy film franchise Zapatlela</p>
      </>
    ),
    contact: (
      <>
        <h2>Contact Us</h2>
        <p>Email: <strong>devilwantsyou@tatyabichho.com</strong></p>
        <p>Phone: <strong>+1 234 567 890</strong></p>
        <p>Shhhhhh...</p>
      </>
    )
  };

  return (
    <main style={{
      flex: 1,
      padding: '20px',
      background: 'white',
      borderRadius: '8px',
      marginLeft: '20px'
    }}>
      {isLoading ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '300px',
          fontSize: '1.5rem',
          color: '#007bff'
        }}>
          Loading…
        </div>
      ) : (
        contentMap[currentPage] || contentMap.home
      )}
    </main>
  );
}

export default Content;