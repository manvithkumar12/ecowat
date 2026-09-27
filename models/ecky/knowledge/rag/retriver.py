import json
from pathlib import Path
import numpy as np
from sentence_transformers import SentenceTransformer

BASE_DIR = Path(__file__).resolve().parent
MODEL_NAME = "BAAI/bge-base-en-v1.5"

model = SentenceTransformer(MODEL_NAME)

with open(BASE_DIR / "ecowat_chunks.json", "r", encoding="utf-8") as f:
    chunks = json.load(f)

embeddings_path = BASE_DIR / "ecowat_embeddings.npy"

if embeddings_path.exists():
    embeddings = np.load(embeddings_path)
    if embeddings.shape[0] != len(chunks):
        print(f"Mismatch detected ({embeddings.shape[0]} embeddings vs {len(chunks)} chunks). Regenerating...")
        texts = [chunk["text"] for chunk in chunks]
        embeddings = model.encode(texts, normalize_embeddings=True, show_progress_bar=True)
        embeddings = np.array(embeddings, dtype=np.float32)
        np.save(embeddings_path, embeddings)
else:
    print("Embeddings file not found. Generating embeddings...")
    texts = [chunk["text"] for chunk in chunks]
    embeddings = model.encode(texts, normalize_embeddings=True, show_progress_bar=True)
    embeddings = np.array(embeddings, dtype=np.float32)
    np.save(embeddings_path, embeddings)

print("Chunks:", len(chunks))
print("Embeddings:", embeddings.shape)


def retrieve_context(query: str, top_k: int = 5):
    top_k = min(top_k, len(chunks))
    query_embedding = model.encode(
        query,
        normalize_embeddings=True
    )

    scores = embeddings @ query_embedding

    top_indices = scores.argsort()[-top_k:][::-1]

    results = []

    for index in top_indices:
        results.append({
            "score": float(scores[index]),
            "text": chunks[index]["text"],
            "metadata": chunks[index]["metadata"]
        })

    return results

