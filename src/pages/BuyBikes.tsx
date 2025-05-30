import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Separator } from "@/components/ui/separator";
import FilterSidebar from "@/components/bikes/FilterSidebar";
import BikeListings from "@/components/bikes/BikeListings";
import MobileBikeListings from "@/components/bikes/MobileBikeListings";
import PopularBrands from "@/components/bikes/PopularBrands";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X, Plus, Minus } from "lucide-react";
import { useCityStore } from "@/store/useCityStore";
import { getCityFromURL, updateURLWithCity } from "@/utils/queryHelpers";
import CityModal from "@/components/cars/CityModal"; // Reusing the car component
import LocationInput from "@/components/bikes/LocationInput";
import SearchBar from "@/components/bikes/SearchBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileFilterDrawer from "@/components/mobile/MobileFilterDrawer";

// Use the mockBikeListings from the component file
import { mockBikeListings } from "@/components/bikes/mockBikeListings";

const BuyBikes = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<Record<string, any>>({});
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [pageBlocked, setPageBlocked] = useState(true);
  
  const { selectedCity, setSelectedCity } = useCityStore();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Check for city in URL or open modal if no city is selected
  useEffect(() => {
    const cityFromURL = getCityFromURL();
    
    if (cityFromURL) {
      setSelectedCity(cityFromURL);
      setPageBlocked(false);
    } else if (!selectedCity) {
      // Open city modal immediately and keep it open until city is selected
      setIsCityModalOpen(true);
      setPageBlocked(true);
    } else {
      setPageBlocked(false);
    }
  }, [selectedCity, setSelectedCity]);
  
  // Filter toggle for mobile view
  const toggleFilters = () => {
    setIsFilterVisible(!isFilterVisible);
  };
  
  // Function to apply filters
  const applyFilters = (filters: Record<string, any>) => {
    setAppliedFilters(filters);
    // In a real app, this would trigger API calls with the filter parameters
  };
  
  // Function to clear all filters
  const clearFilters = () => {
    setAppliedFilters({});
  };

  const openCityModal = () => {
    setIsCityModalOpen(true);
  };

  const closeCityModal = () => {
    // Only close the city modal if we have a selected city
    if (selectedCity) {
      setIsCityModalOpen(false);
      setPageBlocked(false);
    }
  };

  // If page is blocked, prevent scrolling on the body
  useEffect(() => {
    if (pageBlocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [pageBlocked]);

  return (
    <Layout>
      {/* Modal overlay to block interactions when city modal is open */}
      {pageBlocked && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
      )}
      
      <div className={`container mx-auto px-4 ${isMobile ? 'pt-6' : 'pt-24'} ${pageBlocked ? 'pointer-events-none opacity-40 blur-[1px] select-none' : ''}`}>
        
        {/* Search Bar and Location Input */}
        <div className="mb-6 pl-0">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-grow">
              <SearchBar isCompact />
            </div>
            <LocationInput onClick={openCityModal} className="md:w-64 shadow" />
          </div>
        </div>
        
        {/* City Selection Modal */}
        <CityModal 
          isOpen={isCityModalOpen}
          onClose={closeCityModal}
          isMandatory={!selectedCity}
        />
        
        {/* Mobile filter toggle */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            {isMobile ? (
              <MobileFilterDrawer
                trigger={
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 shadow-sm hover:shadow-md"
                  >
                    <SlidersHorizontal className="h-4 w-4" /> Filters
                  </Button>
                }
                title="Filter Bikes"
                onApplyFilters={applyFilters}
                onClearFilters={clearFilters}
              >
                <FilterSidebar 
                  onApplyFilters={applyFilters} 
                  appliedFilters={appliedFilters}
                  onClearFilters={clearFilters}
                />
              </MobileFilterDrawer>
            ) : (
              <Button 
                variant="outline" 
                onClick={toggleFilters}
                className="flex items-center gap-2 shadow-sm hover:shadow-md"
              >
                {isFilterVisible ? (
                  <>
                    <X className="h-4 w-4" /> Hide Filters
                  </>
                ) : (
                  <>
                    <SlidersHorizontal className="h-4 w-4" /> Advanced Search
                  </>
                )}
              </Button>
            )}
          </div>
          
          <Button 
            variant="ghost" 
            onClick={clearFilters}
            className="text-primary"
          >
            Clear Filters
          </Button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6 relative">
          {/* Sidebar with slide animation - ONLY FOR DESKTOP */}
          {!isMobile && (
            <div 
              className={`absolute lg:relative w-full lg:w-1/4 xl:w-1/5 top-0 left-0 z-30 h-[calc(100vh-150px)] 
                overflow-y-auto transition-all duration-[1500ms] ease-in-out transform ${
                isFilterVisible ? 'translate-x-0 opacity-100 shadow-lg' : '-translate-x-full lg:translate-x-0 opacity-0 lg:opacity-100 lg:hidden'
              }`}
            >
              <ScrollArea className="h-full pr-4">
                <FilterSidebar 
                  onApplyFilters={applyFilters} 
                  appliedFilters={appliedFilters}
                  onClearFilters={clearFilters}
                />
              </ScrollArea>
            </div>
          )}
          
          {/* Main content */}
          <div className={`w-full transition-all duration-[1500ms] ease-in-out ${isFilterVisible && !isMobile ? 'lg:w-2/3 xl:w-3/4' : 'w-full'}`}>
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-semibold">485 Bikes Found</h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedCity ? `in ${selectedCity}` : 'Based on your search criteria'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" className="text-sm">
                    Most Relevant
                  </Button>
                </div>
              </div>
              
              {/* Applied filters would display here */}
              {Object.keys(appliedFilters).length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {/* This would be populated with active filter badges */}
                  <div className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    Budget: ₹50K - ₹1L
                    <button className="ml-1 text-muted-foreground hover:text-foreground">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Bike listings - Update grid layout */}
            <div className="transition-all duration-[1500ms] ease-in-out">
              {isMobile ? (
                <MobileBikeListings bikes={mockBikeListings} />
              ) : (
                <BikeListings 
                  bikes={mockBikeListings} 
                  gridClass={isFilterVisible ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"} 
                />
              )}
            </div>
            
            <Separator className="my-12" />
            
            {/* Popular brands section */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Popular Bike Brands</h2>
              <PopularBrands />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BuyBikes;
