import { characterProfiles } from './characters';

/**
 * Transforms character profile data into a format usable by Cytoscape.js.
 * @returns {cytoscape.ElementDefinition[]} An array of nodes and edges.
 */
export function generateNetworkElements() {
  const elements = [];
  const edgeSet = new Set(); // To prevent duplicate edges

  // 1. Create a node for each character
  characterProfiles.forEach(profile => {
    elements.push({
      data: { id: profile.id, label: profile.name },
    });
  });

  // 2. Create edges based on relationships
  characterProfiles.forEach(sourceProfile => {
    const relationships = sourceProfile.details.Relationships || '';
    const relations = relationships.split(' - '); // e.g., ["Aamer: Friend", "X: Ally"]

    relations.forEach(relation => {
      if (!relation.includes(':')) return;

      const [targetName, label] = relation.split(':').map(s => s.trim());
      
      // Find the target profile by matching the name
      const targetProfile = characterProfiles.find(p => p.name.includes(targetName));

      if (targetProfile) {
        const sourceId = sourceProfile.id;
        const targetId = targetProfile.id;

        // Create a unique key for the edge to avoid duplicates (e.g., "ms-so" is the same as "so-ms")
        const edgeKey = [sourceId, targetId].sort().join('-');

        if (!edgeSet.has(edgeKey)) {
          elements.push({
            data: {
              source: sourceId,
              target: targetId,
              label: label,
            },
          });
          edgeSet.add(edgeKey);
        }
      }
    });
  });

  return elements;
}

/**
 * Generates network elements for a single character and their direct relations.
 * @param {string} characterId The ID of the central character.
 * @returns {cytoscape.ElementDefinition[]} An array of nodes and edges.
 */
export function generateSingleCharacterNetwork(characterId) {
    const elements = [];
    const centralCharacter = characterProfiles.find(p => p.id === characterId);
  
    if (!centralCharacter) {
      return []; // Return empty if character not found
    }
  
    // 1. Add the central character node with a special class for styling
    elements.push({
      data: { id: centralCharacter.id, label: centralCharacter.name },
      classes: 'central', // Class to identify the main node
    });
  
    // 2. Parse their relationships to create connected nodes and edges
    const relationships = centralCharacter.details.Relationships || '';
    const relations = relationships.split(' - ');
  
    relations.forEach(relation => {
      if (!relation.includes(':')) return;
  
      const [targetName, label] = relation.split(':').map(s => s.trim());
      const targetProfile = characterProfiles.find(p => p.name.includes(targetName));
  
      if (targetProfile) {
        // Add the connected character's node
        elements.push({
          data: { id: targetProfile.id, label: targetProfile.name },
        });
        // Add the edge connecting them
        elements.push({
          data: {
            source: centralCharacter.id,
            target: targetProfile.id,
            label: label,
          },
        });
      }
    });
  
    return elements;
  }