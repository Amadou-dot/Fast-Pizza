import { useState } from 'react';
import Button from '../../ui/Button';
import { updateUsername } from './userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  interface FormEvent {
    preventDefault: () => void;
  }
  
  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
    if (!username) return;
    dispatch(updateUsername(username));
    navigate('/menu');

  }

  return (
    <form onSubmit={handleSubmit}>
      <p className='mb-4 text-sm text-stone-600 md:text-base'>👋 Welcome! Please start by telling us your name:
      </p>

      <input
        className='w-72 mb-8 input'
        type='text'
        placeholder='Your full name'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== '' && (
        <div>
          <Button>Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
