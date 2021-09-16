import { useAppDispatch } from 'app/hooks';
import { login, logout, signup } from 'features/auth/authSlice';
import React from 'react';

function App() {
  const dispatch = useAppDispatch();

  return (
    <div>
      <button onClick={() => dispatch(login({ email: '', password: '' }))}>
        LOGIN
      </button>

      <button
        onClick={() =>
          dispatch(signup({ email: '', name: '', password: '', username: '' }))
        }
      >
        REGISTER
      </button>

      <button onClick={() => dispatch(logout())}>LOGOUT</button>
    </div>
  );
}

export default App;
