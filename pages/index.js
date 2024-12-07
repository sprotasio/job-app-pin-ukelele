import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Menu</h1>
      <Link href="/login">
        <button style={{ marginTop: '20px' }}>Go to Login</button>
      </Link>
      <Link href="/signup">
        <button style={{ marginTop: '20px' }}>Signup</button>
      </Link>

      <br></br>
      <br></br>
      <p>Please, choose which page you would like to access</p>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li>
          <Link
            href="/new-job"
            style={{ color: 'blue', textDecoration: 'underline' }}>
            NEW JOB
          </Link>
        </li>
        <li>
          <Link
            href="/list-jobs"
            style={{ color: 'blue', textDecoration: 'underline' }}>
            LIST JOBS
          </Link>
        </li>
        <li>
          <Link
            href="/list-applications"
            style={{ color: 'blue', textDecoration: 'underline' }}>
            LIST APPLICATIONS
          </Link>
        </li>
      </ul>
    </div>
  );
}
