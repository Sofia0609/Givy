function LoadingScreen() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'poppins, sans-serif',
      fontSize: '1rem',
      color: 'var(--color-text-muted)'
    }}>
      Loading...
    </div>
  )
}

export default LoadingScreen