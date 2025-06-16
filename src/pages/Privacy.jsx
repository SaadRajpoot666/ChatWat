import React from "react";
import { Helmet } from "react-helmet";

export const Privacy = () => {
  return (
    <div className="bg-white text-green-900 min-h-screen   mt-20 px-6 max-w-5xl  mx-auto">
      {/* SEO Metadata */}
      <Helmet>
        <title>Privacy Policy | ChatWat</title>
        <meta
          name="description"
          content="Review ChatWat's Privacy Policy to understand how we protect and handle your data securely."
        />
      </Helmet>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-6 text-green-900">Privacy Policy</h1>

      {/* Intro */}
      <p className="mb-6">
        At <strong>ChatWat</strong>, your privacy is extremely important to us. This policy outlines how we collect, use, and protect your personal data when you interact with our platform.
      </p>

      {/* Section 1 */}
      <h2 className="text-2xl font-semibold mb-2 mt-8">1. Information We Collect</h2>
      <p className="mb-4">
        We collect the following information during account creation:
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Full name</li>
          <li>Email address</li>
          <li>Hashed password</li>
          <li>Login timestamp</li>
        </ul>
      </p>

      {/* Section 2 */}
      <h2 className="text-2xl font-semibold mb-2 mt-8">2. How We Use Your Information</h2>
      <p className="mb-4">
        Your data is used only to:
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Create and manage your ChatWat account</li>
          <li>Send verification OTPs and secure login tokens</li>
          <li>Provide a real-time chat experience</li>
        </ul>
      </p>

      {/* Section 3 */}
      <h2 className="text-2xl font-semibold mb-2 mt-8">3. Data Protection & Security</h2>
      <p className="mb-4">
        We use industry-standard encryption methods (including bcrypt and JWT) to protect your data. We do not store plain-text passwords, and we do not share your data with third parties.
      </p>

      {/* Section 4 */}
      <h2 className="text-2xl font-semibold mb-2 mt-8">4. Third-Party Services</h2>
      <p className="mb-4">
        ChatWat may use third-party services (like Gmail for OTP emails) for certain features. These services do not access your full account data and are GDPR-compliant.
      </p>

      {/* Section 5 */}
      <h2 className="text-2xl font-semibold mb-2 mt-8">5. Cookies & Session Storage</h2>
      <p className="mb-4">
        We may use JWT tokens and session/local storage to maintain secure login sessions. No tracking or advertisement cookies are used.
      </p>

      {/* Section 6 */}
      <h2 className="text-2xl font-semibold mb-2 mt-8">6. User Rights</h2>
      <p className="mb-4">
        You can request to delete or update your account at any time by contacting us. We ensure your data is removed securely and respectfully.
      </p>

      {/* Section 7 */}
      <h2 className="text-2xl font-semibold mb-2 mt-8">7. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this privacy policy as our platform evolves. You’ll be notified of major changes, and continuing to use ChatWat means you agree with the latest version.
      </p>

      {/* Section 8 */}
      <h2 className="text-2xl font-semibold mb-2 mt-8">8. Contact Information</h2>
      <p className="mb-4">
        If you have any questions or concerns regarding privacy, feel free to contact us at:{" "}
        <a
          href="mailto:saadbkhalid666@gmail.com"
          className="underline text-green-800"
        >
          saadbkhalid666@gmail.com
        </a>
      </p>

      {/* Last Updated */}
      <p className="mt-8 text-sm italic text-green-700">
        Last updated: June 15, 2025
      </p>
    </div>
  );
};

