import Link from 'next/link';
import { useState, useEffect } from 'react';

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  // Utility function to get the first sentence of the description
  const getFirstSentence = (text) => {
    const firstSentence = text.split('. ')[0];
    return firstSentence + '.';
  };

  // Fetch data from the API with authorization
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        // If there's no token, handle unauthorized access
        if (!token) {
          setError('You are not authorized. Please log in.');
          return;
        }

        const response = await fetch('/api/list-jobs', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include token in the Authorization header
          },
        });

        const data = await response.json();

        if (data.isSuccess) {
          setJobs(data.result); // Set jobs if request is successful
        } else {
          // Handle unauthorized or failed requests
          setError('Failed to fetch jobs. Please try again.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching the jobs.');
      }
    };

    fetchData();
  }, []);

  // Handle job deletion
  const handleDeleteJob = async (job_id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You are not authorized. Please log in.');
        return;
      }

      const response = await fetch(`/api/list-jobs?job_id=${job_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log('Job deleted');
        setJobs((prevJobs) => prevJobs.filter((job) => job.job_id !== job_id));
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to delete job');
      }
    } catch (error) {
      console.error('Error deleting job', error);
      setError('An error occurred while deleting the job.');
    }
  };

  // Render
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Jobs List</h1>
      <Link href="/login">
        <button style={{ marginTop: '20px' }}>Go to Login</button>
      </Link>
      <br></br>
      <br></br>

      {error && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          <strong>{error}</strong>
        </div>
      )}

      <div style={{ marginBottom: '20px' }}>
        <Link href="/new-job">
          <button
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              marginRight: '10px',
              backgroundColor: '#0070f3',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
            }}>
            NEW JOB
          </button>
        </Link>

        <Link href="/">
          <button
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#0070f3',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
            }}>
            BACK TO MENU
          </button>
        </Link>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>
              Company
            </th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>
              Description
            </th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.job_id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {job.company_name}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {getFirstSentence(job.description)}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <Link
                  href={{
                    pathname: '/application',
                    query: {
                      title: job.company_name,
                      description: job.description,
                      job_id: job.job_id,
                    },
                  }}>
                  <button
                    style={{
                      color: 'blue',
                      cursor: 'pointer',
                      background: 'none',
                      border: 'none',
                    }}>
                    Apply
                  </button>
                </Link>
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'red',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleDeleteJob(job.job_id)}>
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '20px' }}>
        <span>Rows per page: </span>
        <select>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        <div>
          <span>
            Showing 1 - {jobs.length} of {jobs.length}
          </span>
        </div>
        <button style={{ marginLeft: '10px' }}>&lt; Previous</button>
        <button style={{ marginLeft: '10px' }}>Next &gt;</button>
      </div>
    </div>
  );
};

export default JobsList;
