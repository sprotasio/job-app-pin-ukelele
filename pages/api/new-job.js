import { createJobById } from './db/database';
import { authenticate } from '../../middleware/auth';
import { authorizeRole } from '../../middleware/authorizeRole';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      return authenticate(req, res, () => {
        // First authenticate the user, then authorize their role
        authorizeRole('admin')(req, res, async () => {
          const { company_name, description } = req.body;

          if (!company_name || !description) {
            return res.status(400).json({
              isSuccess: false,
              message: 'Please fill all the fields',
              result: [],
            });
          }

          try {
            const result = await createJobById(company_name, description);
            return res.status(200).json({
              isSuccess: true,
              message: 'Job created successfully',
              result: result.list,
            });
          } catch (error) {
            return res.status(500).json({
              isSuccess: false,
              message: 'Failed to create job',
              result: [],
            });
          }
        });
      });

    default:
      return res.status(405).json({
        isSuccess: false,
        message: `Method ${method} not allowed`,
        result: null,
      });
  }
}
