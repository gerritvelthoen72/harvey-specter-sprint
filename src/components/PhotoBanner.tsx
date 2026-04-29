export default function PhotoBanner() {
  return (
    <section className="w-full aspect-[375/565] md:aspect-[1440/900] overflow-hidden">
      <img
        src="/photo-banner.jpg"
        alt=""
        className="w-full h-full object-cover object-[62%_center] md:object-center"
      />
    </section>
  );
}
