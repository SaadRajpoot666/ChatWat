import React from "react";
import { Helmet } from "react-helmet"; // for SEO
import { NavLink } from "react-router-dom";

export const Terms = () => {
  return (
    <div className="mt-20 px-6 max-w-5xl mx-auto  text-gray-800 leading-relaxed">
      {/* SEO Optimization */}
      <Helmet>
        <title>Terms & Conditions | ChatWat</title>
        <meta
          name="description"
          content="Review the Terms and Conditions of ChatWat to understand your rights, responsibilities, and our policies regarding privacy, usage, and security."
        />
      </Helmet>

      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-6 text-green-900">Terms & Conditions</h1>

      {/* Introduction */}
      <p className="mb-6">
        Welcome to <strong>ChatWat</strong> – your real-time communication platform. By registering or using ChatWat, you agree to be bound by these terms and conditions. Please read them carefully before continuing to use our services.
      </p>

      {/* Section 1 */}
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-800">1. User Responsibilities</h2>
      <p className="mb-4">
        You are responsible for the accuracy and confidentiality of the information provided during signup. Never share your login credentials with others. You agree not to misuse or attempt to exploit the ChatWat platform.
      </p>

      {/* Section 2 */}
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-800">2. Account Security</h2>
      <p className="mb-4">
        All accounts are secured with password encryption and verification systems, including OTPs and JWT-based tokens. In case of suspicious activity, ChatWat holds the right to suspend or block access temporarily or permanently.
      </p>

      {/* Section 3 */}
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-800">3. Acceptable Use Policy</h2>
      <p className="mb-4">
        You agree to use ChatWat only for lawful and respectful communication. Harassment, spam, or any content that violates Islamic values or community guidelines will not be tolerated.
      </p>

      {/* Section 4 */}
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-800">4. Privacy and Data Collection</h2>
      <p className="mb-4">
        ChatWat collects minimal personal data solely for the purpose of user identification and account protection. We do not sell, rent, or share your data with third parties. Please refer to our{" "}
        <NavLink to={"/privacy"} className="text-green-700 underline">
          Privacy Policy
        </NavLink>{" "}
        for more details.
      </p>

      {/* Section 5 */}
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-800">5. Modifications to Service</h2>
      <p className="mb-4">
        We reserve the right to modify, suspend, or discontinue any part of the ChatWat platform with or without notice. You agree that ChatWat will not be liable for any changes affecting your access.
      </p>

      {/* Section 6 */}
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-800">6. Limitation of Liability</h2>
      <p className="mb-4">
        ChatWat, its developers, and its affiliates shall not be held liable for any direct or indirect damages arising from the use of our platform.
      </p>

      {/* Section 7 */}
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-800">7. Updates to Terms</h2>
      <p className="mb-4">
        These Terms & Conditions may be updated at any time. Continued use of ChatWat implies acceptance of the latest version.
      </p>

      {/* Contact Info */}
      <h2 className="text-2xl font-semibold mt-8 mb-2 text-green-800">8. Contact</h2>
      <p>
        For questions, support, or legal concerns, contact us at{" "}
        <a
          href="mailto:saadbkhalid666@gmail.com"
          className="text-green-700 underline"
        >
          saadbkhalid666@gmail.com
        </a>
      </p>

      {/* Last Updated */}
      <p className="mt-8 text-sm text-gray-500 italic">
        Last updated: June 15, 2025
      </p>
    </div>
  );
};
