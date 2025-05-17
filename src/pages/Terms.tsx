
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Terms = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="border-b">
              <CardTitle className="text-2xl">Terms of Service</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none pt-6">
              <p className="text-sm text-muted-foreground mb-4">
                Last updated: May 15, 2025
              </p>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
                <p>
                  Welcome to BrainWave Quiz ("we," "our," or "us"). By accessing or using our website, mobile application, and services (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). Please read these Terms carefully before using our Services.
                </p>
              </section>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">2. Eligibility</h2>
                <p>
                  You must be at least 13 years of age to use our Services. If you are under 18, you must have parental consent to use our Services. By using our Services, you represent and warrant that you meet these eligibility requirements.
                </p>
              </section>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">3. Account Registration</h2>
                <p>
                  To access certain features of our Services, you may need to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
                </p>
                <p>
                  You are responsible for safeguarding your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                </p>
              </section>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">4. User Content</h2>
                <p>
                  Our Services may allow you to create, post, or share content ("User Content"). You retain ownership of your User Content, but you grant us a non-exclusive, transferable, sub-licensable, royalty-free, worldwide license to use, modify, publicly display, and distribute such User Content on and through our Services.
                </p>
                <p>
                  You represent and warrant that:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>You own or have the necessary rights to your User Content;</li>
                  <li>Your User Content does not violate the rights of any third party;</li>
                  <li>Your User Content complies with these Terms and all applicable laws.</li>
                </ul>
              </section>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">5. Prohibited Conduct</h2>
                <p>
                  You agree not to:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Use our Services for any illegal purpose;</li>
                  <li>Violate any applicable laws or regulations;</li>
                  <li>Impersonate any person or entity;</li>
                  <li>Harass, abuse, or harm another person;</li>
                  <li>Interfere with or disrupt our Services;</li>
                  <li>Attempt to gain unauthorized access to our Services;</li>
                  <li>Use automated means to access or collect data from our Services without our prior written consent.</li>
                </ul>
              </section>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">6. Intellectual Property</h2>
                <p>
                  Our Services and all content, features, and functionality thereof (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by us, our licensors, or other providers of such material and are protected by copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
              </section>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">7. Subscription and Fees</h2>
                <p>
                  We offer various subscription plans, including free and premium options. For premium subscriptions, you agree to pay all fees in accordance with the pricing and billing terms in effect at the time of your subscription. You are responsible for providing valid payment information and for all charges incurred.
                </p>
              </section>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">8. Termination</h2>
                <p>
                  We may terminate or suspend your account and access to our Services at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
                </p>
              </section>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">9. Disclaimer of Warranties</h2>
                <p>
                  Our Services are provided "as is" and "as available" without any warranties of any kind, either express or implied. We disclaim all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
                </p>
              </section>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">10. Limitation of Liability</h2>
                <p>
                  In no event shall we be liable for any indirect, special, incidental, consequential, or punitive damages, including but not limited to loss of profits, data, use, or goodwill, arising out of or in connection with these Terms or your use of our Services.
                </p>
              </section>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">11. Changes to Terms</h2>
                <p>
                  We may modify these Terms at any time. We will notify you of any material changes by posting the updated Terms on our website or through other communications. Your continued use of our Services after such changes constitutes your acceptance of the new Terms.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-2">12. Contact Information</h2>
                <p>
                  If you have any questions about these Terms, please contact us at legal@brainwavequiz.com.
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

export default Terms;
