"""Regenerate PNG/ICO/SVG icon derivatives from Lookstead source assets."""
from __future__ import annotations

import base64
import shutil
from io import BytesIO
from pathlib import Path

from PIL import Image

SOURCE_ROOT = Path(r"C:\Users\Kim\Projects\lookstead\assets")
WEB_ROOT = Path(__file__).resolve().parents[1]
APP_IMAGES = Path(r"C:\Users\Kim\Projects\lookstead-ai-editor\assets\images")

ICON_SOURCE = SOURCE_ROOT / "icon.png"
WHITE_SOURCE = SOURCE_ROOT / "white-icon-transparent.png"

WEB_SIZES = {
    "icon-48.png": 48,
    "icon-192.png": 192,
    "icon-256.png": 256,
    "icon-512.png": 512,
    "favicon.png": 48,
}

LOOKSTEAD_SIZES = WEB_SIZES  # same layout under lookstead/assets


def resize_icon(img: Image.Image, size: int) -> Image.Image:
    rgba = img.convert("RGBA")
    return rgba.resize((size, size), Image.Resampling.LANCZOS)


def write_png(path: Path, img: Image.Image) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, format="PNG", optimize=True)


def write_favicon_ico(dest: Path, img48: Image.Image) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    img48.convert("RGBA").save(
        dest,
        format="ICO",
        sizes=[(48, 48), (32, 32), (16, 16)],
    )


def write_white_svg(dest: Path, white: Image.Image) -> None:
    """SVG nav mark with embedded PNG (works as <img src> without external refs)."""
    buf = BytesIO()
    white.convert("RGBA").save(buf, format="PNG", optimize=True)
    b64 = base64.b64encode(buf.getvalue()).decode("ascii")
    dest.write_text(
        f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" role="img" aria-label="Lookstead">
  <image href="data:image/png;base64,{b64}" width="1024" height="1024" preserveAspectRatio="xMidYMid meet"/>
</svg>
""",
        encoding="utf-8",
    )


def sync_web_and_lookstead_assets(icon: Image.Image, white: Image.Image) -> None:
    for name, size in WEB_SIZES.items():
        out = WEB_ROOT / "assets" / name
        write_png(out, resize_icon(icon, size))
    write_favicon_ico(WEB_ROOT / "favicon.ico", resize_icon(icon, 48))
    shutil.copy2(ICON_SOURCE, WEB_ROOT / "assets" / "icon.png")
    shutil.copy2(WHITE_SOURCE, WEB_ROOT / "assets" / "white-icon-transparent.png")
    write_white_svg(WEB_ROOT / "assets" / "white-icon-transparent.svg", white)

    for name, size in LOOKSTEAD_SIZES.items():
        out = SOURCE_ROOT / name
        write_png(out, resize_icon(icon, size))
    write_favicon_ico(SOURCE_ROOT.parent / "favicon.ico", resize_icon(icon, 48))
    write_white_svg(SOURCE_ROOT / "white-icon-transparent.svg", white)


def sync_app_images(icon: Image.Image, white: Image.Image) -> None:
    APP_IMAGES.mkdir(parents=True, exist_ok=True)
    write_png(APP_IMAGES / "icon-transparent.png", icon)
    write_png(APP_IMAGES / "icon.png", icon)
    write_png(APP_IMAGES / "splash-icon.png", icon)
    write_png(APP_IMAGES / "white-icon-transparent.png", white)
    write_png(APP_IMAGES / "android-icon-foreground.png", icon)
    write_png(APP_IMAGES / "android-icon-monochrome.png", icon)
    write_png(APP_IMAGES / "favicon.png", resize_icon(icon, 48))


def main() -> None:
    if not ICON_SOURCE.is_file():
        raise SystemExit(f"Missing {ICON_SOURCE}")
    if not WHITE_SOURCE.is_file():
        raise SystemExit(f"Missing {WHITE_SOURCE}")

    icon = Image.open(ICON_SOURCE)
    white = Image.open(WHITE_SOURCE)
    if icon.size != (1024, 1024):
        raise SystemExit(f"Expected 1024x1024 icon, got {icon.size}")
    if white.size != (1024, 1024):
        raise SystemExit(f"Expected 1024x1024 white icon, got {white.size}")

    sync_web_and_lookstead_assets(icon, white)
    sync_app_images(icon, white)
    print("Icons synced: website, lookstead/assets, app assets/images")


if __name__ == "__main__":
    main()
