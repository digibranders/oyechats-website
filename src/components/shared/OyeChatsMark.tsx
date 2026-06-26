// OyeChatsMark — the brand glyph for the marketing site.
//
// Mirrors the admin app's component (platform/app/src/components/OyeChatsMark.jsx)
// but tuned for the always-dark website theme — no `invert` flip needed.
// The source PNG (`/oye_final.png`) is mostly transparent/white padding with
// a small mark in the centre. We scale it ~3.2× and translate so the mark
// fills the viewport; `overflow-hidden` clips the rest. The PNG's own opaque
// white background fills the corners, producing the visible "chip" effect
// without an extra wrapper element.

type Props = {
    size?: number;
    className?: string;
};

export default function OyeChatsMark({ size = 32, className = '' }: Props) {
    return (
        <div
            role="img"
            aria-label="OyeChats"
            className={`relative overflow-hidden ${className}`}
            style={{ width: size, height: size }}
        >
            {/* Plain <img> intentionally: we override width/height with arbitrary
                scale + translate, which next/image's loader can't preserve.
                The asset is small (~150KB) and already cached after first load. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src="/oye_final.png"
                alt=""
                draggable={false}
                className="absolute left-1/2 top-1/2 pointer-events-none select-none max-w-none"
                style={{
                    width: size * 3.2,
                    height: size * 3.2,
                    transform: 'translate(-50%, -42%)',
                }}
            />
        </div>
    );
}
