"use client";

import { useRef, useEffect, useState } from "react";
import { IndianRupee, ChevronDown } from "lucide-react";
import { updatePrice } from "@/lib/data";

export default function PriceDropdown({ post, session }) {
  const detailsRef = useRef(null);
  const dropdownRef = useRef(null);

  const localStorageKey = `price_selected_${post.id}`;
  const [selectedOption, setSelectedOption] = useState("personal");
  const [tempOption, setTempOption] = useState("personal");

  // Load selected price from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(localStorageKey);
    if (stored === "personal" || stored === "commercial") {
      setSelectedOption(stored);
      setTempOption(stored);
    }
  }, [localStorageKey]);

  // Position dropdown when opened
  useEffect(() => {
    const positionDropdown = () => {
      if (detailsRef.current && dropdownRef.current) {
        const summary = detailsRef.current.querySelector("summary");
        const rect = summary.getBoundingClientRect();
        const dropdown = dropdownRef.current;

        dropdown.style.position = "fixed";
        dropdown.style.top = `${rect.bottom + 8}px`;
        dropdown.style.left = `${rect.left}px`;
        dropdown.style.zIndex = "9999";
      }
    };

    const observer = new MutationObserver(() => {
      if (detailsRef.current?.hasAttribute("open")) {
        setTempOption(selectedOption); // Reset to saved
        positionDropdown();
      }
    });

    if (detailsRef.current) {
      observer.observe(detailsRef.current, { attributes: true });
    }

    window.addEventListener("resize", positionDropdown);
    window.addEventListener("scroll", positionDropdown);

    return () => {
      window.removeEventListener("resize", positionDropdown);
      window.removeEventListener("scroll", positionDropdown);
      observer.disconnect();
    };
  }, [selectedOption]);

  const handleFormAction = async (formData) => {
    const selected = formData.get("priceOption");
    if (!session) {
      localStorage.setItem(localStorageKey, selected); // Store in localStorage
      setSelectedOption(selected); // Update committed state
      detailsRef.current.removeAttribute("open");
    } else {
      localStorage.setItem(localStorageKey, selected); // Store in localStorage
      await updatePrice(session.user.userId, post.id, selected);
      setSelectedOption(selected); // Update committed state
      detailsRef.current.removeAttribute("open");
    }
  };

  const handleCancel = () => {
    setTempOption(selectedOption); // Revert unsaved
    detailsRef.current.removeAttribute("open");
  };

  return (
    <div className="relative z-20 w-fit">
      <details ref={detailsRef} className="group">
        <summary
          className="flex items-center cursor-pointer list-none"
          style={{ padding: "8px 12px" }}
        >
          <div
            className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-indigo-300 transition-all duration-200 shadow-sm hover:shadow-md"
            style={{ padding: "6px 10px" }}
          >
            <IndianRupee className="w-4 h-4 text-gray-600" />
            <span className="text-gray-700 font-medium text-sm">Price</span>
            <ChevronDown className="w-4 h-4 text-gray-500 transition-transform duration-200 group-open:rotate-180" />
          </div>
        </summary>

        <div
          ref={dropdownRef}
          className="bg-white border border-indigo-200 rounded-xl shadow-xl overflow-hidden"
          style={{
            width: "256px",
            position: "absolute",
            top: "100%",
            left: "0",
            marginTop: "8px",
            zIndex: 9999,
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleFormAction(new FormData(e.target));
            }}
            style={{ padding: "16px" }}
          >
            <h3
              className="text-sm font-semibold text-gray-800 border-b border-gray-100"
              style={{ marginBottom: "12px", paddingBottom: "8px" }}
            >
              Select Pricing Option
            </h3>

            <div style={{ marginBottom: "16px" }}>
              {/* Personal Use */}
              <label
                className="flex items-center justify-between rounded-lg cursor-pointer transition-all duration-200 bg-gray-50 border border-gray-200 hover:bg-green-50 hover:border-green-200"
                style={{ padding: "12px", marginBottom: "12px" }}
              >
                <div className="flex items-center" style={{ gap: "12px" }}>
                  <input
                    type="radio"
                    name="priceOption"
                    value="personal"
                    checked={tempOption === "personal"}
                    onChange={(e) => setTempOption(e.target.value)}
                    className="w-4 h-4 text-green-600 border-gray-300"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-800">
                      Personal Use
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-green-600">
                  <IndianRupee className="w-4 h-4" />
                  <span className="font-bold text-sm">
                    {post?.price.personal}
                  </span>
                </div>
              </label>

              {/* Commercial Use */}
              <label
                className="flex items-center justify-between rounded-lg cursor-pointer transition-all duration-200 bg-gray-50 border border-gray-200 hover:bg-blue-50 hover:border-blue-200"
                style={{ padding: "12px" }}
              >
                <div className="flex items-center" style={{ gap: "12px" }}>
                  <input
                    type="radio"
                    name="priceOption"
                    value="commercial"
                    checked={tempOption === "commercial"}
                    onChange={(e) => setTempOption(e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-800">
                      Commercial Use
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-blue-600">
                  <IndianRupee className="w-4 h-4" />
                  <span className="font-bold text-sm">
                    {post?.price.commercial}
                  </span>
                </div>
              </label>
            </div>

            {/* Buttons */}
            <div
              className="flex border-t border-gray-100"
              style={{ gap: "8px", paddingTop: "12px" }}
            >
              <button
                type="button"
                onClick={handleCancel}
                className="cursor-pointer flex-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                style={{ padding: "8px 12px" }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="cursor-pointer flex-1 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md"
                style={{ padding: "8px 12px" }}
              >
                Select
              </button>
            </div>
          </form>
        </div>
      </details>
    </div>
  );
}
