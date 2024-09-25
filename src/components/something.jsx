import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Subscriptions from './Subsription';
import PropertyViewHistory from './PropertyHistory';
const UserDashboard = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const [activeTab, setActiveTab] = useState('home');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please log in to view your dashboard.</div>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="bg-black rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <img
                src={user?.picture}
                alt="Profile"
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <p className="text-white">{user?.email}</p>
              </div>
            </div>
            <div className="bg-black rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-2">Liked Houses</h3>
              <p className="text-3xl font-bold text-blue-600">4</p>
            </div>
          </div>
        );
      case 'billing':
        return (
          <div className="bg-black rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Billing / Subscription</h2>
            <p>Your subscription details and billing information will appear here.</p>
            <Subscriptions />
          </div>
        );
      case 'history':
        return (
          <div className="bg-black rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Property History</h2>
            <p>Your property viewing and interaction history will appear here.</p>
            <PropertyViewHistory />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black p-8">
          <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 p-1 rounded-lg">
                  <div className="bg-black rounded-lg">
                  <button
          onClick={() => logout({ returnTo: window.location.origin })}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
              Log Out
          </button>
                      <div className="flex border-b">
                          {['home', 'billing', 'history'].map((tab) => (
                              <button
                                  key={tab}
                                  className={`px-4 py-2 font-semibold ${activeTab === tab
                                          ? 'text-blue-600 border-b-2 border-blue-600'
                                          : 'text-gray-600 hover:text-blue-600'}`}
                                  onClick={() => setActiveTab(tab)}
                              >
                                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                              </button>
                          ))}
                      </div>
                      <div className="p-6">{renderTabContent()}</div>
                  </div>
              </div>
          </div>
          </div>
         
    
     
    
  );
};

export default UserDashboard;