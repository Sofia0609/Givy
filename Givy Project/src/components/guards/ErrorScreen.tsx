interface Props {
  message: string
}

function ErrorScreen({ message }: Props) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'poppins, sans-serif',
      fontSize: '1rem',
      color: 'var(--color-brand-coral)'
    }}>
      Error: {message}
    </div>
  )
}

export default ErrorScreen