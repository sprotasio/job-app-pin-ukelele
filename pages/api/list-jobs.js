import { getListJobs, deleteJobById } from './db/database';
import { authenticate } from '../../middleware/auth.js';
import { authorizeRole } from '../../middleware/authorizeRole.js';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return await handleGet(req, res);

    case 'DELETE':
      return await handleDelete(req, res);

    default:
      return res.status(405).json({
        isSuccess: false,
        message: `Method ${method} not allowed`,
        result: null,
      });
  }
}

// Handle GET: Fetch all jobs (Authenticated users can access)
async function handleGet(req, res) {
  try {
    // Check for valid authentication token
    await authenticate(req, res);

    const result = await getListJobs();

    return res.status(200).json({
      isSuccess: true,
      message: 'Jobs retrieved successfully',
      result: result.list,
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return res.status(500).json({
      isSuccess: false,
      message: 'Error fetching jobs',
      result: null,
    });
  }
}

// Handle DELETE: Delete a job by ID (Only authorized users can delete)
async function handleDelete(req, res) {
  const { job_id } = req.query;

  if (!job_id) {
    return res.status(400).json({
      isSuccess: false,
      message: 'Job ID is required',
      result: null,
    });
  }

  try {
    await authenticate(req, res);

    // Authorization: Only allow 'admin' to delete jobs
    authorizeRole('admin')(req, res, async () => {
      const result = await deleteJobById(job_id);

      if (result) {
        return res.status(200).json({
          isSuccess: true,
          message: 'Job deleted successfully',
          result: null,
        });
      } else {
        return res.status(404).json({
          isSuccess: false,
          message: 'Job not found',
          result: null,
        });
      }
    });
  } catch (error) {
    console.error('Error deleting job:', error);
    return res.status(500).json({
      isSuccess: false,
      message: `Error deleting job: ${error.message}`,
      result: null,
    });
  }
}

//* Get Jobs - eu acho que isto é para o app router com o edge runtime
/*async function handleGet(request) {
    const result = await getListJobs();
    return NextResponse.json({
      isSuccess: true,
      message: '',
      result: result.list,
    });
}

//* Delete Job
async function handleDelete(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('job_id');
    
    try {
        const result = await deleteJobById(id); 
    
        if (result) {
          return NextResponse.json({
            isSuccess: true,
            message: 'Job deleted successfully',
            result: null, 
          });
        } else {
          return NextResponse.json({
            isSuccess: false,
            message: 'Job not found',
            result: null, 
          });
        }
    } catch (error) {
        return NextResponse.json({
          isSuccess: false,
          message: 'Error deleting job',
          result: null, 
        });
    }
}

// Default export function to handle different HTTP methods
export default async function handler(request) {
    if (request.method === 'GET') {
        return handleGet(request);
    } else if (request.method === 'DELETE') {
        return handleDelete(request);
    } else {
        return NextResponse.json({
          isSuccess: false,
          message: 'Method not allowed',
          result: null, 
        }, { status: 405 });
    }
}

*/
