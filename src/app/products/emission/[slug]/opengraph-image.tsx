import { ImageResponse } from "next/og";
import { getProductBySlug } from "@/lib/sanity/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  const name = product?.name ?? "Emission Product";
  const partNumber = product?.partNumber ?? "";
  const peakWavelength = product?.keySpecs.peakWavelength ?? "";
  const outputPower = product?.keySpecs.outputPower ?? "";
  const subcategory = product?.subcategory.replace(/-/g, " ").toUpperCase() ?? "LED EMITTER";

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
        {/* Category label */}
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "#ef4444",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Opto Diode Corporation · {subcategory}
        </div>

        {/* Product info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {name}
          </div>
          {partNumber && (
            <div style={{ fontSize: 22, color: "#9ca3af", fontWeight: 500 }}>
              Part Number: {partNumber}
            </div>
          )}
          {(peakWavelength || outputPower) && (
            <div style={{ fontSize: 22, color: "#ef4444", fontWeight: 600 }}>
              {[peakWavelength, outputPower].filter(Boolean).join(" · ")}
            </div>
          )}
        </div>

        {/* Bottom */}
        <div style={{ fontSize: 18, color: "#6b7280" }}>
          optodiode.com/products/emission/{slug}
        </div>
      </div>
    ),
    { ...size }
  );
}
