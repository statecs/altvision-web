import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ContentItem {
  subtitle: string;
  text: string;
}

interface Section {
  id: string;
  title: string;
  content: ContentItem[];
}

interface ExpandedSections {
  [key: string]: boolean;
}

const TermsOfUse = () => {
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({});

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const sections: Section[] = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: [
        {
          subtitle: '1.1 Scope of Services',
          text: 'Our Services include the Altvision web applications, AI-powered image generator features, cloud storage, and all related tools and services provided by Altvision.'
        },
        {
          subtitle: '1.2 Agreement Documents',
          text: 'These Terms of Use and our Privacy Policy constitute the entire agreement between you and Altvision. Both documents are legally binding and govern your use of our services.'
        },
        {
          subtitle: '1.3 Privacy Policy',
          text: 'Our Privacy Policy, available at altvision.cstate.com/privacy, details our data collection, usage, storage, and protection practices. It is an integral part of these terms.'
        },
        {
          subtitle: '1.4 Acceptance',
          text: 'By using Altvision, you confirm that you are at least 18 years old, legally capable of entering into contracts, and agree to these terms.'
        }
      ]
    },
    {
      id: 'user-rights',
      title: '2. User Rights and Responsibilities',
      content: [
        {
          subtitle: '2.1 Account Creation',
          text: 'You must provide accurate information when creating an account and are responsible for maintaining its security. Each user is limited to one account.'
        },
        {
          subtitle: '2.2 Acceptable Use',
          text: 'You agree to use our services legally and appropriately, without harming others or interfering with service operation.'
        },
        {
          subtitle: '2.3 Content Rights',
          text: 'You retain ownership of your content but grant us a worldwide, non-exclusive license to host, store, and process it for service provision.'
        }
      ]
    },
    {
      id: 'prohibited',
      title: '3. Prohibited Activities',
      content: [
        {
          subtitle: '3.1 Forbidden Actions',
          text: 'Users may not: violate laws, harass others, distribute malware, attempt unauthorized access, or impersonate others.'
        },
        {
          subtitle: '3.2 Content Restrictions',
          text: 'Prohibited content includes: illegal material, infringing content, malicious code, and harmful content.'
        },
        {
          subtitle: '3.3 Technical Restrictions',
          text: 'Users may not reverse engineer the service, bypass security measures, or attempt to exceed usage limits.'
        }
      ]
    },
    {
      id: 'payments',
      title: '4. Payments and Subscriptions',
      content: [
        {
          subtitle: '4.1 Pricing',
          text: 'Subscription fees are billed in advance on a recurring basis. We reserve the right to change pricing with notice.'
        },
        {
          subtitle: '4.2 Refunds',
          text: 'Subscriptions are generally non-refundable. Refund requests are evaluated case by case and may be granted at our discretion.'
        },
        {
          subtitle: '4.3 Cancellation',
          text: 'You may cancel your subscription at any time. Access continues until the end of the current billing period.'
        }
      ]
    },
    {
      id: 'intellectual-property',
      title: '5. Intellectual Property',
      content: [
        {
          subtitle: '5.1 Ownership',
          text: 'Altvision and its features remain our exclusive property. All trademarks, copyrights, and other intellectual property rights are reserved.'
        },
        {
          subtitle: '5.2 License',
          text: 'We grant you a limited, non-transferable license to use our services for their intended purpose.'
        },
        {
          subtitle: '5.3 User Content',
          text: 'You retain ownership of your content while granting us necessary rights to provide our services.'
        }
      ]
    },
    {
      id: 'liability',
      title: '6. Limitation of Liability',
      content: [
        {
          subtitle: '6.1 Disclaimer',
          text: 'Services are provided "as is" without warranties of any kind, express or implied.'
        },
        {
          subtitle: '6.2 Limitations',
          text: 'We are not liable for indirect, consequential, or incidental damages. Our total liability is limited to fees paid in the last 12 months.'
        },
        {
          subtitle: '6.3 Indemnification',
          text: 'You agree to indemnify us against claims arising from your use of services or violation of these terms.'
        }
      ]
    },
    {
      id: 'termination',
      title: '7. Term and Termination',
      content: [
        {
          subtitle: '7.1 Duration',
          text: 'These terms remain in effect while you use our services.'
        },
        {
          subtitle: '7.2 Termination by User',
          text: 'You may terminate your account at any time by following account closure procedures.'
        },
        {
          subtitle: '7.3 Termination by Company',
          text: 'We may suspend or terminate accounts for violations, extended inactivity, or at our discretion with reasonable notice.'
        }
      ]
    },
    {
      id: 'disputes',
      title: '8. Dispute Resolution',
      content: [
        {
          subtitle: '8.1 Governing Law',
          text: 'These terms are governed by Delaware law, without regard to conflict of law principles.'
        },
        {
          subtitle: '8.2 Arbitration',
          text: 'Disputes will be resolved through binding arbitration, except where prohibited by law.'
        },
        {
          subtitle: '8.3 Class Action Waiver',
          text: 'You waive any right to participate in class actions against us.'
        }
      ]
    },
    {
      id: 'data-privacy',
      title: '9. Data Privacy and Protection',
      content: [
        {
          subtitle: '9.1 GDPR Compliance',
          text: 'For EU users, we comply with GDPR requirements. You have rights to: access your data, request deletion, data portability, and restrict processing. Contact privacy@cstate.se for such requests.'
        },
        {
          subtitle: '9.2 Data Collection',
          text: 'We collect and process: account information, usage data, and interaction data. Collection is limited to what\'s necessary for service provision.'
        },
        {
          subtitle: '9.3 Data Retention',
          text: 'We retain your data for as long as your account is active or as needed for legal compliance. Deleted data is permanently removed after 30 days.'
        },
        {
          subtitle: '9.4 International Transfers',
          text: 'Data may be processed in countries outside your residence. We ensure appropriate safeguards through Standard Contractual Clauses and similar protections.'
        }
      ]
    },
    {
      id: 'security',
      title: '10. Security Measures',
      content: [
        {
          subtitle: '10.1 Account Security',
          text: 'Passwords must be at least 12 characters long and include mixed characters. Two-factor authentication is available and recommended.'
        },
        {
          subtitle: '10.2 Breach Notification',
          text: 'We will notify affected users within 72 hours of discovering any security breach that compromises personal data.'
        },
        {
          subtitle: '10.3 Encryption',
          text: 'All data is encrypted in transit and at rest using industry-standard protocols.'
        }
      ]
    },
    {
      id: 'ai-features',
      title: '11. AI Features and Usage',
      content: [
        {
          subtitle: '11.1 AI Processing',
          text: 'Our AI features process your images to provide alt text. This processing occurs on secure servers with anonymized data.'
        },
        {
          subtitle: '11.2 AI Training',
          text: 'We may use anonymized data to improve our AI systems. No personally identifiable information is used in training.'
        },
        {
          subtitle: '11.3 AI Limitations',
          text: 'AI features are provided "as is" and may not be 100% accurate. Users should review AI-generated content before relying on it.'
        }
      ]
    },
    {
      id: 'regional',
      title: '12. Regional Compliance',
      content: [
        {
          subtitle: '12.1 EU Users',
          text: 'EU users have additional rights under GDPR and can appoint our EU representative for data protection matters.'
        },
        {
          subtitle: '12.2 California Users',
          text: 'California residents have specific rights under CCPA/CPRA, including data access, deletion, and opt-out rights.'
        },
        {
          subtitle: '12.3 International Users',
          text: 'Users outside the US agree to comply with their local laws and acknowledge that some features may be restricted in certain regions.'
        }
      ]
    },
    {
      id: 'storage',
      title: '13. Data Storage and Backup',
      content: [
        {
          subtitle: '13.1 Image Storage',
          text: 'Images are stored in secure cloud facilities with redundant backups.'
        },
      ]
    },
    {
      id: 'collaboration',
      title: '14. Collaboration Features',
      content: [
        {
          subtitle: '14.1 Shared Images',
          text: 'When sharing images, you retain ownership while granting view/edit permissions to others. You can revoke access at any time.'
        },
      ]
    },
    {
      id: 'changes',
      title: '15. Changes to Terms',
      content: [
        {
          subtitle: '9.1 Updates',
          text: 'We may update these terms with notice through email, in-app notifications, or website posts.'
        },
        {
          subtitle: '9.2 Acceptance',
          text: 'Continued use after changes indicates acceptance of updated terms.'
        },
        {
          subtitle: '9.3 Material Changes',
          text: 'For material changes, we will seek explicit consent when required by law.'
        }
      ]
    }
    
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 px-6 py-8 text-white">
            <h1 className="text-3xl font-bold">Terms of Use</h1>
            <p className="mt-2 text-blue-100">Last updated: February 1, 2025</p>
          </div>

          {/* Terms Content */}
          <div className="p-6">
            {sections.map((section) => (
              <div key={section.id} className="mb-6">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between text-left py-3 px-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
                  {expandedSections[section.id] ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </button>

                {expandedSections[section.id] && (
                  <div className="mt-4 pl-4">
                    {section.content.map((item, index) => (
                      <div key={index} className="mb-4">
                        <h3 className="text-lg font-medium text-gray-700 mb-2">
                          {item.subtitle}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Contact Section */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Contact Us
              </h2>
              <div className="space-y-2 text-gray-600">
                <p>For any inquiries, please reach out to us:</p>
                <p>• General Questions & Support: support@cstate.se</p>
                <p>• Technical Support: tech@cstate.se</p>
                <p>• Privacy Concerns: privacy@cstate.se</p>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                2024 © State Creative
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;