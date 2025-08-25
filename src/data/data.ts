import { History } from '@/services/history/history.interface';

export const listCurrentHistory: History[] = [
  {
    id: 1,
    timestamp: '2023-10-01T12:00:00Z',
    site_url: 'https://example.com',
    site_name: 'プロジェクトアルファ',
    view_type: '1920x1080',
    user_prompt: 'Analyze the performance of the homepage.',
    analysis_prompt: 'Analyze the homepage for performance issues.',
    ai_result: {
      overall_status: 'PASS',
      analysis: [
        {
          component: 'Header',
          status: 'PASS',
          reason: 'Header loaded successfully.',
          severity: 'minor'
        },
        {
          component: 'Footer',
          status: 'FAIL',
          reason: 'Footer took too long to load.',
          severity: 'critical'
        }
      ],
      fullAnalysisPrompt: 'Full analysis of the homepage.'
    },
    images: {
      baseline: '/images/baseline.png',
      current: '/images/current.png',
      diff: '/images/diff.png'
    },
    totalToken: 1500,
    totalHistory: 20
  },
  {
    id: 2,
    timestamp: '2023-10-02T12:00:00Z',
    site_url: 'https://example.org',
    site_name: 'プロジェクトベータ',
    view_type: '1280x720',
    user_prompt: 'Summarize the performance of the landing page.',
    analysis_prompt: 'Summarize the landing page performance.',
    ai_result: {
      overall_status: 'FAIL',
      analysis: [
        {
          component: 'Main Content',
          status: 'FAIL',
          reason: 'Main content took too long to load.',
          severity: 'critical'
        }
      ],
      fullAnalysisPrompt: 'Full analysis of the landing page.'
    },
    images: {
      baseline: '/images/baseline2.png',
      current: '/images/current2.png',
      diff: '/images/diff2.png'
    },
    totalToken: 2000,
    totalHistory: 15
  },
  {
    id: 3,
    timestamp: '2023-10-03T12:00:00Z',
    site_url: 'https://example.net',
    site_name: 'プロジェクトイプシロン',
    view_type: '1440x900',
    user_prompt: 'Analyze the performance of the contact page.',
    analysis_prompt: 'Analyze the contact page for performance issues.',
    ai_result: {
      overall_status: 'PASS',
      analysis: [
        {
          component: 'Contact Form',
          status: 'PASS',
          reason: 'Contact form loaded successfully.',
          severity: 'minor'
        }
      ],
      fullAnalysisPrompt: 'Full analysis of the contact page.'
    },
    images: {
      baseline: '/images/baseline3.png',
      current: '/images/current3.png',
      diff: '/images/diff3.png'
    },
    totalToken: 1800,
    totalHistory: 0
  },
  {
    id: 4,
    timestamp: '2023-10-04T12:00:00Z',
    site_url: 'https://example.edu',
    site_name: 'Example Edu',
    view_type: '1600x1200',
    user_prompt: 'Evaluate the performance of the about page.',
    analysis_prompt: 'Evaluate the about page for performance issues.',
    ai_result: {
      overall_status: 'PASS',
      analysis: [
        {
          component: 'Sidebar',
          status: 'PASS',
          reason: 'Sidebar loaded successfully.',
          severity: 'minor'
        }
      ],
      fullAnalysisPrompt: 'Full analysis of the about page.'
    },
    images: {
      baseline: '/images/baseline4.png',
      current: '/images/current4.png',
      diff: '/images/diff4.png'
    },
    totalToken: 1700,
    totalHistory: 21
  },
  {
    id: 5,
    timestamp: '2023-10-05T12:00:00Z',
    site_url: 'https://example.biz',
    site_name: 'Example Biz',
    view_type: '1920x1080',
    user_prompt: 'Analyze the performance of the services page.',
    analysis_prompt: 'Analyze the services page for performance issues.',
    ai_result: {
      overall_status: 'FAIL',
      analysis: [
        {
          component: 'Services List',
          status: 'FAIL',
          reason: 'Services list took too long to load.',
          severity: 'critical'
        }
      ],
      fullAnalysisPrompt: 'Full analysis of the services page.'
    },
    images: {
      baseline: '/images/baseline5.png',
      current: '/images/current5.png',
      diff: '/images/diff5.png'
    },
    totalToken: 1900,
    totalHistory: 9
  }
];
