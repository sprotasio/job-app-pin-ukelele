import { createApplication } from './db/database';
import { authenticate } from '../../middleware/auth.js';

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return authenticate(req, res, async () => {
        // Extracting the application data from the request body
        const {
          first_name,
          last_name,
          email,
          phone,
          linkedin,
          salaryExpectation,
          job_id,
        } = req.body;

        // Validate the required fields
        if (!first_name || !last_name || !email || !phone || !job_id) {
          return res.status(400).json({
            isSuccess: false,
            message: 'All fields are required',
            result: null,
          });
        }

        try {
          // Call the function to create an application in the database
          const result = await createApplication(
            first_name,
            last_name,
            email,
            phone,
            linkedin,
            salaryExpectation,
            job_id
          );

          // Return success response
          return res.status(200).json({
            isSuccess: true,
            message: 'Application created successfully',
            result: result,
          });
        } catch (error) {
          console.error('Error creating application:', error);
          return res.status(500).json({
            isSuccess: false,
            message: 'Error creating application',
            result: null,
          });
        }
      });

    default:
      return res.status(405).json({
        isSuccess: false,
        message: `Method ${req.method} not allowed`,
        result: null,
      });
  }
}
