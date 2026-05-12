import { useState, useEffect, createContext, useContext } from "react";

interface LocationContextType {
  pincode: string | null;
  address: string | null;
  locationName: string;
  setAddress: (pin: string, address: string) => boolean;
  isValid: boolean;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const [pincode, setInternalPincode] = useState<string | null>(null);
  const [address, setInternalAddress] = useState<string | null>(null);
  const [locationName, setLocationName] = useState("Select Location");

  useEffect(() => {
    const savedPin = localStorage.getItem("user_pincode");
    const savedAddress = localStorage.getItem("user_address");
    const savedName = localStorage.getItem("user_location_name");
    if (savedPin) {
      setInternalPincode(savedPin);
      setInternalAddress(savedAddress);
      setLocationName(savedName || "Tirupathi (Mangalam)");
    }
  }, []);

  const setAddress = (pin: string, fullAddress: string) => {
    // Basic validation: Chittoor/Tirupati pincodes start with 517
    if (pin.startsWith("517") && pin.length === 6) {
      setInternalPincode(pin);
      setInternalAddress(fullAddress);
      
      // Extract a shorter name for the header (e.g., area name)
      const parts = fullAddress.split(",");
      // Try to get the most specific part (suburb/area) that isn't the house number
      const name = parts[0] ? parts[0].trim() : "Tirupati";
      
      setLocationName(name);
      localStorage.setItem("user_pincode", pin);
      localStorage.setItem("user_address", fullAddress);
      localStorage.setItem("user_location_name", name);
      return true;
    }
    return false;
  };

  return (
    <LocationContext.Provider
      value={{
        pincode,
        address,
        locationName,
        setAddress,
        isValid: !!pincode,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
