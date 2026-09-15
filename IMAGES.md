# Photography & Brand Assets

All imagery on the site is original photography of HS Valley Farmhouse. Nothing is stock.

## Where things live

| Path | What it holds |
| --- | --- |
| `farmhouse_pics/` | Untouched originals as received (WhatsApp exports). Source of truth, never referenced by the site. |
| `public/images/` | Web copies: WebP, longest edge 1600px, quality 82. These are what the site loads. |
| `public/images/thumbs/` | 640px WebP variants used for gallery tiles, lightbox thumbnails and small viewports. |
| `public/og-cover.jpg` | 1200x1200 social share image (the branded front elevation). |
| `public/favicon.png`, `public/apple-touch-icon.png`, `public/brand-mark.png` | The HS crest, extracted from the brand cover, dark green on cream. |
| `public/brand-mark-gold.png` | The same crest recoloured gold on transparency, used in the navbar, preloader and footer. |

## Naming

Files are named for what they show, not when they were taken: `covered-pool-day.webp`,
`peacocks-lawn.webp`, `bedroom-master.webp`. Every file in `public/images/` has a matching
key in `imagesConfig` in `src/config/siteConfig.ts`, and every key is referenced somewhere
on the page.

## Adding or replacing a photo

1. Drop the original into `farmhouse_pics/`.
2. Produce the web copy and thumbnail:

```bash
python - <<'PY'
from PIL import Image, ImageOps
name = "new-photo"                       # descriptive, kebab-case
im = ImageOps.exif_transpose(Image.open("farmhouse_pics/IMG_1234.jpeg")).convert("RGB")
im.thumbnail((1600, 1600)); im.save(f"public/images/{name}.webp", "WEBP", quality=82, method=6)
im.thumbnail((640, 640));   im.save(f"public/images/thumbs/{name}.webp", "WEBP", quality=72, method=6)
PY
```

3. Add a key to `imagesConfig` (`newPhoto: photo("new-photo")`), declare it in the
   `ImagesConfig` interface in `src/types.ts`, then reference it from a gallery item,
   an experience card or a section role.

## Section roles

`imagesConfig` ends with a block of role keys (`hero`, `heroMobile`, `exterior`, `pool`,
`garden`, `interior`, `breakSection`, `ctaBackground`). These are aliases pointing at the
named photographs, so swapping the hero image is a one-line change and nothing else moves.
The hero uses art direction: the landscape night shot on desktop, the portrait sunset
colonnade on phones.
