const sharp = require("sharp");

async function convertImage(image, options) {
  try {
    if (!Buffer.isBuffer(image)) { throw new Error("Invalid image format. Expected a Buffer."); }
    if (typeof options !== "object") { throw new Error("Invalid options format. Expected an object."); }

    let { scale = 1, rotation = 0, filters = {} } = options;
    let sharpInstance = sharp(image);

    if (scale !== 1) {
      const metadata = await sharpInstance.metadata();
      if (!metadata.width || !metadata.height) {
        throw new Error("Unable to determine image dimensions for resizing.");
      }
      sharpInstance = sharpInstance.resize({
        width: Math.round(metadata.width * scale),
        height: Math.round(metadata.height * scale),
      });
    }

    if (rotation) { sharpInstance = sharpInstance.rotate(rotation); }
    if (filters.grayscale) { sharpInstance = sharpInstance.grayscale();}
    if (filters.sepia) { sharpInstance = sharpInstance.tint({ r: 112, g: 66, b: 20 }); }
    if (filters.brightness || filters.contrast) {
      sharpInstance = sharpInstance.modulate({
        brightness: filters.brightness / 100 || 1,
        contrast: filters.contrast / 100 || 1,
      });
    }

    return await sharpInstance.toBuffer();
  } catch (error) {
    console.error("Error processing image:", error.message);
    throw error;
  }
}

module.exports = { convertImage };