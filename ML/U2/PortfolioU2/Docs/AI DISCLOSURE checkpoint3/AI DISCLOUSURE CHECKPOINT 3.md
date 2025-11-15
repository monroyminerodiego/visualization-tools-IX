# Relational analysis - Chekpoint 3

**Author(s):** Damaris Dzul, Ariel Buenfil
**Date:** [11/01/2025]  
**Course:** Visual Modeling Information (Professor: Jorge Javier Pedrozo Romero)  
**Program:** Data Engineering  
**Institution:** Universidad Politécnica de Yucatán  

---

## AI Assistance Disclosure

This document was created with assistance from AI tools. The following outlines the nature and extent of AI involvement:

- **AI Tool Used:** Claude
- **Type of Assistance:** Code generation, Documentation writing, Data analysis, Debugging, etc.
- **Extent of Use:** Minor assistance with formatting, Significant help with algorithm development, Complete code generation with human review.
- **Human Contribution:** analysis, verification, customization, etc.

**Academic Integrity Statement:** All AI-generated content has been reviewed, understood, and verified by the author. The author takes full responsibility for the accuracy and appropriateness of all content in this document.
- **Conversation Link:** [Full AI collaboration session](https://claude.ai/share/e9316060-8108-4b7e-9fa3-91fa60d46573)
---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Objectives](#objectives)
3. [Methodology](#methodology)
4. [Implementation](#implementation)
5. [Results](#results)
6. [Conclusions](#conclusions)
7. [References](#references)

---

## Project Overview

The following analysis was developed based on a social network graph. The graph represents the interaction in Twitter of US congress' members, where each node represents a person that is part of the congress, and the edges (weighted) their connection (retweet, quote tweet, reply, or mention of another member). In summary, this graph represents the spreading of opinion/ideas among the members of the US congress.

## Objectives

- [x] Which nodes are most central and why?
- [x] How do different centrality metrics compare?
- [x] What does this tell us about the network structure?

## Methodology

### Data Sources
- **Dataset 1:** US Congress Twitter Interactions. This network dataset was extracted from https://snap.stanford.edu/data/congress-twitter.html

### Tools and Technologies
- **Database:** N/A (CSV/Edge list)
- **Programming Language:** Python
- **Libraries:** networkx, pandas, numpy, matplotlib, seaborn, scipy
- **Visualization:** Matplotlib, Seaborn, NetworkX

### Approach
The analysis involves loading the directed graph from the SNAP dataset. It requires calculating multiple centrality measures (Betweenness, PageRank, In-Degree, Out-Degree, Closeness) to identify key nodes. Community detection is performed using the 'greedy_modularity' method to understand clustering. Finally, the relationships between different centrality metrics are explored using Spearman's correlation.

## Implementation

### Phase 1: Centrality Analysis
Functions were defined to calculate and display top nodes for Betweenness Centrality (`calculate_betweenness`) and PageRank (`calculate_pagerank`). A comprehensive function (`comprehensive_centrality_comparison`) was also created to calculate and compare PageRank, Betweenness, In-Degree, Out-Degree, and Closeness centralities simultaneously.

**Code Example (Betweenness Centrality):**
```python
# Sample code block
def calculate_betweenness(G: nx.DiGraph, top_n: int = 10) -> dict:
 """
 Calculates betweenness centrality for a directed graph and displays the top N
 members with the highest centrality.
 """
 print(f"**Calculating Betweenness Centrality for {G.number_of_nodes()} members...**\\n")
 
 betweenness = nx.betweenness_centrality(G, normalized=True, weight=None) 
 
 # Sort the results in descending order
 sorted_betweenness = dict(sorted(betweenness.items(), key=lambda item: item[1], reverse=True))
 
 # Display the top N
 print(f"***Top {top_n} Members by Betweenness Centrality (Highest Bridge/Broker Score)***")
 for i, (node, score) in enumerate(list(sorted_betweenness.items())[:top_n]):
  print(f"Rank {i+1}: Node '{node}' - Betweenness: {score:.4f}")
 
 return betweenness
````

### Phase 2: Community Detection

Functions were defined to detect communities (`detect_communities` using 'greedy\_modularity'), analyze their properties (`analyze_communities`), and visualize them (`visualize_communities`, `visualize_largest_communities`). This phase was executed to understand the clustering and political affiliations within the network.

## Results

### Key Findings

1.  **Key Influencers vs. Broadcasters:** Node '322' is the most central node overall, ranking 1st in PageRank (0.0167), Betweenness (0.0730), and In-Degree (0.2679). This identifies it as a major hub for receiving information. In contrast, Node '367' ranks 1st in Out-Degree (0.3312), identifying it as a primary broadcaster.
2.  **Metric Correlation:** PageRank is very highly correlated with In-Degree (Spearman's Rho: 0.9428). It is strongly correlated with Betweenness (0.7533) but has a much weaker correlation with Out-Degree (0.4553). This implies that influence (PageRank) in this network is defined by receiving attention, not just broadcasting.
3.  **Network Structure:** The network is clearly divided into 3 distinct communities (Sizes: 248, 182, 45). The modularity score for this division is 0.3998, which indicates a strong and significant community structure, likely representing political polarization.

### Visualizations

(Visualizations for PageRank distribution and community structure are generated in the notebook)

### Performance Metrics

| Metric | Value | Description |
|--------|-------|-------------|
| Modularity Score | 0.3998 | The modularity score for the 3 detected communities. |
| PR vs In-Degree Corr. | 0.9428 | Spearman correlation, showing PageRank is highly similar to In-Degree. |
| PR vs Out-Degree Corr. | 0.4553 | Spearman correlation, showing PageRank is not strongly related to Out-Degree. |
| PR vs Betweenness Corr. | 0.7533 | Spearman correlation, showing a strong relationship between influence and brokerage. |

## Conclusions

### Summary

The analysis identified key influencers and a clear, polarized community structure in the US Congress Twitter network. Node 322 is the top influencer (high PageRank) and bridge (high Betweenness), primarily by being a target of communication (high In-Degree). The network is strongly partitioned into 3 communities (Modularity \~0.40), which likely represent political affiliations. The high correlation between PageRank and In-Degree confirms that influence in this network is more about being cited or mentioned than about broadcasting messages.

### Lessons Learned

  - **Influence vs. Activity:** The analysis demonstrated that the most "influential" node (highest PageRank) is not the most "active" (highest Out-Degree). Influence in this network is defined by receiving interactions (In-Degree), not just broadcasting.
  - **Centrality Defines Roles:** Different centrality metrics effectively identify different real-world roles. PageRank/In-Degree identified "Opinion Leaders" (like Node 322), while Out-Degree identified "Broadcasters" (like Node 367).
  - **Network Structure is Quantifiable:** The modularity score (0.3998) provides a hard number to confirm the anecdotal observation of political polarization, demonstrating a significant, non-random community structure.

### Future Work

  - **Community-Level Analysis:** The notebook identifies the communities but stops short of analyzing them individually. Future work should analyze the centrality measures *within* each community to see who the key players are in each subgroup.
  - **Content Analysis (NLP):** This analysis is purely structural. A future step would be to apply Natural Language Processing (NLP) to the tweet content (if available) to determine *what* topics are being discussed by the key influencers and *what* topics define each community.
  - **Temporal Analysis:** The dataset is static. A future analysis could use timestamps (if available) to see how influence and community structure evolve over time, especially around key political events.

## References

1.  SNAP Dataset: Congress-Twitter network. [https://snap.stanford.edu/data/congress-twitter.html](https://snap.stanford.edu/data/congress-twitter.html)
2.  NetworkX Library Documentation. [https://networkx.org/](https://networkx.org/)

-----

**Note:** This document is part of the academic portfolio for the Data Engineering program at Universidad Politécnica de Yucatán.

```
```
