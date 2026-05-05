import TalkButton from "@/components/TalkButton";

const sans = "var(--font-dm-sans)";
const mono = "var(--font-geist-mono)";

export default function ServicesCTA() {
  return (
    <section className="w-full bg-black px-4 md:px-8 py-16 md:py-[100px] flex flex-col items-center text-center gap-8">
      <p style={{ fontFamily: mono, fontSize: 14, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        [ Ready to start? ]
      </p>
      <h2
        className="uppercase"
        style={{
          fontFamily: sans,
          fontSize: "clamp(36px, 7vw, 96px)",
          fontWeight: 300,
          color: "#fff",
          letterSpacing: "-0.07em",
          lineHeight: 0.9,
          maxWidth: 900,
        }}
      >
        Let's build something worth remembering
      </h2>
      <p
        style={{
          fontFamily: sans,
          fontSize: 16,
          color: "rgba(255,255,255,0.6)",
          letterSpacing: "-0.03em",
          lineHeight: 1.5,
          maxWidth: 480,
        }}
      >
        Schedule a call and let's talk about your project — no obligations, just an honest conversation about what's possible.
      </p>
      <TalkButton
        variant="ghost"
        className="border border-white text-sm font-medium px-6 py-4 rounded-3xl tracking-[-0.035em] cursor-pointer"
        style={{ fontFamily: sans }}
      />
    </section>
  );
}
