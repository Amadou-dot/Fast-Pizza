import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Search() {
    const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Search order #'
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
    </form>
  );
}
