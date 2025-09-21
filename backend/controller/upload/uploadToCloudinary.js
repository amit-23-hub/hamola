const { cloudinaryUtils } = require('../../config/cloudinary')

const uploadToCloudinary = async (req, res) => {
  try {
    console.log('Upload request received:', {
      body: req.body,
      file: req.file ? {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        url: req.file.path
      } : null
    })

    const { preset = 'products' } = req.body

    if (!req.file) {
      console.error('No file uploaded')
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      })
    }

    // Since we're using CloudinaryStorage, the file is already uploaded
    // We just need to return the uploaded file information
    const result = {
      success: true,
      url: req.file.path,
      public_id: req.file.filename,
      width: req.file.width || 0,
      height: req.file.height || 0,
      format: req.file.format || 'jpg',
      bytes: req.file.size
    }

    console.log('Upload successful:', result)

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
