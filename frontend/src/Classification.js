import { useState } from 'react';

function Classification() {
  const [speech, setSpeech] = useState('');
  const [loading, setLoading] = useState(false);
  const [politicalParty, setPoliticalParty] = useState('');
  const [error, setError] = useState('');

  const classifySpeech = async () => {
    if (!speech.trim()) {
      setError('Please enter a speech.');
      return;
    }

    setLoading(true);
    setError('');
    setPoliticalParty('');

    try {
      const response = await fetch('http://localhost:8000/classify/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ speech }),
      });

      if (!response.ok) {
        throw new Error('Failed to classify the speech');
      }

      const data = await response.json();
      setPoliticalParty(data.party);
    } catch (error) {
      setError('Error classifying speech');
      console.error('Error:', error);
    }

    setLoading(false);
  };

  return (
    <div className="classification-container">
      <h3>Enter the speech you wish to classify.</h3>
      <h3>For optimal results, use speeches that are approximately 5000 characters long.</h3>

      <textarea
        value={speech}
        onChange={(e) => setSpeech(e.target.value)}
        rows="6"
        cols="50"
        placeholder="Enter the speech here"
        className="speech-input"
      />

      {error && <div className="error-message">{error}</div>}

      <button
        onClick={classifySpeech}
        className="classify-btn"
        disabled={loading}
      >
        {loading ? 'Classifying...' : 'Classify Speech'}
      </button>

      {politicalParty && (
        <div className="result">
          <h3>Classified Political Party:</h3>
          <p>{politicalParty}</p>
        </div>
      )}
    </div>
  );
}

export default Classification;
