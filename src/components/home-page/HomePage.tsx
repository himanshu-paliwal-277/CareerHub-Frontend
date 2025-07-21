"use client";
import React, { memo } from "react";
import HeroSection from "@/components/hero-section/HeroSection";
import styles from "./homePage.module.css";
import companyIcon from "../../assets/icons/building.png";
import applicationIcon from "../../assets/icons/application.png";
import Image from "next/image";
import Link from "next/link";

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <div className={styles.container}>
        <Link href="/companies" className={styles.section}>
          <Image
            className={styles.companyIcon}
            src={companyIcon}
            alt="company-icon"
            width={70}
            height={70}
          />
          <h2 className={styles.heading}>View all companies</h2>

          <p className={styles.description}>
            Explore the companies you have added, view their details, and manage
            your applications.
          </p>
        </Link>
        <Link
          href="/companies"
          className={`${styles.section} ${styles.section2}`}
        >
          <Image
            className={styles.applicationIcon}
            src={applicationIcon}
            alt="application-icon"
            width={70}
            height={70}
          />
          <h2 className={styles.heading}>Track your applications</h2>
          <p className={styles.description}>
            Keep track of your job applications, their status, and any notes you
            want to remember.
          </p>
        </Link>
      </div>
    </>
  );
};

export default memo(HomePage);
