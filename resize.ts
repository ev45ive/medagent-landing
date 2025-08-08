import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const INPUT_DIR = './public/zawody';
const OUTPUT_DIR = './public/zawody-resized';

const SCALE_FACTOR = 0.3; // 30%

// Supported image formats
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.bmp'];

async function rescaleImages() {
  try {
    // Create output directory if it doesn't exist
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // Read all files from input directory
    const files = await fs.readdir(INPUT_DIR);
    
    // Filter only image files
    const imageFiles = files.filter(file => 
      SUPPORTED_FORMATS.includes(path.extname(file).toLowerCase())
    );

    console.log(`Found ${imageFiles.length} image(s) to process...`);

    // Process each image
    for (const file of imageFiles) {
      const inputPath = path.join(INPUT_DIR, file);
      const outputPath = path.join(OUTPUT_DIR, file);

      try {
        // Get original image metadata
        const metadata = await sharp(inputPath).metadata();
        const newWidth = Math.round((metadata.width || 0) * SCALE_FACTOR);
        const newHeight = Math.round((metadata.height || 0) * SCALE_FACTOR);

        // Resize image
        await sharp(inputPath)
          .resize(newWidth, newHeight)
          .toFile(outputPath);

        console.log(`✓ Resized ${file}: ${metadata.width}x${metadata.height} → ${newWidth}x${newHeight}`);
      } catch (error) {
        console.error(`✗ Failed to process ${file}:`, error);
      }
    }

    console.log('\nDone! All images have been resized to 30%');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the script
rescaleImages();