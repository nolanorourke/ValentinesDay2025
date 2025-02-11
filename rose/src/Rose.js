import React, {useRef, useEffect} from "react";
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

export default function Rose3D()
{
        const mountRef = useRef(null);
    


    useEffect(() => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xfff0f6);
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
            );
        camera.position.z = 5;
        const geometry = new THREE.BoxGeometry(1,1,1); //(width, height, depth)
        const material = new THREE.MeshBasicMaterial({color : 0x00ff00}); //should be a bright green box

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube); //should add the cube to the scene
    }, []);

}
