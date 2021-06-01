import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Analytics from 'analytics'
import { AnalyticsProvider } from 'use-analytics'
import googleAnalytics from '@analytics/google-analytics'

const analytics = Analytics({
  app: 'snowplow',
  plugins: [
    {
    name: 'custom plugin',
    page: ({ payload }) => {
      console.log('page view fired', payload)
    },
    track: ({ payload }) => {
      console.log('track event payload', payload)
    },
    googleAnalytics: googleAnalytics({
      trackingId: '123-xyz'
    })
  }
]
})

console.log(analytics, 'analytics')

ReactDOM.render(
  <AnalyticsProvider instance={analytics}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AnalyticsProvider>,
  document.getElementById('root')
);

reportWebVitals();
