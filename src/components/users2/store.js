import { useState } from 'react';

export default function useStore() {
  const [timestamp, setTimestamp] = useState(0);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const ageMs = Date.now() - timestamp;
    console.log(ageMs);

    if (ageMs <= 10000) {
      return;
    }

    console.log('Old data! Pulling from the server...');
    const results = await fetchUsers();
    setTimestamp(Date.now());
    setUsers(results);
  };

  return {
    users,
    getUsers,
  };
}

async function fetchUsers() {
  const response = await fetch(
    'https://randomuser.me/api/?inc=name&results=100'
  );
  const data = await response.json();
  return data.results;
}
