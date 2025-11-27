function Sidebar() {
    return (
      <aside style={{
        width: '200px',
        background: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px'
      }}>
        <h2>Categories</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ marginBottom: '10px' }}>
            <a href="#" style={{ color: '#333', textDecoration: 'none' }}>Hollywood Horror</a>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <a href="#" style={{ color: '#333', textDecoration: 'none' }}>Bollywood Horror</a>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <a href="#" style={{ color: '#333', textDecoration: 'none' }}>Horror Comedy</a>
          </li>
          <li>
            <a href="#" style={{ color: '#333', textDecoration: 'none' }}>Cult Classic Horror</a>
          </li>
        </ul>
      </aside>
    );
  }
  
  export default Sidebar;