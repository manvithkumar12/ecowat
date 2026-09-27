import os
import sys
from typing import Any, Dict, List
from langchain_core.tools import tool

# Ensure project paths are in sys.path
dir_path = os.path.dirname(os.path.realpath(__file__))
sys.path.insert(0, os.path.abspath(os.path.join(dir_path, "..", "..", "..")))

try:
    from ecky.knowledge.rag.retriver import retrieve_context
except ImportError:
    try:
        from models.ecky.knowledge.rag.retriver import retrieve_context
    except ImportError:
        from ..rag.retriver import retrieve_context


@tool
def useEcowat(query: str, top_k: int = 3) -> List[Dict[str, Any]]:
    """Retrieves relevant knowledge base chunks for a user's energy/EcoWat-related query.

    Args:
        query: The user question or search query.
        top_k: Number of relevant chunks to retrieve (default: 3).

    Returns:
        A list of the top relevant chunks, including text, similarity score, and metadata.
    """
    try:
        if not query or not isinstance(query, str):
            return []

        results = retrieve_context(query=query.strip(), top_k=top_k)
        return results
    except Exception as e:
        print(f"Error retrieving context for query '{query}': {e}")
        return []
