export function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      return next(); // User has the correct role, proceed to next
    }

    return res.status(403).json({
      isSuccess: false,
      message: `Access denied. You must be an ${role}.`,
      result: null,
    });
  };
}
