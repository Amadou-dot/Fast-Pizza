import { useState } from 'react';
import Button from '../../ui/Button';

function CreateUser() {
  const [username, setUsername] = useState('');

  interface FormEvent {
    preventDefault: () => void;
  }

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
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
