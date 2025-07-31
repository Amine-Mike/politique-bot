# Politique-bot

Politique-bot is an AI-powered NLP (Natural Language Processing) model designed to classify French political speeches and generate speeches for a specific political party. This project marks my first venture into the world of NLP and AI, and I’m excited to share it as a demonstration of how AI can analyze and generate political discourse.

The bot can classify a given speech into the political party it most likely represents and generate a speech that reflects the ideologies and tone of a particular political party.

## Features

- **Speech Classification**: Given a speech, the bot can classify it into the correct political party category (e.g., left-wing, right-wing, etc.).
- **Speech Generation**: Based on a specified political party, the bot can generate a speech that reflects the style, tone, and content typically associated with that party.

## How it Works

### **Speech Classification**
   - The bot uses an LSTM (Long Short-Term Memory) model that I implemented with **Keras** to classify a speech, ideally limited to 5000 characters. This character limit was chosen due to hardware constraints, though it could be adjusted for larger datasets and more powerful environments.

### **Speech Generation**
   - The bot leverages a **GPT-2** based transformer model to generate a random speech of 1024 tokens for the selected political party. Again, this token limit was chosen for performance reasons, but it can be adapted depending on the hardware available.

## Try the Models

### Prerequisites

- Python 3.x
- Node.js (for running the React frontend)

### Launch Instructions

To test the models, I have created a small web app for easier interaction. Follow these steps to launch both the backend and frontend:

#### **Start the Backend**  
To launch the backend server, run:
```bash
./launch_backend.sh
```

#### **Start the Frontend**

Once the backend is running and listening on port 8000, you can start the frontend by running:

```bash
./launch_frontend.sh
```

This will launch the React frontend on port 3000.
