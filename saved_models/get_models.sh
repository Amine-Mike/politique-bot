#!/bin/sh

if [ ! -d ".venv" ]; then
    cd ..
fi

if [ "$SHELL" = "/usr/bin/fish" ] || [ "$SHELL" = "/bin/fish" ]; then
    source .venv/bin/activate.fish
else
    source .venv/bin/activate
fi

gdown "https://drive.google.com/uc?id=1XJ23JmAMcIuABjXQCKj7JDA2hnGXS_zU" -O saved_models/models.tar.gz

tar xvf saved_models/models.tar.gz -C saved_models/
rm saved_models/models.tar.gz

deactivate
