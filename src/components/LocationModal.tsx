import { useState, useMemo, useEffect, useCallback } from "react";
import { useLocation } from "@/hooks/use-location";
import { X, MapPin, Search, Navigation, ChevronRight, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { MapContainer, TileLayer, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";

// Fix Leaflet marker icon issue
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NominatimResult {
  display_name: string;
  lat: string;
  lon: string;
  address: {
    postcode?: string;
    city?: string;
    town?: string;
    village?: string;
    suburb?: string;
    state?: string;
  };
}

function MapEvents({ onMove }: { onMove: (lat: number, lng: number) => void }) {
  const map = useMapEvents({
    moveend: () => {
      const { lat, lng } = map.getCenter();
      onMove(lat, lng);
    },
  });
  return null;
}

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 15);
  }, [center, map]);
  return null;
}

export function LocationModal({ isOpen, onClose }: LocationModalProps) {
  const { setAddress, address: currentAddress, pincode: currentPin } = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(currentAddress || "Set your area...");
  const [selectedPin, setSelectedPin] = useState(currentPin || "");
  const [mapCenter, setMapCenter] = useState<[number, number]>([13.6288, 79.4192]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Debounced Search Logic
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.length > 3) {
        setIsSearching(true);
        try {
          // Restricted to India and prioritized for Andhra Pradesh region
          const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(searchQuery)}&countrycodes=in&viewbox=78.0,14.5,80.0,12.5&bounded=0`
          );
          const data = await res.json();
          setSuggestions(data);
          setShowSuggestions(true);
        } catch (error) {
          console.error("Search failed:", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  if (!isOpen) return null;

  const handleSelectSuggestion = (result: NominatimResult) => {
    setSelectedAddress(result.display_name);
    // Try to extract pincode from result or display_name
    const pinMatch = result.display_name.match(/\b517\d{3}\b/);
    setSelectedPin(pinMatch ? pinMatch[0] : "");
    setMapCenter([parseFloat(result.lat), parseFloat(result.lon)]);
    setShowSuggestions(false);
    setSearchQuery("");
  };

  const handleMapMove = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
      );
      const data = await res.json();
      setSelectedAddress(data.display_name);
      
      const pin = data.address.postcode;
      if (pin) setSelectedPin(pin);
    } catch (error) {
      console.error("Reverse geocode failed:", error);
    }
  };

  const handleConfirm = () => {
    if (!selectedPin) {
      toast.error("Please select a valid location with a pincode");
      return;
    }
    const success = setAddress(selectedPin, selectedAddress);
    if (success) {
      toast.success("Location updated!");
      onClose();
    } else {
      toast.error("Sorry, we only deliver to Chittoor & Tirupati (517xxx)");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
      <div className="h-full w-full max-w-2xl sm:h-[90vh] overflow-hidden sm:rounded-[2.5rem] bg-white shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-500">
        
        {/* Interactive Map Section */}
        <div className="relative h-[50%] sm:h-[55%] bg-slate-100">
          <MapContainer 
            center={mapCenter} 
            zoom={15} 
            style={{ height: "100%", width: "100%" }}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ChangeView center={mapCenter} />
            <MapEvents onMove={handleMapMove} />
          </MapContainer>

          {/* Central Overlay Pin */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full z-[1000] pointer-events-none">
            <div className="relative flex flex-col items-center">
               <div className="h-14 w-14 rounded-full bg-brand p-1.5 shadow-2xl border-4 border-white animate-bounce">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-brand">
                     <MapPin className="h-6 w-6 text-white fill-white/20" />
                  </div>
               </div>
               <div className="h-2 w-8 rounded-full bg-black/20 blur-[2px] mt-1 scale-x-110" />
            </div>
          </div>

          {/* Map Overlay Controls */}
          <div className="absolute inset-x-6 top-6 z-[1001]">
            <div className="relative">
              <div className="flex items-center gap-3 bg-white rounded-2xl shadow-2xl p-2 pl-5 border-2 border-transparent focus-within:border-brand/20 transition-all">
                {isSearching ? <Loader2 className="h-5 w-5 animate-spin text-brand" /> : <Search className="h-5 w-5 text-slate-400" />}
                <input 
                  type="text"
                  value={searchQuery}
                  onFocus={() => setShowSuggestions(true)}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type village, town or area name..."
                  className="flex-1 bg-transparent py-3 text-sm font-bold outline-none placeholder:text-slate-400"
                />
                <button 
                  onClick={() => {
                    setMapCenter([13.6288, 79.4192]);
                    handleMapMove(13.6288, 79.4192);
                  }}
                  className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-xs font-black uppercase tracking-tighter text-brand hover:bg-brand/5"
                >
                  <Navigation className="h-4 w-4" />
                  <span className="hidden sm:inline">Recenter</span>
                </button>
              </div>

              {/* Suggestions List */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute mt-3 w-full rounded-2xl bg-white p-2 shadow-2xl border border-slate-100 max-h-[300px] overflow-auto animate-in fade-in slide-in-from-top-2">
                   {suggestions.map((result, i) => (
                     <button
                       key={i}
                       onClick={() => handleSelectSuggestion(result)}
                       className="flex w-full items-center gap-4 rounded-xl p-4 text-left hover:bg-brand/5 transition-colors group"
                     >
                       <div className="rounded-full bg-slate-100 p-2 group-hover:bg-brand/10 group-hover:text-brand transition-colors">
                          <MapPin className="h-4 w-4" />
                       </div>
                       <div className="flex-1 overflow-hidden">
                          <p className="text-sm font-bold text-slate-800 truncate">{result.display_name.split(',')[0]}</p>
                          <p className="text-xs font-medium text-slate-400 truncate">{result.display_name}</p>
                       </div>
                       <ChevronRight className="h-4 w-4 text-slate-300" />
                     </button>
                   ))}
                </div>
              )}
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="absolute right-6 bottom-6 z-[1001] rounded-full bg-white p-3 shadow-xl hover:bg-slate-50 transition-all active:scale-95"
          >
            <X className="h-6 w-6 text-slate-600" />
          </button>
        </div>

        {/* Address Footer Section */}
        <div className="flex-1 bg-white p-8 flex flex-col justify-between">
           <div className="overflow-hidden">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" /> Delivery Address
              </h3>
              
              <div className="flex items-start gap-5">
                 <div className="mt-1 rounded-2xl bg-brand/5 p-4 border border-brand/10">
                    <MapPin className="h-7 w-7 text-brand" />
                 </div>
                 <div className="overflow-hidden">
                    <p className="text-xl font-black leading-tight text-slate-900 mb-2 truncate">
                       {selectedAddress.split(',')[0]}
                    </p>
                    <p className="text-[15px] font-bold leading-relaxed text-slate-500 line-clamp-3">
                       {selectedAddress}
                    </p>
                 </div>
              </div>

              {selectedPin && !selectedPin.startsWith("517") && (
                 <div className="mt-6 rounded-2xl bg-destructive/5 p-4 flex gap-3 text-destructive border border-destructive/10 animate-in shake-in-1">
                    <X className="h-5 w-5 flex-shrink-0" />
                    <p className="text-sm font-bold">Sorry, we don't deliver to {selectedPin} yet. We currently serve Chittoor and Tirupati (517xxx).</p>
                 </div>
              )}
           </div>

           <div className="mt-8 flex gap-4">
              <button 
                onClick={onClose}
                className="flex-1 rounded-2xl border-2 border-slate-100 py-5 text-sm font-black tracking-widest text-slate-600 transition hover:bg-slate-50 uppercase"
              >
                Back
              </button>
              <button 
                onClick={handleConfirm}
                className="flex-[2] rounded-2xl bg-brand py-5 text-sm font-black tracking-widest text-brand-foreground shadow-2xl shadow-brand/30 transition hover:opacity-95 active:scale-[0.98] uppercase"
              >
                Confirm Location
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
