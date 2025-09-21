# Environment Setup Instructions

## Backend Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/ecommerce-fern

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Server Configuration
PORT=8080
FRONTEND_URL=http://localhost:3000

# Environment
NODE_ENV=development
```

## Frontend Environment Variables

Create a `.env` file in the `frontend` directory with the following variables:

```env
# Cloudinary Configuration (if using direct uploads)
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# Backend URL
REACT_APP_BACKEND_URL=http://localhost:8080
```

## How to Get Cloudinary Credentials

1. Go to [Cloudinary Console](https://console.cloudinary.com/)
2. Sign up or log in to your account
3. Go to Dashboard
4. Copy the following values:
   - Cloud Name
   - API Key
   - API Secret

## Upload Presets Setup

1. In Cloudinary Console, go to Settings > Upload
2. Create upload presets for different types:
   - `products` - for product images
   - `advertisements` - for advertisement images
   - `sliders` - for slider images
   - `profilePics` - for user profile pictures
   - `thumbnails` - for thumbnail images

## Testing Upload Functionality

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend server:
   ```bash
   cd frontend
   npm start
   ```

3. Navigate to `http://localhost:3000/upload-test` to test upload functionality

4. Open browser DevTools (F12) and check the Console tab for debugging information

## Troubleshooting

### Common Issues:

1. **"No file uploaded" error**: Check if the file is being sent correctly in the FormData
2. **CORS errors**: Ensure FRONTEND_URL is set correctly in backend .env
3. **Cloudinary upload fails**: Verify your Cloudinary credentials and upload presets
4. **Authentication errors**: Make sure you're logged in and have proper permissions

### Debug Steps:

1. Check browser console for frontend errors
2. Check backend console for server errors
3. Verify environment variables are loaded correctly
4. Test with different file types and sizes
5. Check network tab in DevTools for HTTP request/response details
