const { cloudinaryUtils } = require('../../config/cloudinary')

const uploadMultipleToCloudinary = async (req, res) => {
  try {
    const { preset = 'products' } = req.body

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      })
    }

    const result = await cloudinaryUtils.uploadMultipleFiles(req.files, preset)

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error
      })
    }

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
