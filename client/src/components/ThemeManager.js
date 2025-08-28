import React, { useState } from 'react';

function ThemeManager({ currentTheme, onThemeChange }) {
  const [showCustomTheme, setShowCustomTheme] = useState(false);
  const [customColors, setCustomColors] = useState({
    background: currentTheme.background,
    color: currentTheme.color,
    cardBackground: currentTheme.cardBackground,
    buttonBg: currentTheme.buttonBg,
    buttonHover: currentTheme.buttonHover,
    cardShadow: currentTheme.cardShadow
  });

  // Predefined themes
  const predefinedThemes = {
    default: {
      name: 'Default',
      background: '#989dbc',
      color: '#000000',
      cardBackground: '#ffffff',
      buttonBg: '#6e569c',
      buttonHover: '#9e5555',
      cardShadow: '0 4px 8px rgba(0,0,0,0.1)'
    },
    dark: {
      name: 'Dark Mode',
      background: '#121212',
      color: '#ffffff',
      cardBackground: '#1e1e1e',
      buttonBg: '#bb86fc',
      buttonHover: '#9b6ce9',
      cardShadow: '0 4px 8px rgba(0,0,0,0.5)'
    },
    ocean: {
      name: 'Ocean Blue',
      background: '#e3f2fd',
      color: '#1565c0',
      cardBackground: '#ffffff',
      buttonBg: '#1976d2',
      buttonHover: '#1565c0',
      cardShadow: '0 4px 8px rgba(25, 118, 210, 0.2)'
    },
    forest: {
      name: 'Forest Green',
      background: '#e8f5e8',
      color: '#2e7d32',
      cardBackground: '#ffffff',
      buttonBg: '#388e3c',
      buttonHover: '#2e7d32',
      cardShadow: '0 4px 8px rgba(46, 125, 50, 0.2)'
    },
    sunset: {
      name: 'Sunset Orange',
      background: '#fff3e0',
      color: '#e65100',
      cardBackground: '#ffffff',
      buttonBg: '#ff9800',
      buttonHover: '#f57c00',
      cardShadow: '0 4px 8px rgba(255, 152, 0, 0.2)'
    },
    lavender: {
      name: 'Lavender',
      background: '#f3e5f5',
      color: '#7b1fa2',
      cardBackground: '#ffffff',
      buttonBg: '#9c27b0',
      buttonHover: '#7b1fa2',
      cardShadow: '0 4px 8px rgba(156, 39, 176, 0.2)'
    },
    minimal: {
      name: 'Minimal',
      background: '#fafafa',
      color: '#424242',
      cardBackground: '#ffffff',
      buttonBg: '#757575',
      buttonHover: '#616161',
      cardShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }
  };

  const handleThemeSelect = (themeKey) => {
    onThemeChange(predefinedThemes[themeKey]);
    setShowCustomTheme(false);
  };

  const handleCustomColorChange = (property, value) => {
    setCustomColors(prev => ({
      ...prev,
      [property]: value
    }));
  };

  const applyCustomTheme = () => {
    onThemeChange(customColors);
    setShowCustomTheme(false);
  };

  const resetToDefault = () => {
    onThemeChange(predefinedThemes.default);
    setCustomColors(predefinedThemes.default);
    setShowCustomTheme(false);
  };

  return (
    <div style={{
      backgroundColor: currentTheme.cardBackground,
      padding: '20px',
      borderRadius: '10px',
      boxShadow: currentTheme.cardShadow,
      marginBottom: '20px',
      border: `1px solid ${currentTheme.color}20`
    }}>
      <h2 style={{ 
        marginTop: 0, 
        color: currentTheme.color, 
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        🎨 Theme Manager
      </h2>

      {/* Predefined Themes */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: currentTheme.color, marginBottom: '15px' }}>Predefined Themes</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '10px'
        }}>
          {Object.entries(predefinedThemes).map(([key, theme]) => (
            <button
              key={key}
              onClick={() => handleThemeSelect(key)}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '2px solid transparent',
                backgroundColor: theme.background,
                color: theme.color,
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.borderColor = theme.buttonBg;
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.borderColor = 'transparent';
              }}
            >
              <div style={{ fontSize: '14px' }}>{theme.name}</div>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '4px',
                marginTop: '8px'
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: theme.buttonBg
                }}></div>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: theme.buttonHover
                }}></div>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: theme.cardBackground,
                  border: `1px solid ${theme.color}40`
                }}></div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Theme Toggle */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          onClick={() => setShowCustomTheme(!showCustomTheme)}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: currentTheme.buttonBg,
            color: '#ffffff',
            cursor: 'pointer',
            fontWeight: 'bold',
            marginRight: '10px'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = currentTheme.buttonHover}
          onMouseOut={(e) => e.target.style.backgroundColor = currentTheme.buttonBg}
        >
          {showCustomTheme ? 'Hide Custom Theme' : 'Create Custom Theme'}
        </button>

        <button
          onClick={resetToDefault}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#6c757d',
            color: '#ffffff',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
        >
          Reset to Default
        </button>
      </div>

      {/* Custom Theme Editor */}
      {showCustomTheme && (
        <div style={{
          backgroundColor: `${currentTheme.color}10`,
          padding: '20px',
          borderRadius: '8px',
          border: `1px solid ${currentTheme.color}30`
        }}>
          <h3 style={{ color: currentTheme.color, marginBottom: '15px' }}>Custom Theme Editor</h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px'
          }}>
            {/* Background Color */}
            <div>
              <label style={{ color: currentTheme.color, fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
                Background Color
              </label>
              <input
                type="color"
                value={customColors.background}
                onChange={(e) => handleCustomColorChange('background', e.target.value)}
                style={{
                  width: '100%',
                  height: '40px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              />
            </div>

            {/* Text Color */}
            <div>
              <label style={{ color: currentTheme.color, fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
                Text Color
              </label>
              <input
                type="color"
                value={customColors.color}
                onChange={(e) => handleCustomColorChange('color', e.target.value)}
                style={{
                  width: '100%',
                  height: '40px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              />
            </div>

            {/* Card Background */}
            <div>
              <label style={{ color: currentTheme.color, fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
                Card Background
              </label>
              <input
                type="color"
                value={customColors.cardBackground}
                onChange={(e) => handleCustomColorChange('cardBackground', e.target.value)}
                style={{
                  width: '100%',
                  height: '40px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              />
            </div>

            {/* Button Background */}
            <div>
              <label style={{ color: currentTheme.color, fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
                Button Background
              </label>
              <input
                type="color"
                value={customColors.buttonBg}
                onChange={(e) => handleCustomColorChange('buttonBg', e.target.value)}
                style={{
                  width: '100%',
                  height: '40px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              />
            </div>

            {/* Button Hover */}
            <div>
              <label style={{ color: currentTheme.color, fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
                Button Hover
              </label>
              <input
                type="color"
                value={customColors.buttonHover}
                onChange={(e) => handleCustomColorChange('buttonHover', e.target.value)}
                style={{
                  width: '100%',
                  height: '40px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              />
            </div>
          </div>

          {/* Preview */}
          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: currentTheme.color, marginBottom: '10px' }}>Preview</h4>
            <div style={{
              backgroundColor: customColors.background,
              color: customColors.color,
              padding: '15px',
              borderRadius: '8px',
              border: `1px solid ${customColors.color}30`
            }}>
              <div style={{
                backgroundColor: customColors.cardBackground,
                padding: '10px',
                borderRadius: '5px',
                marginBottom: '10px'
              }}>
                Sample Card Content
              </div>
              <button style={{
                backgroundColor: customColors.buttonBg,
                color: '#ffffff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '5px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
                             onMouseOver={(e) => e.target.style.backgroundColor = customColors.buttonHover}
               onMouseOut={(e) => e.target.style.backgroundColor = customColors.buttonBg}
              >
                Sample Button
              </button>
            </div>
          </div>

          {/* Apply Button */}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button
              onClick={applyCustomTheme}
              style={{
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: currentTheme.buttonBg,
                color: '#ffffff',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '16px'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = currentTheme.buttonHover}
              onMouseOut={(e) => e.target.style.backgroundColor = currentTheme.buttonBg}
            >
              Apply Custom Theme
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ThemeManager;
