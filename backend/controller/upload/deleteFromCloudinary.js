const { cloudinaryUtils } = require('../../config/cloudinary')

const deleteFromCloudinary = async (req, res) => {
  try {
    const { publicId } = req.params

    if (!publicId) {
      return res.status(400).json({
        success: false,
        message: 'Public ID is required'
      })
    }

    const result = await cloudinaryUtils.deleteFile(publicId)

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error
      })
    }

    res.status(200).json({
      success: true,
      message: 'File deleted successfully',
      data: result.result
    })
  } catch (error) {
    console.error('Delete error:', error)
    res.status(500).json({
      success: false,
      message: 'Delete failed',
      error: error.message
    })
  }
}

module.exports = deleteFromCloudinary
