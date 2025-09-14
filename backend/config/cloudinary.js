const cloudinary = require('cloudinary').v2
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

// Upload presets for different types of media
const uploadPresets = {
  advertisements: {
    folder: 'furnicraft/advertisements',
    transformation: [
      { width: 400, height: 300, crop: 'fill', quality: 'auto' }
    ]
  },
  sliders: {
    folder: 'furnicraft/sliders',
    transformation: [
      { width: 1200, height: 600, crop: 'fill', quality: 'auto' }
    ]
  },
  products: {
    folder: 'furnicraft/products',
    transformation: [
      { width: 800, height: 800, crop: 'fill', quality: 'auto' }
    ]
  },
  profilePics: {
    folder: 'furnicraft/profile-pics',
    transformation: [
      { width: 200, height: 200, crop: 'fill', quality: 'auto', gravity: 'face' }
    ]
  },
  thumbnails: {
    folder: 'furnicraft/thumbnails',
    transformation: [
      { width: 300, height: 300, crop: 'fill', quality: 'auto' }
    ]
  }
}

// Multer storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'furnicraft',
    resource_type: 'auto',
    quality: 'auto',
    fetch_format: 'auto'
  }
})

// Multer configuration
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image and video files are allowed!'), false)
    }
  }
})

// Upload middleware for different presets
const uploadMiddleware = (preset = 'products') => {
  return (req, res, next) => {
    const presetConfig = uploadPresets[preset] || uploadPresets.products
    
    const presetStorage = new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
        folder: presetConfig.folder,
        resource_type: 'auto',
        quality: 'auto',
        fetch_format: 'auto',
        transformation: presetConfig.transformation
      }
    })

    const presetUpload = multer({
      storage: presetStorage,
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
      },
      fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
          cb(null, true)
        } else {
          cb(new Error('Only image and video files are allowed!'), false)
        }
      }
    })

    return presetUpload.single('image')(req, res, next)
  }
}

// Multiple file upload middleware
const uploadMultipleMiddleware = (preset = 'products', maxCount = 5) => {
  return (req, res, next) => {
    const presetConfig = uploadPresets[preset] || uploadPresets.products
    
    const presetStorage = new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
        folder: presetConfig.folder,
        resource_type: 'auto',
        quality: 'auto',
        fetch_format: 'auto',
        transformation: presetConfig.transformation
      }
    })

    const presetUpload = multer({
      storage: presetStorage,
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
        files: maxCount
      },
      fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
          cb(null, true)
        } else {
          cb(new Error('Only image and video files are allowed!'), false)
        }
      }
    })

    return presetUpload.array('images', maxCount)(req, res, next)
  }
}

// Utility functions
const cloudinaryUtils = {
  // Upload single file
  uploadFile: async (file, preset = 'products') => {
    try {
      const presetConfig = uploadPresets[preset] || uploadPresets.products
      
      const result = await cloudinary.uploader.upload(file, {
        folder: presetConfig.folder,
        resource_type: 'auto',
        quality: 'auto',
        fetch_format: 'auto',
        transformation: presetConfig.transformation
      })

      return {
        success: true,
        url: result.secure_url,
        public_id: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  },

  // Upload multiple files
  uploadMultipleFiles: async (files, preset = 'products') => {
    try {
      const results = []
      for (const file of files) {
        const result = await cloudinaryUtils.uploadFile(file, preset)
        results.push(result)
      }

      return {
        success: true,
        results: results,
        successful: results.filter(r => r.success),
        failed: results.filter(r => !r.success)
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  },

  // Delete file
  deleteFile: async (publicId) => {
    try {
      const result = await cloudinary.uploader.destroy(publicId)
      return {
        success: true,
        result: result
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  },

  // Generate optimized URL
  getOptimizedUrl: (publicId, transformations = {}) => {
    if (!publicId) return ''
    
    const defaultTransformations = {
      quality: 'auto',
      fetch_format: 'auto',
      ...transformations
    }
    
    return cloudinary.url(publicId, defaultTransformations)
  },

  // Generate responsive URLs
  getResponsiveUrls: (publicId, baseTransformations = {}) => {
    if (!publicId) return {}
    
    return {
      small: cloudinary.url(publicId, { ...baseTransformations, width: 300, height: 300, crop: 'fill' }),
      medium: cloudinary.url(publicId, { ...baseTransformations, width: 600, height: 600, crop: 'fill' }),
      large: cloudinary.url(publicId, { ...baseTransformations, width: 1200, height: 1200, crop: 'fill' }),
      original: cloudinary.url(publicId, baseTransformations)
    }
  }
}

module.exports = {
  cloudinary,
  upload,
  uploadMiddleware,
  uploadMultipleMiddleware,
  uploadPresets,
  cloudinaryUtils
}
