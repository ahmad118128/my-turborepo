'use client';

import React from 'react';
import { useGetUsers } from 'services/apis-hook/users';

const UserApiTest: React.FC = () => {
  const { data, isLoading, error } = useGetUsers();

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: 'red' }}>{error?.message}</p>;

  const users = data?.data ?? [];

  return (
    <div>
      <h2>Users from API</h2>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserApiTest;
