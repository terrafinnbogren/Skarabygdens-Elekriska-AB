"""Förbereder bilder för webben.

    python3 scripts/bilder.py bilder-inkorg/foto.jpg public/img/foto.jpg [maxbredd]

Roterar enligt kamerans orientering, skalar ner till maxbredd (standard 1600 px),
tar bort all metadata (t.ex. GPS-position) och sparar som komprimerad JPEG.
Bildens mått sparas i src/bilder.json så att sajten kan ange width/height.
"""

import json
import sys
from pathlib import Path

from PIL import Image, ImageOps

MANIFEST = Path(__file__).resolve().parent.parent / 'src' / 'bilder.json'


def main():
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    src, dst = Path(sys.argv[1]), Path(sys.argv[2])
    max_width = int(sys.argv[3]) if len(sys.argv) > 3 else 1600

    with Image.open(src) as im:
        im = ImageOps.exif_transpose(im).convert('RGB')
        if im.width > max_width:
            im = im.resize((max_width, round(im.height * max_width / im.width)), Image.LANCZOS)
        dst.parent.mkdir(parents=True, exist_ok=True)
        im.save(dst, 'JPEG', quality=80, optimize=True, progressive=True)
        size = im.size

    manifest = json.loads(MANIFEST.read_text()) if MANIFEST.exists() else {}
    web_path = '/' + dst.relative_to('public').as_posix()
    manifest[web_path] = {'width': size[0], 'height': size[1]}
    MANIFEST.write_text(json.dumps(dict(sorted(manifest.items())), indent=2, ensure_ascii=False) + '\n')
    print(f'{src} -> {dst} ({size[0]}x{size[1]}, {dst.stat().st_size // 1024} kB)')


if __name__ == '__main__':
    main()
