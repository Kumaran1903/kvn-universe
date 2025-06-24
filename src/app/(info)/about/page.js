export default function About() {
  return (
    <div className="min-h-[78vh] mt-40 bg-gradient-to-t from-indigo-300">
      <div className="container mx-auto w-full">
        <div className="w-full text-center">
          <span className="text-indigo-900 font-semibold text-3xl w-full">
            About Us
          </span>
          <p
            className="text-lg text-gray-600"
            style={{
              padding: "50px",
              lineHeight: "1.9",
              letterSpacing: "0.5px",
            }}
          >
            Our goal here is to help you express your individuality using
            customized themed intros and openings. From milestone celebrations
            to dynamic presentations and engaging social content, we&apos;re
            passionate about making your personal, professional, and
            entertainment experiences stand out.
          </p>
        </div>
      </div>
    </div>
  );
}
