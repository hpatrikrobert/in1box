const crypto = require("crypto");

const generateNextAuthSecret = () => {
  const secretLength = 64;
  return crypto.randomBytes(secretLength).toString("hex");
};

const nextAuthSecret = generateNextAuthSecret();
console.log("Generated NEXTAUTH_SECRET:", nextAuthSecret);
