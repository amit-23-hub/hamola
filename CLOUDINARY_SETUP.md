# Cloudinary Setup Guide

## Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install cloudinary multer multer-storage-cloudinary
```

### 2. Environment Variables
Add these variables to your `.env` file in the backend directory:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Get Cloudinary Credentials
1. Go to [Cloudinary Console](https://console.cloudinary.com/)
2. Sign up or log in
3. Copy your Cloud Name, API Key, and API Secret from the dashboard
4. Add them to your `.env` file

## Frontend Usage

### 1. Import the Upload Component
```javascript
import FileUpload from '../components/FileUpload'
import { uploadFile, uploadMultipleFiles } from '../utils/uploadUtils'
```

### 2. Use the Upload Component
```javascript
const handleUpload = (result) => {
  console.log('Upload successful:', result)
  // Handle successful upload
}

const handleError = (error) => {
  console.error('Upload failed:', error)
  // Handle upload error
}

<FileUpload
  onUpload={handleUpload}
  onError={handleError}
  preset="advertisements" // or "sliders", "products", "profilePics", "thumbnails"
  multiple={false}
  maxSize={5 * 1024 * 1024} // 5MB
/>
```

### 3. Upload Presets Available
- `advertisements` - 400x300px, optimized for ads
- `sliders` - 1200x600px, optimized for hero sliders
- `products` - 800x800px, optimized for product images
- `profilePics` - 200x200px, face detection enabled
- `thumbnails` - 300x300px, optimized for thumbnails

### 4. Programmatic Upload
```javascript
import { uploadFile, uploadMultipleFiles, deleteFile } from '../utils/uploadUtils'

// Single file upload
const result = await uploadFile(file, 'products')
if (result.success) {
  console.log('Image URL:', result.url)
  console.log('Public ID:', result.public_id)
}

// Multiple files upload
const results = await uploadMultipleFiles(files, 'products')
if (results.success) {
  console.log('Uploaded files:', results.successful)
}

// Delete file
const deleteResult = await deleteFile(publicId)
if (deleteResult.success) {
  console.log('File deleted successfully')
}
```

## API Endpoints

### Upload Single File
```
POST /api/upload-cloudinary
Content-Type: multipart/form-data
Body: {
  image: File,
  preset: string (optional, default: 'products')
}
```

### Upload Multiple Files
```
POST /api/upload-multiple-cloudinary
Content-Type: multipart/form-data
Body: {
  images: File[],
  preset: string (optional, default: 'products')
}
```

### Delete File
```
DELETE /api/delete-cloudinary/:publicId
```

## Features

- ✅ Automatic image optimization
- ✅ Responsive image generation
- ✅ File validation (size, type, extension)
- ✅ Drag and drop support
- ✅ Preview functionality
- ✅ Error handling
- ✅ Progress indication
- ✅ Multiple file upload
- ✅ Secure upload with authentication
- ✅ Organized folder structure
- ✅ Automatic format conversion (WebP, AVIF)

## Security Notes

- All uploads require authentication
- File types are validated on both frontend and backend
- File size limits are enforced
- Images are automatically optimized for web delivery
- Secure URLs are generated for all uploads
