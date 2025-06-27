"use client";
import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        console.log("Email failed");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("There was an error sending your message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className=" bg-gradient-to-t from-indigo-300 min-h-screen py-16 flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="bg-white rounded-xl shadow-xl p-12">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">
              Thank You for Contacting Us!
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              We&apos;ve received your message and will get back to you as soon
              as possible. We appreciate you taking the time to reach out to us.
            </p>
            <button
              onClick={resetForm}
              className="bg-indigo-500 text-white px-8 py-3 rounded-md font-semibold hover:bg-indigo-600 transition duration-300 mb-5"
              style={{ padding: "15px 10px" }}
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gradient-to-t min-h-screen py-16">
      <div
        className="container mx-auto px-4 "
        style={{ paddingBottom: "40px" }}
      >
        <h2 className="uppercase text-indigo-900 font-bold text-2xl md:text-3xl text-center mt-35 md:mb-10">
          Send Us a Message
        </h2>

        {/* Contact Info & Form */}
        <div
          className="w-4/5 mx-auto flex flex-col lg:flex-row bg-white/20 backdrop:blur-xl d:bg-white rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.15)] overflow-hidden space-y-10"
          // className="w-4/5 mx-auto flex flex-col lg:flex-row bg-white/20 backdrop:blur-xl d:bg-white rounded-xl shadow-xl overflow-hidden space-y-10"
          style={{ padding: "80px 30px" }}
        >
          {/* Left: Contact Info */}
          <div className=" w-full lg:w-1/2 p-8 space-y-6 text-gray-700">
            <h3 className="text-2xl font-bold text-indigo-900 mb-6">
              Contact Information
            </h3>
            <p>
              Feel free to reach out to us with any questions or inquiries.
              We&apos;re here to help!
            </p>

            <div className="flex items-start space-x-4">
              <MapPin className="text-indigo-600 mt-1" />
              <div>
                <p className="font-semibold">Address</p>
                <p>Bangalore -76 Karnataka</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Mail className="text-indigo-600 mt-1" />
              <div>
                <p className="font-semibold">Email</p>
                <p>kevinmj534@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="w-full lg:w-1/2 p-8 md:bg-white ">
            <div className="space-y-7">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-300 outline-none"
                  style={{ padding: "6px 10px" }}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-300 outline-none"
                  style={{ padding: "6px 10px" }}
                  required
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full  border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-300 outline-none"
                style={{ padding: "6px 10px" }}
              />
              <textarea
                rows={5}
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-300 outline-none"
                style={{ padding: "6px 10px" }}
                required
              />
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:to-purple-700 text-white py-3 rounded-md font-semibold transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ padding: "8px 10px" }}
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
