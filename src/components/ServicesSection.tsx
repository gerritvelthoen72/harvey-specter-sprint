const mono = "var(--font-geist-mono)";
const sans = "var(--font-dm-sans)";

const labelStyle: React.CSSProperties = {
  fontFamily: mono,
  fontSize: 14,
  color: "#ffffff",
  lineHeight: 1.1,
  textTransform: "uppercase",
};

const descStyle: React.CSSProperties = {
  fontFamily: sans,
  fontSize: 14,
  color: "#ffffff",
  lineHeight: 1.3,
  letterSpacing: "-0.04em",
};

const titleStyle: React.CSSProperties = {
  fontFamily: sans,
  fontSize: 36,
  fontWeight: 700,
  fontStyle: "italic",
  color: "#ffffff",
  lineHeight: 1.1,
  letterSpacing: "-0.04em",
  textTransform: "uppercase",
};

const services = [
  {
    num: "[ 1 ]",
    title: "Brand Discovery",
    desc: "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    img: "/service-brand.jpg",
  },
  {
    num: "[ 2 ]",
    title: "Web Design & Dev",
    desc: "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    img: "/service-web.jpg",
  },
  {
    num: "[ 3 ]",
    title: "Marketing",
    desc: "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    img: "/service-marketing.jpg",
  },
  {
    num: "[ 4 ]",
    title: "Photography",
    desc: "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    img: "/service-photography.jpg",
  },
];

export default function ServicesSection() {
  return (
    <section data-nav-theme="dark" className="w-full bg-black px-4 md:px-8 py-12 md:py-[80px]">

      {/* Section label */}
      <p className="mb-6 md:mb-12" style={labelStyle}>[ Services ]</p>

      {/* [4] DELIVERABLES header */}
      <div
        className="flex items-center justify-between w-full mb-12 md:mb-12 uppercase"
        style={{
          fontFamily: sans,
          fontSize: "clamp(32px, 6.67vw, 96px)",
          fontWeight: 300,
          color: "#ffffff",
          letterSpacing: "-0.08em",
          lineHeight: 1,
        }}
      >
        <span>[4]</span>
        <span>Deliverables</span>
      </div>

      {/* Service items */}
      <div className="flex flex-col gap-12">
        {services.map((s) => (
          <div key={s.num} className="flex flex-col gap-[9px] w-full">
            {/* Number + rule */}
            <p style={labelStyle}>{s.num}</p>
            <div className="w-full border-t border-white" />

            {/* Desktop: title left, desc+image right | Mobile: stacked */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 pt-2">
              <p style={titleStyle}>{s.title}</p>

              <div className="flex flex-col md:flex-row items-start gap-6">
                <p style={{ ...descStyle, maxWidth: 393 }}>{s.desc}</p>
                <div className="shrink-0 w-[151px] h-[151px] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
