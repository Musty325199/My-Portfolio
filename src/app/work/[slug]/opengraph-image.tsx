import { ImageResponse } from "next/og";
import { PORTFOLIO_CONTENT } from "@/data/content";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PORTFOLIO_CONTENT.projects.find((p) => p.id === slug) || PORTFOLIO_CONTENT.projects[0];

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
          padding: "70px 80px",
          fontFamily: "serif",
          color: "#F2EEE6",
          border: "12px solid #161512",
        }}
      >
        {/* Top Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "monospace",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <div
              style={{
                fontSize: "18px",
                color: "#FF6A2B",
                fontWeight: "bold",
                border: "1px solid rgba(255, 106, 43, 0.5)",
                padding: "6px 12px",
                borderRadius: "4px",
              }}
            >
              ML / {project.number}
            </div>
            <div
              style={{
                fontSize: "18px",
                letterSpacing: "0.15em",
                color: "#A39E92",
                textTransform: "uppercase",
              }}
            >
              {project.category}
            </div>
          </div>

          <div
            style={{
              fontSize: "16px",
              color: "#A39E92",
            }}
          >
            Mustapha Lawal Portfolio
          </div>
        </div>

        {/* Project Title & One-Liner */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "84px",
              fontWeight: "bold",
              letterSpacing: "-0.03em",
              lineHeight: "1.0",
              color: "#F2EEE6",
            }}
          >
            {project.title}
          </div>
          <div
            style={{
              fontSize: "30px",
              fontStyle: "italic",
              color: "#FF6A2B",
            }}
          >
            {project.tagline}
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#A39E92",
              maxWidth: "1000px",
              lineHeight: "1.4",
            }}
          >
            {project.oneLiner}
          </div>
        </div>

        {/* Bottom Stack Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(242, 238, 230, 0.15)",
            paddingTop: "24px",
            fontSize: "16px",
            fontFamily: "monospace",
            color: "#A39E92",
          }}
        >
          <div style={{ display: "flex", gap: "14px" }}>
            {project.stack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                style={{
                  border: "1px solid rgba(242, 238, 230, 0.2)",
                  padding: "4px 10px",
                  borderRadius: "2px",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div style={{ color: "#F2EEE6" }}>
            Lagos, Nigeria · WAT (UTC+1)
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
