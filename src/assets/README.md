# Assets Directory

This directory contains static assets for the Zuri Guest House website.

## Structure

- `images/` - Contains all image files used in the website
  - Add your photos, logos, and other images here
  - Supported formats: `.jpg`, `.jpeg`, `.png`, `.svg`, `.webp`

## Usage

To use images in your components, import them like this:

```tsx
import heroImage from '../assets/images/hero-image.jpg';

function Hero() {
  return <img src={heroImage} alt="Zuri Guest House" />;
}
```

## Best Practices

1. Use descriptive filenames (e.g., `zuri-exterior-view.jpg` instead of `IMG_001.jpg`)
2. Optimize images for web use to keep file sizes reasonable
3. Consider using WebP format for better compression
4. Add appropriate alt text for accessibility