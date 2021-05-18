import { useState } from 'react';

export default function useStore() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const results = await fetchUsersCached();
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

async function fetchUsersCached() {
  const cached = localStorage.getItem('users');

  if (!cached) {
    console.log('Nothing cached! Pulling from the server...');
    return await cacheUserData();
  }

  const { timestamp, data } = JSON.parse(cached);
  const ageMs = Date.now() - timestamp;
  console.log(ageMs);

  if (ageMs > 10000) {
    console.log('Old data! Pulling from the server...');
    return await cacheUserData();
  }

  return data;
}

async function cacheUserData() {
  const r = await fetchUsers();
  const d = JSON.stringify({
    timestamp: Date.now(),
    data: r,
  });
  console.log(d.length);
  localStorage.setItem('users', d);
  return r;
}
