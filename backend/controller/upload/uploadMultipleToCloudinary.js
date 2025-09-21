const { cloudinaryUtils } = require('../../config/cloudinary')

const uploadMultipleToCloudinary = async (req, res) => {
  try {
    console.log('Multiple upload request received:', {
      body: req.body,
      files: req.files ? req.files.map(file => ({
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        url: file.path
      })) : null
    })

    const { preset = 'products' } = req.body

    if (!req.files || req.files.length === 0) {
      console.error('No files uploaded')
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      })
    }

    // Since we're using CloudinaryStorage, the files are already uploaded
    // We just need to return the uploaded files information
    const results = req.files.map(file => ({
      success: true,
      url: file.path,
      public_id: file.filename,
      width: file.width,
      height: file.height,
      format: file.format,
      bytes: file.size
    }))

    const result = {
      success: true,
      results: results,
      successful: results,
      failed: []
    }

    console.log('Multiple upload successful:', result)

    res.status(200).json({
      success: true,
      message: 'Files uploaded successfully',
      data: {
        results: result.results,
        successful: result.successful,
        failed: result.failed,
        total: result.results.length,
        successfulCount: result.successful.length,
        failedCount: result.failed.length
      }
    })
  } catch (error) {
    console.error('Multiple upload error:', error)
    res.status(500).json({
      success: false,
      message: 'Upload failed',
      error: error.message
    })
  }
}

module.exports = uploadMultipleToCloudinary
