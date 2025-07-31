#!/bin/sh

if [ ! -d ".venv" ]; then
    python3 -m venv .venv
fi

if [ "$SHELL" = "/usr/bin/fish" ] || [ "$SHELL" = "/bin/fish" ]; then
    source .venv/bin/activate.fish
else
    source .venv/bin/activate
fi

pip install -r requirements.txt

saved_models/get_models.sh
python3 backend/app.py
