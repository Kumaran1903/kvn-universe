import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="bg-gradient-to-t from-indigo-300 min-h-screen py-16">
      <div
        className="container mx-auto px-4 "
        style={{ paddingBottom: "40px" }}
      >
        <h2 className="uppercase text-indigo-900 font-bold text-2xl md:text-3xl text-center mt-35 md:mb-10">
          Send Us a Message
        </h2>

        {/* Contact Info & Form */}
        <div
          className="flex flex-col lg:flex-row bg-white/20 backdrop:blur-3xl md:bg-white rounded-xl shadow-xl overflow-hidden space-y-10"
          style={{ padding: "80px 30px" }}
        >
          {/* Left: Contact Info */}
          <div className=" w-full lg:w-1/2 p-8 space-y-6 text-gray-700">
            <h3 className="text-2xl font-bold text-indigo-900 mb-6">
              Contact Information
            </h3>
            <p>
              Feel free to reach out to us with any questions or inquiries.
              We're here to help!
            </p>

            <div className="flex items-start space-x-4">
              <MapPin className="text-indigo-600 mt-1" />
              <div>
                <p className="font-semibold">Address</p>
                <p>1234 Movie Lane, Intro City, IM 56789</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Mail className="text-indigo-600 mt-1" />
              <div>
                <p className="font-semibold">Email</p>
                <p>prashanthkevin@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="text-indigo-600 mt-1" />
              <div>
                <p className="font-semibold">Phone</p>
                <p>+91 98765 43210</p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="w-full lg:w-1/2 p-8 md:bg-white ">
            <form className="space-y-7">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-300 outline-none"
                  style={{ padding: "6px 10px" }}
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-300 outline-none"
                  style={{ padding: "6px 10px" }}
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full  border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-300 outline-none"
                style={{ padding: "6px 10px" }}
              />
              <textarea
                rows={5}
                placeholder="Your Message"
                className="w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-300 outline-none"
                style={{ padding: "6px 10px" }}
              />
              <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-3 rounded-md font-semibold hover:bg-indigo-600 transition duration-300"
                style={{ padding: "8px 10px" }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
