const argon2 = require('argon2')

// Provided from Codepath auth lab
async function hashPassword(plainPassword) {
  try {
    const hash = await argon2.hash(plainPassword, {
      type: argon2.argon2id, // Recommended variant
      memoryCost: 2 ** 16,   // 64 MB
      timeCost: 3,           // Iterations
      parallelism: 1,        // Threads
    })
    return hash
  } catch (err) {
    console.error('Hashing failed:', err)
    throw err
  }
}

async function verifyPassword(plainPassword, hash) {
  try {
    return await argon2.verify(hash, plainPassword)
  } catch (err) {
    console.error('Verification failed:', err)
    return false
  }
}

module.exports = { hashPassword, verifyPassword }
