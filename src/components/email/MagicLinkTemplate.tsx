// src/components/email/MagicLinkTemplate.tsx
import * as React from 'react';

interface EmailTemplateProps {
  url: string;
  host: string;
}

export const MagicLinkTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  url,
  host,
}) => (
  <div>
    <table
      width="100%"
      border={0}
      cellSpacing="0"
      cellPadding="0"
      style={{ backgroundColor: "#fff6f6" }}
    >
      <tr>
        <td align="center" style={{ padding: "40px 0" }}>
          <table width="600" border={0} cellSpacing="0" cellPadding="0">
            <tr>
              <td
                align="center"
                style={{
                  backgroundColor: "#ffffff",
                  padding: "60px 40px",
                  borderRadius: "16px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                }}
              >
                <h1
                  style={{
                    margin: "0 0 30px",
                    fontSize: "36px",
                    fontWeight: "bold",
                    color: "#be185d",
                  }}
                >
                  DateDash
                </h1>
                <p
                  style={{
                    margin: "0 0 30px",
                    fontSize: "18px",
                    color: "#be185d",
                    opacity: 0.9,
                  }}
                >
                  Almost there! Click the button below to sign in to DateDash.
                </p>
                <table border={0} cellSpacing="0" cellPadding="0">
                  <tr>
                    <td align="center">
                      <a
                        href={url}
                        target="_blank"
                        style={{
                          backgroundColor: "#be185d",
                          padding: "16px 36px",
                          borderRadius: "8px",
                          color: "#ffffff",
                          textDecoration: "none",
                          fontSize: "18px",
                          display: "inline-block",
                        }}
                      >
                        Sign in to DateDash
                      </a>
                    </td>
                  </tr>
                </table>
                <p
                  style={{
                    margin: "30px 0 0",
                    fontSize: "14px",
                    color: "#999999",
                  }}
                >
                  If you didn't request this email, you can safely ignore it.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
);