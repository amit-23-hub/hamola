const { cloudinaryUtils } = require('../../config/cloudinary')

const uploadToCloudinary = async (req, res) => {
  try {
    const { preset = 'products' } = req.body

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      })
    }

    const result = await cloudinaryUtils.uploadFile(req.file.buffer, preset)

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error
      })
    }

    res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        url: result.url,
        public_id: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes
      }
    })
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({
      success: false,
      message: 'Upload failed',
      error: error.message
    })
  }
}

module.exports = uploadToCloudinary
