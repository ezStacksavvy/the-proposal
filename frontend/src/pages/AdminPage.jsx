import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Heart, Clock, User, TrendingUp, RefreshCw } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
const API = `${BACKEND_URL}/api`;

const AdminPage = () => {
  const [responses, setResponses] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch responses and stats
      const [responsesRes, statsRes] = await Promise.all([
        axios.get(`${API}/confession/responses`),
        axios.get(`${API}/confession/stats`)
      ]);
      
      setResponses(responsesRes.data);
      setStats(statsRes.data);
    } catch (err) {
      setError('Failed to fetch data. Make sure backend is running and MongoDB is connected.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-peach-50">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Loading responses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-peach-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            💕 Response Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            View all confession responses
          </p>
          <Button 
            onClick={fetchData}
            className="mt-4"
            variant="outline"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <Card className="p-6 mb-8 bg-destructive/10 border-destructive/30">
            <p className="text-destructive font-medium">{error}</p>
          </Card>
        )}

        {/* Statistics */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/20 rounded-full">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Responses</p>
                  <p className="text-3xl font-bold text-foreground">{stats.total_responses}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-200 rounded-full">
                  <Heart className="w-6 h-6 text-green-700 fill-green-700" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Said "Yes!"</p>
                  <p className="text-3xl font-bold text-green-700">{stats.yes_count}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-200 rounded-full">
                  <Clock className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Need Time</p>
                  <p className="text-3xl font-bold text-amber-700">{stats.maybe_count}</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Responses List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground mb-6">All Responses</h2>
          
          {responses.length === 0 ? (
            <Card className="p-12 text-center">
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-lg text-muted-foreground">No responses yet</p>
              <p className="text-sm text-muted-foreground mt-2">
                Waiting for someone special to answer...
              </p>
            </Card>
          ) : (
            responses.map((response, index) => (
              <Card 
                key={response.id} 
                className={`p-6 transition-all duration-300 hover:shadow-lg ${
                  response.response === 'yes' 
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
                    : 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`p-3 rounded-full ${
                      response.response === 'yes' 
                        ? 'bg-green-200' 
                        : 'bg-amber-200'
                    }`}>
                      {response.response === 'yes' ? (
                        <Heart className="w-6 h-6 text-green-700 fill-green-700" />
                      ) : (
                        <Clock className="w-6 h-6 text-amber-700" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-2xl font-bold ${
                          response.response === 'yes' 
                            ? 'text-green-700' 
                            : 'text-amber-700'
                        }`}>
                          {response.response === 'yes' ? 'Yes, Forever! 💕' : 'Need Time 🤔'}
                        </span>
                      </div>
                      
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{formatDate(response.timestamp)}</span>
                        </div>
                        {response.user_agent && (
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span className="truncate max-w-md">
                              {response.user_agent.includes('Mobile') ? '📱 Mobile' : '💻 Desktop'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    #{responses.length - index}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Latest Response Highlight */}
        {stats?.latest_response && (
          <Card className="mt-12 p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/30">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Latest Response</p>
              <p className={`text-3xl font-bold mb-2 ${
                stats.latest_response.response === 'yes' 
                  ? 'text-green-700' 
                  : 'text-amber-700'
              }`}>
                {stats.latest_response.response === 'yes' ? 'Yes, Forever! 💕' : 'Need Time 🤔'}
              </p>
              <p className="text-sm text-muted-foreground">
                {formatDate(stats.latest_response.timestamp)}
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
