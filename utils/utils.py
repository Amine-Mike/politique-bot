import unicodedata
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem.snowball import FrenchStemmer

nltk.download("punkt_tab")
nltk.download("stopwords")

stop_words = set(stopwords.words("french"))
custom_stop_words = {
    "jour",
    "'",
    "nest",
    "a",
    "si",
    "à",
    "ça",
    "q",
    "r",
    "dune",
    "dun",
    "cest",
    "cette",
    "donc",
    "quil",
    "comme",
    "mais",
    "pourquoi",
    "parceque",
    "voici",
    "etc",
    "chose",
    "aussi",
    "tous",
    "toutes",
    "tout",
    "toute",
    "cela",
    "ceci",
    "ceux",
    "celles",
}
stop_words.update(custom_stop_words)

TO_DELETE = "`',!?’.:%;()[]{}<>\"\\/\n\r\t"
stemmer = FrenchStemmer()


def preprocess_text(text):
    text = unicodedata.normalize("NFC", text)
    text = text.lower()
    text = re.sub(rf"[{re.escape(TO_DELETE)}]", " ", text)
    text = "".join([i for i in text if not i.isdigit()])
    text = re.sub(r"\s+", " ", text).strip()
    return text


def tokenise(text):
    tokens = nltk.word_tokenize(text, language="french")
    tokens = [word for word in tokens if word not in stop_words]
    tokens = [stemmer.stem(token) for token in tokens]
    return tokens
