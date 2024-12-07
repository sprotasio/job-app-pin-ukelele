import { useState } from 'react';
import Link from 'next/link';

const CreateJob = () => {
  const [company_name, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // Handle form submission and API connection
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // POST request to the API endpoint
      const response = await fetch('/api/new-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company_name: company_name,
          description: description,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Job created successfully!');
        setCompanyName('');
        setDescription('');
      } else {
        setMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error creating job:', error);
      setMessage('An error occurred while creating the job.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Create a New Job</h1>
      <Link href="/login">
        <button style={{ marginTop: '20px' }}>Go to Login</button>
      </Link>
      <br></br>
      <br></br>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Company Name
            <input
              type="text"
              value={company_name}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              style={{ width: '100%', marginTop: '5px', marginBottom: '20px' }}
            />
          </label>
        </div>
        <div>
          <label>
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="5"
              style={{ width: '100%', marginTop: '5px', marginBottom: '20px' }}
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: isSubmitting ? '#ccc' : '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
          }}>
          {isSubmitting ? 'Submitting...' : 'CREATE'}
        </button>
      </form>
      <div style={{ marginTop: '20px' }}>
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
    </div>
  );
};

export default CreateJob;
