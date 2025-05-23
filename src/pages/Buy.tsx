
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car, Bike } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";

const Buy = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Redirect to homepage if not on mobile
  useEffect(() => {
    if (isMobile === false) {
      navigate("/");
    }
  }, [isMobile, navigate]);

  // If we're still determining if it's mobile, don't render anything
  if (isMobile === undefined) {
    return null;
  }

  // If it's not mobile, don't render anything
  if (isMobile === false) {
    return null;
  }

  return (
    <Layout>
      <div className="min-h-screen pt-8 pb-24 px-4 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold mb-3 text-blue bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Start Your New Journey with Perfect Ride <br/>🚗🏍️
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Choose a vehicles for you
            </p>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                onClick={() => navigate("/used-cars")}
                className="w-full py-8 rounded-xl bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-row items-center">
                  <span className="text-lg font-medium">Buy Used Cars</span>
                </div>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                onClick={() => navigate("/bike-buy-section")}
                variant="secondary"
                className="w-full py-8 rounded-xl dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-row items-center">
                  <span className="text-lg font-medium">Buy Used Bikes</span>
                </div>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-1 bg-gradient-to-r from-primary to-blue-600 rounded-full"></div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Browse through thousands of verified vehicles
              <br />
              with complete history and inspection reports
            </p>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Buy;
