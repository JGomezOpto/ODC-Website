import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Opto Diode Corporation — Silicon Photodiodes, EUV Detectors & IR Emitters";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoBuffer = await readFile(
    join(process.cwd(), "public/images/branding/logo.png")
  );
  const logoBase64 = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0d0d0d",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoBase64}
          alt="Opto Diode Corporation"
          height={52}
          style={{ objectFit: "contain", objectPosition: "left" }}
        />

        {/* Center: Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <span
              style={{
                fontSize: 56,
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Photonics for Demanding Environments
            </span>
          </div>
          <span
            style={{
              fontSize: 26,
              fontWeight: 500,
              color: "#ef4444",
              letterSpacing: "0.01em",
            }}
          >
            Silicon Photodiodes · EUV/XUV Detectors · IR Emitters · APDs
          </span>
        </div>

        {/* Bottom: Domain */}
        <span style={{ fontSize: 18, color: "#6b7280", fontWeight: 400 }}>
          optodiode.com · Camarillo, CA · Since 1984
        </span>
      </div>
    ),
    { ...size }
  );
}
