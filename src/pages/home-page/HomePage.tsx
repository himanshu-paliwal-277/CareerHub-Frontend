"use client";
import React, { memo } from "react";
import HeroSection from "@/components/hero-section/HeroSection";

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
    </div>
  );
};

export default memo(HomePage);
