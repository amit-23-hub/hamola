import SummaryApi from '../common'

/**
 * Upload single file to Cloudinary via backend
 * @param {File} file - File to upload
 * @param {string} preset - Upload preset (advertisements, sliders, products, profilePics, thumbnails)
 * @returns {Promise<Object>} - Upload result
 */
export const uploadFile = async (file, preset = 'products') => {
  try {
    if (!file) {
      throw new Error('No file provided')
    }

    const formData = new FormData()
    formData.append('image', file)
    formData.append('preset', preset)

    const response = await fetch(SummaryApi.uploadToCloudinary.url, {
      method: SummaryApi.uploadToCloudinary.method,
      credentials: 'include',
      body: formData
    })

    const result = await response.json()

    if (!result.success) {
      throw new Error(result.message || 'Upload failed')
    }

    return {
      success: true,
      url: result.data.url,
      public_id: result.data.public_id,
      width: result.data.width,
      height: result.data.height,
      format: result.data.format,
      bytes: result.data.bytes
    }
  } catch (error) {
    console.error('Upload error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Upload multiple files to Cloudinary via backend
 * @param {File[]} files - Files to upload
 * @param {string} preset - Upload preset
 * @returns {Promise<Object>} - Upload results
 */
export const uploadMultipleFiles = async (files, preset = 'products') => {
  try {
    if (!files || files.length === 0) {
      throw new Error('No files provided')
    }

    const formData = new FormData()
    files.forEach((file, index) => {
      formData.append('images', file)
    })
    formData.append('preset', preset)

    const response = await fetch(SummaryApi.uploadMultipleToCloudinary.url, {
      method: SummaryApi.uploadMultipleToCloudinary.method,
      credentials: 'include',
      body: formData
    })

    const result = await response.json()

    if (!result.success) {
      throw new Error(result.message || 'Upload failed')
    }

    return {
      success: true,
      results: result.data.results,
      successful: result.data.successful,
      failed: result.data.failed,
      total: result.data.total,
      successfulCount: result.data.successfulCount,
      failedCount: result.data.failedCount
    }
  } catch (error) {
    console.error('Multiple upload error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Delete file from Cloudinary via backend
 * @param {string} publicId - Public ID of file to delete
 * @returns {Promise<Object>} - Delete result
 */
export const deleteFile = async (publicId) => {
  try {
    if (!publicId) {
      throw new Error('No public ID provided')
    }

    const response = await fetch(`${SummaryApi.deleteFromCloudinary.url}/${publicId}`, {
      method: SummaryApi.deleteFromCloudinary.method,
      credentials: 'include'
    })

    const result = await response.json()

    if (!result.success) {
      throw new Error(result.message || 'Delete failed')
    }

    return {
      success: true,
      result: result.data
    }
  } catch (error) {
    console.error('Delete error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Validate file before upload
 * @param {File} file - File to validate
 * @param {Object} options - Validation options
 * @returns {Object} - Validation result
 */
export const validateFile = (file, options = {}) => {
  const {
    maxSize = 10 * 1024 * 1024, // 10MB
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
  } = options

  const errors = []

  // Check file size
  if (file.size > maxSize) {
    errors.push(`File size must be less than ${maxSize / (1024 * 1024)}MB`)
  }

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    errors.push(`File type must be one of: ${allowedTypes.join(', ')}`)
  }

  // Check file extension
  const fileExtension = '.' + file.name.split('.').pop().toLowerCase()
  if (!allowedExtensions.includes(fileExtension)) {
    errors.push(`File extension must be one of: ${allowedExtensions.join(', ')}`)
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  }
}

export default {
  uploadFile,
  uploadMultipleFiles,
  deleteFile,
  validateFile
}
