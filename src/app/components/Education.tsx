import Image from "next/image";
import damascusUniversityLogo from "./damascus-university.png";

export default function Education() {
  return (
    <section id="education" className="bg-transparent py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-4xl font-bold text-white">
          Education
        </h2>
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-4">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-white ring-1 ring-white/10">
            <Image
              src={damascusUniversityLogo}
              alt="Damascus University logo"
              fill
              sizes="80px"
              className="object-cover object-center"
            />
          </div>
          <p className="text-center text-lg text-white/90">
            <span className="block">
              Bachelor&apos;s in Engineering, IT Engineering (AI Specialization)
            </span>
            <span className="block">Damascus University</span>
          </p>
        </div>
      </div>
    </section>
  );
}
