import React, { useEffect } from 'react';

import useStore from './store';

export default function Users() {
  const { users, getUsers } = useStore();

  useEffect(async () => {
    await getUsers();
  }, []);

  const handleRefresh = async () => {
    await getUsers();
  };

  const items = users.map((u, i) => (
    <li key={i}>{`${u.name.title} ${u.name.first} ${u.name.last}`}</li>
  ));

  return (
    <>
      <button onClick={handleRefresh}>Refresh</button>
      <ol>{items}</ol>
    </>
  );
}
