import { useState } from 'react';

function Generation() {
  const [speech, setSpeech] = useState('');
  const [loading, setLoading] = useState(false);
  const [politicalParty, setPoliticalParty] = useState('');
  const [error, setError] = useState('');

  const politicalParties = [
    'Extreme gauche',
    'Gauche',
    'Centre',
    'Droite',
    'Extreme droite',
  ];

  const generateSpeech = async () => {
    if (!politicalParty) {
      setError('Please select a political party.');
      return;
    }

    setLoading(true);
    setError('');
    setSpeech('');

    try {
      const response = await fetch(`http://localhost:8000/generate/${encodeURIComponent(politicalParty.toLowerCase())}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to generate speech');
      }

      const data = await response.json();
      setSpeech(data.speech);
    } catch (error) {
      setSpeech('Error generating speech');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="generation-container">
      <h2>Select a political party to generate a speech.</h2>
      <h3>It may take some time on the first run.</h3>

      {/* Dropdown for selecting the political party */}
      <select
        value={politicalParty}
        onChange={(e) => setPoliticalParty(e.target.value)}
        className="party-select"
      >
        <option value="">Select a Political Party</option>
        {politicalParties.map((party, index) => (
          <option key={index} value={party}>{party}</option>
        ))}
      </select>

      {/* Error message */}
      {error && <div className="error-message">{error}</div>}

      {/* Generate Speech Button */}
      <button
        onClick={generateSpeech}
        className="generate-btn"
        disabled={loading}  // Disable button while loading
      >
        {loading ? 'Generating...' : 'Generate Speech'}
      </button>

      {/* Display the generated speech */}
      {speech && (
        <div className="speech-output">
          <h3>Generated Speech:</h3>
          <p>{speech}</p>
        </div>
      )}
    </div>
  );
}

export default Generation;
