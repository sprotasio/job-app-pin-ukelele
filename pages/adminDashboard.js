import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token =
      localStorage.getItem('token') || document.cookie?.split('token=')[1];

    // If there's no token, redirect to login page
    if (!token) {
      router.push('/login');
      return;
    }

    // Verify the user's role via API call
    axios
      .get('/api/protected', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // If the user is not an admin, redirect to unauthorized page
        if (response.data.result.role !== 'admin') {
          router.push('/unauthorized');
        } else {
          setUser(response.data.result);
        }
      })
      .catch(() => {
        router.push('/login'); // Redirect to login page if authentication fails
      });
  }, [router]);

  // Show loading while checking authentication
  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome, Admin {user.username}</h1>
      <p>You have access to the admin dashboard.</p>
    </div>
  );
}
