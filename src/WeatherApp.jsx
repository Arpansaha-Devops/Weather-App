import React, { useState, useEffect } from 'react';

export default function WeatherApp() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    fetchWeather('Paris');
  }, []);

  const fetchWeather = async (cityName) => {
    if (!cityName.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('City not found');
      }
      
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const getWeatherIcon = (iconCode) => {
    const iconMap = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️'
    };
    return iconMap[iconCode] || '🌡️';
  };

  const getBackgroundGradient = () => {
    if (!weather) return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    
    const temp = weather.main.temp;
    if (temp > 25) return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
    if (temp > 15) return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
    if (temp > 5) return 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
    return 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)';
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: getBackgroundGradient(),
      transition: 'background 0.8s ease',
      fontFamily: "'Playfair Display', serif",
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.1)',
        filter: 'blur(60px)',
        animation: 'float 20s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '-5%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.08)',
        filter: 'blur(80px)',
        animation: 'float 25s ease-in-out infinite reverse'
      }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@300;400;600&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .weather-card {
          animation: slideUp 0.6s ease-out;
        }
        
        .detail-card {
          animation: fadeIn 0.8s ease-out;
          animation-fill-mode: both;
        }
        
        .detail-card:nth-child(1) { animation-delay: 0.1s; }
        .detail-card:nth-child(2) { animation-delay: 0.2s; }
        .detail-card:nth-child(3) { animation-delay: 0.3s; }
        .detail-card:nth-child(4) { animation-delay: 0.4s; }
      `}</style>

      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <header style={{
          textAlign: 'center',
          marginBottom: '3rem',
          animation: 'fadeIn 0.8s ease-out'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: 900,
            color: 'white',
            marginBottom: '0.5rem',
            letterSpacing: '0.02em',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            fontFamily: "'Playfair Display', serif"
          }}>
            Atmosphère
          </h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '1.1rem',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 300,
            letterSpacing: '0.3em',
            textTransform: 'uppercase'
          }}>
            Your Personal Weather Companion
          </p>
        </header>

        {/* Search Form */}
        <form onSubmit={handleSubmit} style={{
          marginBottom: '3rem',
          animation: 'fadeIn 1s ease-out 0.2s both'
        }}>
          <div style={{
            display: 'flex',
            gap: '1rem',
            maxWidth: '600px',
            margin: '0 auto',
            flexWrap: 'wrap'
          }}>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter a city..."
              style={{
                flex: 1,
                minWidth: '200px',
                padding: '1.2rem 1.5rem',
                fontSize: '1rem',
                border: 'none',
                borderRadius: '50px',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                outline: 'none',
                fontFamily: "'Poppins', sans-serif",
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.transform = 'scale(1.02)';
                e.target.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
              }}
            />
            <button
              type="submit"
              style={{
                padding: '1.2rem 2.5rem',
                fontSize: '1rem',
                fontWeight: 600,
                border: 'none',
                borderRadius: '50px',
                background: 'white',
                color: '#667eea',
                cursor: 'pointer',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                fontFamily: "'Poppins', sans-serif",
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
              }}
            >
              Search
            </button>
          </div>
        </form>

        {/* Loading State */}
        {loading && (
          <div style={{
            textAlign: 'center',
            color: 'white',
            fontSize: '1.2rem',
            padding: '3rem',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 300
          }}>
            Loading...
          </div>
        )}

        {/* Error State */}
        {error && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '2rem',
            borderRadius: '30px',
            textAlign: 'center',
            color: '#e74c3c',
            fontSize: '1.1rem',
            fontFamily: "'Poppins', sans-serif",
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Weather Display */}
        {weather && !loading && (
          <div className="weather-card">
            {/* Main Weather Card */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '40px',
              padding: '3rem',
              marginBottom: '2rem',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{
                textAlign: 'center',
                marginBottom: '2rem'
              }}>
                <h2 style={{
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  fontWeight: 700,
                  color: '#2c3e50',
                  marginBottom: '0.5rem',
                  fontFamily: "'Playfair Display', serif"
                }}>
                  {weather.name}, {weather.sys.country}
                </h2>
                <p style={{
                  color: '#7f8c8d',
                  fontSize: '0.95rem',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 300
                }}>
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '3rem',
                marginBottom: '2rem',
                flexWrap: 'wrap'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: 'clamp(6rem, 12vw, 10rem)',
                    fontWeight: 900,
                    color: '#2c3e50',
                    lineHeight: 1,
                    fontFamily: "'Playfair Display', serif"
                  }}>
                    {Math.round(weather.main.temp)}°
                  </div>
                  <div style={{
                    fontSize: '1.3rem',
                    color: '#7f8c8d',
                    marginTop: '1rem',
                    textTransform: 'capitalize',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 300
                  }}>
                    {weather.weather[0].description}
                  </div>
                </div>
                <div style={{
                  fontSize: '8rem',
                  filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.1))'
                }}>
                  {getWeatherIcon(weather.weather[0].icon)}
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem'
            }}>
              {[
                { label: 'Feels Like', value: `${Math.round(weather.main.feels_like)}°C`, icon: '🌡️' },
                { label: 'Humidity', value: `${weather.main.humidity}%`, icon: '💧' },
                { label: 'Wind Speed', value: `${weather.wind.speed} m/s`, icon: '💨' },
                { label: 'Pressure', value: `${weather.main.pressure} hPa`, icon: '🎚️' }
              ].map((detail, index) => (
                <div
                  key={index}
                  className="detail-card"
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '25px',
                    padding: '2rem',
                    textAlign: 'center',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(10px)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <div style={{
                    fontSize: '2.5rem',
                    marginBottom: '0.5rem'
                  }}>
                    {detail.icon}
                  </div>
                  <div style={{
                    fontSize: '0.85rem',
                    color: '#7f8c8d',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600
                  }}>
                    {detail.label}
                  </div>
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: '#2c3e50',
                    fontFamily: "'Playfair Display', serif"
                  }}>
                    {detail.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}