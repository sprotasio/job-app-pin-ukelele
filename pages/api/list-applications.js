import { getListApplications, deleteApplicationById } from './db/database';
import { authenticate } from '../../middleware/auth';

export default async function handler(req, res) {
  const { method } = req;

  // Handle GET requests (to list applications)
  switch (method) {
    case 'GET':
      // Ensure authentication middleware is called first
      return authenticate(req, res, async () => {
        try {
          const result = await getListApplications();
          res.status(200).json({ applications: result });
        } catch (error) {
          res.status(500).json({ error: 'Failed to fetch applications' });
        }
      });

    // Handle DELETE requests (to delete application by id)
    case 'DELETE':
      return authenticate(req, res, async () => {
        try {
          const { id } = req.query;
          await deleteApplicationById(id);
          res.status(200).json({ message: 'Application deleted successfully' });
        } catch (error) {
          res.status(500).json({ error: 'Failed to delete application' });
        }
      });

    default:
      res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}
