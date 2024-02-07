const generateAuthToken = (user) => {
  const token = Buffer.from(`${user.email}:${user.password}`).toString('base64');
  return token;
};
