import { useEffect, useState } from "react";

export function useDeviceType() {
  const [deviceType, setDeviceType] = useState("desktop");

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /iphone|ipad|android|mobile/.test(userAgent);
    setDeviceType(isMobile ? "mobile" : "desktop");
  }, []);

  return deviceType;
}
