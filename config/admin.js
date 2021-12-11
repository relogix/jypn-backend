module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'a5bcedcf504054e2e4f0f4e1abb06e64'),
  },
});
