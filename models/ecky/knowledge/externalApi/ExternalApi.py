from langchain_core.tools import tool
import requests
import json
import serpapi

@tool 
def UseSerp(query:str,location:str="Austin, Texas, United States"):
    """Searches Google for real-time information about energy, electricity prices, or related topics."""
    client = serpapi.Client(api_key="89aacbe6cec6028bc6241003b981675b2c2a5a9d7b06c7c904b28f5cf7742e95")
    try:
        results = client.search({
            "engine": "google",
            "q": query,
            "location": location,
            "google_domain": "google.com",
            "hl": "fr",
            "gl": "fr"
        })
        snippets = []
        sources = []
        
        if "knowledge_graph" in results:
            kg = results["knowledge_graph"]
            title = kg.get("title", "")
            desc = kg.get("description", "")
            if desc:
                snippets.append(f"Knowledge Graph ({title}): {desc}")
            source_info = kg.get("source", {})
            if isinstance(source_info, dict) and source_info.get("link"):
                sources.append({"title": title or source_info.get("name", "Knowledge Graph"), "link": source_info["link"]})

        if "answer_box" in results:
            ab = results["answer_box"]
            link = ab.get("link", "")
            title = ab.get("title", "Direct Answer")
            if "answer" in ab:
                snippets.append(f"Direct Answer: {ab['answer']}")
            elif "snippet" in ab:
                snippets.append(f"Direct Snippet: {ab['snippet']}")
            if link:
                sources.append({"title": title, "link": link})
        
        if "organic_results" in results:
            for r in results["organic_results"][:3]:
                title = r.get("title", "")
                snippet = r.get("snippet", "")
                link = r.get("link", "")
                if title or snippet:
                    snippets.append(f"- {title}: {snippet}")
                if link:
                    sources.append({"title": title or "Search Result", "link": link})
                    
        if not snippets:
            return "No Google Search results found.|||SOURCES|||[]"
            
        return "\n".join(snippets) + "|||SOURCES|||" + json.dumps(sources)
    except Exception as e:
        return f"Error performing search: {str(e)}|||SOURCES|||[]"

