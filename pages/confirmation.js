import { useRouter } from 'next/router';

const Confirmation = () => {
  const router = useRouter();
  const { title } = router.query;

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
      }}>
      <h1>{title}</h1>
      <p>Your application was received successfully!</p>
      <p>Please wait for a contact from our side!</p>
      <div style={{ fontSize: '48px', color: 'green', marginTop: '20px' }}>
        ✔️
      </div>
    </div>
  );
};

export default Confirmation;
