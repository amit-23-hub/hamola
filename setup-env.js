const fs = require('fs')
const path = require('path')

// Backend .env content
const backendEnv = `# Database Configuration
MONGODB_URI=mongodb://localhost:27017/ecommerce-fern

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_${Math.random().toString(36).substring(7)}
JWT_EXPIRES_IN=7d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Server Configuration
PORT=8080
FRONTEND_URL=http://localhost:3000

# Environment
NODE_ENV=development`

// Frontend .env content
const frontendEnv = `# Backend URL
REACT_APP_BACKEND_URL=http://localhost:8080

# Cloudinary Configuration (if using direct uploads)
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_upload_preset`

// Create backend .env
const backendEnvPath = path.join(__dirname, 'backend', '.env')
if (!fs.existsSync(backendEnvPath)) {
  fs.writeFileSync(backendEnvPath, backendEnv)
  console.log('✅ Created backend/.env file')
} else {
  console.log('⚠️  backend/.env already exists')
}

// Create frontend .env
const frontendEnvPath = path.join(__dirname, 'frontend', '.env')
if (!fs.existsSync(frontendEnvPath)) {
  fs.writeFileSync(frontendEnvPath, frontendEnv)
  console.log('✅ Created frontend/.env file')
} else {
  console.log('⚠️  frontend/.env already exists')
}

console.log('\n📝 Next steps:')
console.log('1. Update the Cloudinary credentials in both .env files')
console.log('2. Get your Cloudinary credentials from: https://console.cloudinary.com/')
console.log('3. Replace the placeholder values with your actual credentials')
console.log('4. Restart both servers after updating the .env files')
console.log('\n🔧 To get Cloudinary credentials:')
console.log('- Go to https://console.cloudinary.com/')
console.log('- Sign up or log in')
console.log('- Go to Dashboard')
console.log('- Copy Cloud Name, API Key, and API Secret')
