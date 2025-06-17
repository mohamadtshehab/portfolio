"use client";

import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

export function Model({ modelUrl, mtlUrl }: { modelUrl: string; mtlUrl: string }) {
  const { scene } = useThree();
  const modelRef = useRef<THREE.Group | undefined>(undefined);

  useEffect(() => {
    // Function to handle cleanup
    function cleanup() {
      if (modelRef.current) {
        scene.remove(modelRef.current);
        modelRef.current = undefined;
      }
    }

    // Extract model paths for correct loading
    const modelPath = modelUrl.substring(0, modelUrl.lastIndexOf('/') + 1);
    const modelFile = modelUrl.substring(modelUrl.lastIndexOf('/') + 1);
    const mtlFile = mtlUrl.substring(mtlUrl.lastIndexOf('/') + 1);
    
    // Get the texture path for correct resource loading
    const texturePath = modelPath;

    // Step 1: Load materials first
    const mtlLoader = new MTLLoader();
    mtlLoader.setPath(modelPath);
    // Set resource path for textures - critical for material appearance
    mtlLoader.setResourcePath(texturePath);
    mtlLoader.load(
      mtlFile, 
      // Success callback
      (materials) => {
        // Essential: Preload all materials
        materials.preload();
        
        // Step 2: Once materials are loaded, load the OBJ
        const objLoader = new OBJLoader();
        // Apply the loaded materials to the OBJ loader
        objLoader.setMaterials(materials);
        objLoader.setPath(modelPath);
        
        objLoader.load(
          modelFile,
          // Success callback
          (object) => {
            // Clean up any existing model
            cleanup();
            
            // Process all meshes in the object
            object.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                // Make sure all meshes cast and receive shadows
                child.castShadow = true;
                child.receiveShadow = true;
                
                // Force material updates
                if (child.material) {
                  if (Array.isArray(child.material)) {
                    child.material.forEach(material => {
                      if (material) {
                        material.needsUpdate = true;
                        material.side = THREE.DoubleSide;
                      }
                    });
                  } else {
                    child.material.needsUpdate = true;
                    child.material.side = THREE.DoubleSide;
                  }
                }
              }
            });
            
            // Center the model for proper display
            const boundingBox = new THREE.Box3().setFromObject(object);
            const center = boundingBox.getCenter(new THREE.Vector3());
            object.position.sub(center);
            
            // Scale the model appropriately
            const size = boundingBox.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 2 / maxDim;
            object.scale.multiplyScalar(scale);
            
            // Adjust rotation and position
            object.rotation.x = -Math.PI / 2;
            object.rotation.z = -Math.PI * 0.8;
            
            // Add to scene and store reference
            scene.add(object);
            modelRef.current = object;
          },
        );
      },

    );
    // Clean up on unmount
    return cleanup;
  }, [modelUrl, mtlUrl, scene]);
  
  return null;
} 