import React from 'react';

// Interface for component props following Interface Segregation Principle
interface StreamPixelControlsProps {
  token: string | undefined;
  loginWeb: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

// Styles extracted as constants for better maintainability
const styles = {
  container: 'fixed top-0 w-full bg-black opacity-75 text-white flex justify-center items-center p-2 z-10 space-x-2',
  button: 'bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors duration-300'
};

/**
 * StreamPixelControls component - Displays login/logout controls for the StreamPixel interface
 * 
 * Following SOLID principles:
 * - Single Responsibility: Component only handles the login/logout UI controls
 * - Open/Closed: Easily extendable through props without modifying the component
 * - Liskov Substitution: Uses proper typing for all props
 * - Interface Segregation: Props interface only includes what's needed
 * - Dependency Inversion: Relies on abstractions (callbacks) rather than concrete implementations
 */
const StreamPixelControls: React.FC<StreamPixelControlsProps> = ({
  token,
  loginWeb,
  onLogin,
  onLogout
}) => {
  return (
    <div className={styles.container}>
      {!loginWeb && (
        <button 
          onClick={onLogin} 
          className={styles.button}
          aria-label="Login"
        >
          Login
        </button>
      )}
      <button 
        onClick={onLogout} 
        className={styles.button}
        aria-label="Logout"
      >
        Logout
      </button>
    </div>
  );
};

export default StreamPixelControls;