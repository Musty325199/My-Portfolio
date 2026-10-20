import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mustapha Lawal — Full-Stack Developer (MERN) in Lagos, Nigeria";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0E0D0B",
          padding: "80px",
          fontFamily: "serif",
          color: "#F2EEE6",
          border: "12px solid #161512",
        }}
      >
        {/* Header / Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                fontSize: "20px",
                fontFamily: "monospace",
                color: "#FF6A2B",
                fontWeight: "bold",
                border: "1px solid rgba(255, 106, 43, 0.5)",
                padding: "6px 14px",
                borderRadius: "4px",
              }}
            >
              ML
            </div>
            <div
              style={{
                fontSize: "18px",
                fontFamily: "monospace",
                letterSpacing: "0.2em",
                color: "#A39E92",
                textTransform: "uppercase",
              }}
            >
              Lagos, Nigeria · WAT (UTC+1)
            </div>
          </div>

          <div
            style={{
              fontSize: "18px",
              fontFamily: "monospace",
              color: "#FF6A2B",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#FF6A2B",
              }}
            />
            AVAILABLE FOR WORK
          </div>
        </div>

        {/* Center Name & Positioning */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "92px",
              fontWeight: "bold",
              letterSpacing: "-0.04em",
              lineHeight: "1.0",
              color: "#F2EEE6",
            }}
          >
            Mustapha Lawal
          </div>
          <div
            style={{
              fontSize: "32px",
              color: "#FF6A2B",
              fontFamily: "monospace",
              letterSpacing: "0.05em",
            }}
          >
            Full-Stack Developer (MERN) in Lagos, Nigeria
          </div>
          <div
            style={{
              fontSize: "26px",
              color: "#A39E92",
              maxWidth: "1000px",
              lineHeight: "1.4",
            }}
          >
            &ldquo;I build real-time products that hold up in production.&rdquo;
          </div>
        </div>

        {/* Footer Project Badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(242, 238, 230, 0.15)",
            paddingTop: "28px",
            fontSize: "18px",
            fontFamily: "monospace",
            color: "#A39E92",
          }}
        >
          <div style={{ display: "flex", gap: "28px" }}>
            <span>01 / TESSEL</span>
            <span>02 / STOCKFLOW</span>
            <span>03 / NOOK</span>
            <span>04 / HOSTVALE</span>
          </div>
          <div style={{ color: "#F2EEE6" }}>
            mustyflowcrm@gmail.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
