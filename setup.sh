#!/bin/sh

VENV_DIR=".venv"

if [ ! -d "$VENV_DIR" ]; then
    python3 -m venv "$VENV_DIR"
fi

if [ "$SHELL" = "/usr/bin/fish" ] || [ "$SHELL" = "/bin/fish" ]; then
    source .venv/bin/activate.fish
else
    source .venv/bin/activate
fi

pip install -r requirements.txt

gdown "https://drive.google.com/uc?id=1byaobaQrP0cLk_pkpZwYN2sVKwgnS5qP" -O data/speeches.json

deactivate
