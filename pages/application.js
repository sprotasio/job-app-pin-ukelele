import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';

const Application = () => {
  const router = useRouter();
  const { title, description, job_id } = router.query;

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    linkedin: '',
    salaryExpectation: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const applicationData = {
      ...formData,
      job_id: job_id,
    };

    // Get the JWT token from localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      alert('You must be logged in to apply.');
      return;
    }

    try {
      const response = await fetch('/api/application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(applicationData),
      });

      const result = await response.json();

      if (result.isSuccess) {
        // Redirect to confirmation page on successful application
        router.push(`/confirmation?title=${title}`);
      } else {
        console.error(result.message);
        alert(result.message); // Show error message from backend
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('An error occurred while submitting your application.');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1
        style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px' }}>
        {title}
      </h1>
      <p style={{ fontSize: '16px', lineHeight: '1.6', textAlign: 'justify' }}>
        {description}
      </p>

      <h2 style={{ fontSize: '24px', marginTop: '30px', marginBottom: '20px' }}>
        Apply for this Job
      </h2>
      <Link href="/login">
        <button style={{ marginTop: '20px' }}>Go to Login</button>
      </Link>
      <br></br>
      <br></br>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn URL"
          value={formData.linkedin}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="number"
          name="salaryExpectation"
          placeholder="Salary Expectation"
          value={formData.salaryExpectation}
          onChange={handleChange}
          style={inputStyle}
        />
        <button
          type="submit"
          style={{
            padding: '15px 30px',
            fontSize: '16px',
            fontWeight: 'bold',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            alignSelf: 'flex-start',
            marginTop: '10px',
          }}>
          APPLY NOW
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  padding: '12px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ddd',
  width: '100%',
};

export default Application;
