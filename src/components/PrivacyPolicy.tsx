import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Shield, Lock, Globe, Clock, Bell, Users } from 'lucide-react';
import { AlertCircle, FileText, Key, Settings } from 'lucide-react';

interface ContentItem {
  subtitle?: string;
  text: string;
  bullets?: string[];
}

interface Section {
  id: string;
  title: string;
  icon: JSX.Element;
  content: ContentItem[];
}

const PrivacyPolicy = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };



  const sections: Section[] = [
    {
      id: 'collection',
      title: '1. What Information Do We Collect?',
      icon: <Shield className="w-6 h-6" />,
      content: [
        {
          subtitle: 'Personal Information You Provide',
          text: 'When you use our Services, you may voluntarily provide:',
          bullets: [
            'Name and email address (when signing in with Google, Apple, or other providers)',
            'Profile information and preferences',
            'Collaboration settings and shared content',
            'Payment information for premium features',
            'Communications with our support team'
          ]
        },
        {
          subtitle: 'Information Automatically Collected',
          text: 'When you use our Services, we automatically collect:',
          bullets: [
            'Device identifiers (type, model, OS version)',
            'IP address and network information',
            'Browser type and settings',
            'App usage statistics and interaction data',
            'Performance metrics and crash reports',
            'Approximate location (based on IP address)'
          ]
        },
        {
          subtitle: 'Cookies and Tracking',
          text: 'We use cookies and similar technologies to:',
          bullets: [
            'Maintain your session and preferences',
            'Analyze service usage and performance',
            'Enhance security and prevent fraud',
            'Provide personalized features',
            'Remember your login status'
          ]
        }
      ]
    },
    {
      id: 'processing',
      title: '2. How Do We Process Your Information?',
      icon: <Lock className="w-6 h-6" />,
      content: [
        {
          subtitle: 'Core Services',
          text: 'We process your information to:',
          bullets: [
            'Provide and improve our image generator services',
            'Power AI features and smart suggestions',
            'Enable collaboration and sharing features',
            'Process payments and subscriptions',
            'Authenticate users and maintain security',
            'Send important service notifications'
          ]
        },
        {
          subtitle: 'Legal Bases for Processing',
          text: 'We process your data under these legal bases:',
          bullets: [
            'Performance of our contract with you',
            'Your consent where required',
            'Our legitimate business interests',
            'Legal obligations we must comply with',
            'Protection of vital interests'
          ]
        }
      ]
    },
    {
      id: 'sharing',
      title: '3. Data Sharing and Third Parties',
      icon: <Users className="w-6 h-6" />,
      content: [
        {
          subtitle: 'Third-Party Service Providers',
          text: 'We share data with these trusted providers:',
          bullets: [
            'Cloud storage providers (AWS, Google Cloud)',
            'Analytics services (Google Analytics, PostHog)',
            'Payment processors (Stripe)',
            'Authentication providers (Auth0)',
            'Customer support tools (Zendesk)',
            'Email service providers (SendGrid)'
          ]
        },
        {
          subtitle: 'Data Protection Requirements',
          text: 'All third-party providers must:',
          bullets: [
            'Sign data processing agreements',
            'Maintain strict security standards',
            'Process data only for specified purposes',
            'Comply with privacy laws and regulations',
            'Support data subject rights'
          ]
        }
      ]
    },
    {
      id: 'international',
      title: '4. International Data Transfers',
      icon: <Globe className="w-6 h-6" />,
      content: [
        {
          subtitle: 'Data Transfer Mechanisms',
          text: 'We protect international transfers through:',
          bullets: [
            'Standard Contractual Clauses (SCCs)',
            'Binding Corporate Rules',
            'Privacy Shield certification where applicable',
            'Data Transfer Impact Assessments',
            'Additional safeguards as required'
          ]
        },
        {
          subtitle: 'Storage Locations',
          text: 'Your data may be processed in:',
          bullets: [
            'United States',
            'European Union',
            'United Kingdom',
            'Other countries with adequate protection'
          ]
        }
      ]
    },
    {
      id: 'security',
      title: '5. Security Measures',
      icon: <Key className="w-6 h-6" />,
      content: [
        {
          subtitle: 'Technical Safeguards',
          text: 'We protect your data using:',
          bullets: [
            'End-to-end encryption for sensitive data',
            'Multi-factor authentication',
            'Regular security audits and testing',
            'Intrusion detection systems',
            'Automated backup systems'
          ]
        },
        {
          subtitle: 'Data Breach Procedures',
          text: 'In case of a data breach, we will:',
          bullets: [
            'Notify affected users within 72 hours',
            'Investigate and remediate the breach',
            'Inform relevant authorities',
            'Provide guidance on protecting your data',
            'Take steps to prevent future incidents'
          ]
        }
      ]
    },
    {
      id: 'rights',
      title: '6. Your Privacy Rights',
      icon: <FileText className="w-6 h-6" />,
      content: [
        {
          subtitle: 'GDPR Rights (EU/UK Users)',
          text: 'You have the right to:',
          bullets: [
            'Access your personal data',
            'Request data correction or deletion',
            'Restrict or object to processing',
            'Data portability',
            'Withdraw consent',
            'Lodge complaints with authorities'
          ]
        },
        {
          subtitle: 'CCPA Rights (California Users)',
          text: 'California residents can:',
          bullets: [
            'Request data access and deletion',
            'Opt-out of data sales',
            'Non-discrimination protection',
            'Designate authorized agents',
            'Request data disclosure reports'
          ]
        }
      ]
    },
    {
      id: 'retention',
      title: '7. Data Retention',
      icon: <Clock className="w-6 h-6" />,
      content: [
        {
          subtitle: 'Retention Periods',
          text: 'We retain your data for:',
          bullets: [
            'Active accounts: As long as account is active',
            'Deleted accounts: 30 days after deletion',
            'Backups: Up to 90 days',
            'Legal requirements: As required by law',
            'Analytics: In anonymized form for up to 2 years'
          ]
        }
      ]
    },
    {
      id: 'children',
      title: '8. Children\'s Privacy',
      icon: <AlertCircle className="w-6 h-6" />,
      content: [
        {
          subtitle: 'Age Restrictions',
          text: 'Our service is not intended for children:',
          bullets: [
            'Minimum age requirement: 16 years',
            'No intentional collection of children\'s data',
            'Immediate deletion if discovered',
            'Parental consent requirements',
            'Special protections for young users'
          ]
        }
      ]
    },
    {
      id: 'changes',
      title: '9. Changes to Privacy Policy',
      icon: <Settings className="w-6 h-6" />,
      content: [
        {
          subtitle: 'Update Procedures',
          text: 'When we update this policy:',
          bullets: [
            'Notice of material changes',
            'Email notifications for significant updates',
            '30-day notice period when possible',
            'Version history maintained',
            'User consent for material changes'
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 px-6 py-8 text-white">
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
            <p className="mt-2 text-indigo-100">Last updated: February 1, 2025</p>
            <p className="mt-4 text-indigo-200">
              This privacy notice explains how Altvision collects and protects your information.
            </p>
          </div>

          {/* Table of Contents */}
          <nav className="p-6 bg-gray-50 border-b">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Table of Contents</h2>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Policy Content */}
          <div className="p-6 space-y-8">
            {sections.map((section) => (
              <div key={section.id} id={section.id} className="scroll-mt-6">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-indigo-600">
                      {section.icon}
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {section.title}
                    </h2>
                  </div>
                  {expandedSections[section.id] ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </button>

                {expandedSections[section.id] && (
                  <div className="mt-4 ml-4 space-y-6">
                    {section.content.map((item, index) => (
                      <div key={index} className="space-y-3">
                        {item.subtitle && (
                          <h3 className="text-lg font-medium text-gray-700">
                            {item.subtitle}
                          </h3>
                        )}
                        <p className="text-gray-600 leading-relaxed">
                          {item.text}
                        </p>
                        {item.bullets && (
                          <ul className="ml-6 space-y-2">
                            {item.bullets.map((bullet, bulletIndex) => (
                              <li
                                key={bulletIndex}
                                className="text-gray-600 leading-relaxed list-disc"
                              >
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Contact Us About Privacy
            </h2>
            <div className="space-y-2 text-gray-600">
              <p>If you have any questions about this Privacy Policy, please contact us:</p>
              <p>• Email: privacy@cstate.se</p>
              <p>• Support: support@cstate.se</p>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              2024 © State Creative
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;