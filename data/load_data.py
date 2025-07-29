"""
Speech Data Processing Module.
"""

import json
import pandas as pd


def anotate(path, df):
    """
    Annotate the speaker information in the dataframe based on a CSV file.

    Args:
        path (str): Path to the CSV file containing speaker annotations.
        df (pd.DataFrame): DataFrame to be annotated.

    Returns:
        pd.DataFrame: Annotated DataFrame with updated speaker information.
    """
    with open(path, "r", encoding="utf-8") as file:
        for line in file.readlines():
            line = line.split(",")
            speaker = line[0]
            political_range = line[1].strip("\n")
            df["speaker"] = df["speaker"].replace(speaker, political_range)
    return df


def clean_data(df):
    """
    Clean the DataFrame by filtering rows and handling missing data.

    Args:
        df (pd.DataFrame): DataFrame to be cleaned.

    Returns:
        pd.DataFrame: Cleaned DataFrame.
    """
    df = df[df["speaker"].apply(lambda x: x.isdigit())]
    df.loc[:, "speaker"] = df["speaker"].astype(int)

    df = df[df["text"].notnull()]
    df = df.dropna(subset=["text"])
    df["text"] = df["text"].astype(str)
    df = df[df["text"].str.strip() != ""]

    return df


def load_speech_file(path):
    """
    Load speech data from a JSON file and extract relevant fields.

    Args:
        path (str): Path to the JSON file containing speech data.

    Returns:
        pd.DataFrame: DataFrame containing extracted speech data.
    """
    with open(path, "r", encoding="utf-8") as file:
        data = json.load(file)

    speeches = data.get("speechs", [])
    speech_data = []

    for speech in speeches:
        speakers = [speaker["name"] for speaker in speech.get("speakers", [])]
        if len(speakers) != 1:
            continue

        text = speech.get("text", "")

        # check if text is None
        if text is None or len(speakers) != 1:
            continue

        speech_data.append(
            {
                "speaker": speakers[0],
                "text": text,
            }
        )

    return pd.DataFrame(speech_data)


def load_speech_data(file_path, anntotation_path):
    """
    Load and annotate speech data from JSON file.

    Args:
        file_path (str): Path to the JSON file containing speech data.
        anntotation_path (str): Path to the CSV file with speaker annotations.

    Returns:
        pd.DataFrame: Final DataFrame with loaded, annotated, and cleaned speech data.
    """
    df = load_speech_file(file_path)
    df = anotate(anntotation_path, df)
    df = clean_data(df)
    return df


def load_data():
    """
    Load the whole dataset augmented with the right wing speeches.

    Returns:
        pd.DataFrame: Complete and augmented DataFrame.
    """
    data = load_speech_data("../data/speeches.json", "../data/annotated_speakers.csv")
    right_wing_data = load_speech_data(
        "../data/right_wing_speeches.json", "../data/annotated_speakers.csv"
    )

    return pd.concat([data, right_wing_data], ignore_index=True)
