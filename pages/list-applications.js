import Link from 'next/link';
import { useState, useEffect } from 'react';

const ApplicationsList = () => {
  const [applications, setApplications] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/list-applications', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.isSuccess) {
          setApplications(data.result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (applicationId) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(
        `/api/list-applications?application_id=${applicationId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setApplications((prevApplications) =>
          prevApplications.filter(
            (application) => application.application_id !== applicationId
          )
        );
        console.log('Application deleted successfully');
      } else {
        console.error('Failed to delete application');
      }
    } catch (error) {
      console.error('Failed to delete application', error);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Applications List</h1>
      <Link href="/login">
        <button style={{ marginTop: '20px' }}>Go to Login</button>
      </Link>
      <br></br>
      <br></br>

      <Link href="/">
        <button
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            marginBottom: '20px',
          }}>
          BACK TO MENU
        </button>
      </Link>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>
              First Name
            </th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>
              Last Name
            </th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Phone</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Job ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {applications.length > 0 ? (
            applications.map((application, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {application.first_name}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {application.last_name}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {application.email}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {application.phone}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {application.job_id}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <button
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'red',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleDelete(application.application_id)}>
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '8px' }}>
                No applications found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationsList;
