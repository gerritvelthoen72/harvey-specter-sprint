import TalkButton from "./TalkButton";

const mono = "var(--font-geist-mono)";
const sans = "var(--font-dm-sans)";

const socialStyle: React.CSSProperties = {
  fontFamily: sans,
  fontSize: 18,
  fontWeight: 400,
  color: "#ffffff",
  lineHeight: 1.1,
  letterSpacing: "-0.04em",
  textTransform: "uppercase",
};

const legalStyle: React.CSSProperties = {
  fontFamily: sans,
  fontSize: 12,
  fontWeight: 400,
  color: "#ffffff",
  lineHeight: 1.1,
  letterSpacing: "-0.04em",
  textTransform: "uppercase",
  textDecoration: "underline",
  whiteSpace: "nowrap",
};

export default function Footer() {
  return (
    <footer data-nav-theme="dark" className="w-full bg-black px-4 md:px-8 pt-12 md:pt-[48px]">

      {/* ── Top: CTA + socials ── */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-0 mb-6 md:mb-12">

        {/* CTA */}
        <div className="flex flex-col gap-3">
          <p
            style={{
              fontFamily: sans,
              fontSize: 24,
              fontWeight: 300,
              fontStyle: "italic",
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
            }}
          >
            Have a{" "}
            <strong style={{ fontStyle: "normal", fontWeight: 900 }}>project</strong>
            {" "}in mind?
          </p>
          <TalkButton
            variant="ghost"
            className="self-start rounded-full px-4 py-3 border border-white"
            style={{ fontFamily: sans, fontSize: 14, fontWeight: 500, letterSpacing: "-0.04em" }}
          />
        </div>

        {/* Social links — desktop: 2 columns (center + right), mobile: stacked */}
        <div className="flex flex-col gap-2 md:text-center" style={socialStyle}>
          <p>Facebook</p>
          <p>Instagram</p>
          {/* Mobile only: X.com + Linkedin inline */}
          <p className="md:hidden">X.com</p>
          <p className="md:hidden">Linkedin</p>
        </div>

        <div className="hidden md:block text-right" style={socialStyle}>
          <p>X.com</p>
          <p>Linkedin</p>
        </div>

      </div>

      {/* Divider */}
      <div className="w-full border-t border-white mb-12 md:mb-[120px]" />

      {/* ── Bottom: H.Studio + legal ── */}

      {/* Mobile bottom */}
      <div className="md:hidden flex flex-col gap-4 pb-0">
        <div className="flex gap-[34px] justify-center">
          <a href="#" style={legalStyle}>Licences</a>
          <a href="#" style={legalStyle}>Privacy policy</a>
        </div>
        <div className="flex flex-col gap-2 overflow-hidden" style={{ height: 130 }}>
          <p
            style={{
              fontFamily: mono,
              fontSize: 10,
              fontWeight: 400,
              color: "#ffffff",
              lineHeight: 1.1,
              textTransform: "uppercase",
              letterSpacing: "0",
            }}
          >
            [ Coded By Claude ]
          </p>
          <p
            style={{
              fontFamily: sans,
              fontSize: "clamp(91px, 24.4vw, 110px)",
              fontWeight: 600,
              color: "#ffffff",
              lineHeight: 0.8,
              letterSpacing: "-0.06em",
              textTransform: "capitalize",
              whiteSpace: "nowrap",
            }}
          >
            H.Studio
          </p>
        </div>
      </div>

      {/* Desktop bottom */}
      <div className="hidden md:flex items-end justify-between">

        {/* H.Studio container — overflow crops the text */}
        <div className="relative flex-1 min-w-0 overflow-hidden" style={{ height: 219 }}>
          {/* [ CODED BY CLAUDE ] — rotated on far left */}
          <div
            className="absolute flex items-center justify-center"
            style={{ left: 0, top: "50%", transform: "translateY(-50%)", width: 15, height: 160 }}
          >
            <p
              className="-rotate-90 whitespace-nowrap"
              style={{
                fontFamily: mono,
                fontSize: 14,
                fontWeight: 400,
                color: "#ffffff",
                lineHeight: 1.1,
                textTransform: "uppercase",
              }}
            >
              [ Coded By Claude ]
            </p>
          </div>

          {/* H.Studio */}
          <p
            className="absolute capitalize"
            style={{
              fontFamily: sans,
              fontSize: 290,
              fontWeight: 600,
              color: "#ffffff",
              lineHeight: 0.8,
              letterSpacing: "-0.06em",
              whiteSpace: "nowrap",
              left: 24,
              top: "50%",
              transform: "translateY(-50%) translateY(6.5px)",
            }}
          >
            H.Studio
          </p>
        </div>

        {/* Legal links */}
        <div className="flex gap-[34px] items-center pb-8 shrink-0 ml-8">
          <a href="#" style={legalStyle}>Licences</a>
          <a href="#" style={legalStyle}>Privacy policy</a>
        </div>

      </div>

    </footer>
  );
}
