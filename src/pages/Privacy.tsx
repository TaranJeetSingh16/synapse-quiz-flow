
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Privacy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="border-b">
              <CardTitle className="text-2xl">Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none pt-6">
              <p className="text-sm text-muted-foreground mb-4">
                Last updated: May 15, 2025
              </p>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
                <p>
                  BrainWave Quiz ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, and services (collectively, the "Services").
                </p>
                <p>
                  Please read this Privacy Policy carefully. By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
                </p>
              </section>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
                <p>
                  We collect information that you provide directly to us, information that we collect automatically when you use our Services, and information from third-party sources.
                </p>
                <h3 className="text-lg font-medium mt-3 mb-1">2.1 Information You Provide</h3>
                <p>
                  We may collect the following information that you provide:
                </p>
                <ul className="list-disc pl-6 mb-3">
                  <li>Account information (name, email address, password)</li>
                  <li>Profile information (avatar, bio, preferences)</li>
                  <li>Content you create, share, or post</li>
                  <li>Communications with us or other users</li>
                  <li>Survey or contest information</li>
                  <li>Payment information (processed by our payment providers)</li>
                </ul>
                
                <h3 className="text-lg font-medium mt-3 mb-1">2.2 Information We Collect Automatically</h3>
                <p>
                  When you use our Services, we may collect:
                </p>
                <ul className="list-disc pl-6 mb-3">
                  <li>Log data (IP address, browser type, pages visited, time spent)</li>
                  <li>Device information (device type, operating system, unique device identifiers)</li>
                  <li>Usage information (quiz performance, learning patterns, preferences)</li>
                  <li>Location information (approximate location derived from IP address)</li>
                  <li>Cookies and similar technologies</li>
                </ul>
              </section>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">3. How We Use Your Information</h2>
                <p>
                  We use the information we collect for various purposes, including to:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Provide, maintain, and improve our Services</li>
                  <li>Personalize your learning experience</li>
                  <li>Process transactions and manage your account</li>
                  <li>Communicate with you about our Services</li>
                  <li>Monitor and analyze usage and trends</li>
                  <li>Detect and prevent fraud, spam, and security incidents</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">4. Sharing of Information</h2>
                <p>
                  We may share your information with:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Other users (for social features, leaderboards)</li>
                  <li>Service providers (hosting, analytics, payment processing)</li>
                  <li>Business partners (with your consent)</li>
                  <li>Legal authorities (when required by law)</li>
                  <li>In connection with a business transaction (merger, acquisition, sale)</li>
                </ul>
              </section>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">5. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">6. Your Rights and Choices</h2>
                <p>
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Access to your personal information</li>
                  <li>Correction of inaccurate information</li>
                  <li>Deletion of your information</li>
                  <li>Restriction of processing</li>
                  <li>Data portability</li>
                  <li>Objection to processing</li>
                </ul>
                <p>
                  To exercise these rights, please contact us using the information in Section 10.
                </p>
              </section>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">7. Children's Privacy</h2>
                <p>
                  Our Services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will promptly delete that information.
                </p>
              </section>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">8. International Data Transfers</h2>
                <p>
                  Your information may be transferred to and processed in countries other than the country you reside in. These countries may have different data protection laws. We will take appropriate measures to ensure that your personal information remains protected in accordance with this Privacy Policy.
                </p>
              </section>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">9. Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated Privacy Policy on our website or through other communications. Your continued use of our Services after such changes constitutes your acceptance of the new Privacy Policy.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-2">10. Contact Information</h2>
                <p>
                  If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
                </p>
                <p>
                  Email: privacy@brainwavequiz.com<br />
                  Address: 123 Learning Street, Knowledge City, CA 94321
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
