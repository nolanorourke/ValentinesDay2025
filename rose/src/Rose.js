import React, {useRef, useEffect} from "react";
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function Rose3D()
{
    const mountRef = useRef(null);
    useEffect(() => {
        console.log('useEffect is running...');

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xfff0f6);
        console.log('scene is created...');

        const camera = new THREE.PerspectiveCamera(75,
            window.innerWidth / window.innerHeight,0.1,1000);
        camera.position.z = 5;
        console.log('camera is created...');

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        console.log('renderer is rendered...');
        
        mountRef.current.appendChild(renderer.domElement);

        const geometry = new THREE.BoxGeometry(1,1,1); //(width, height, depth)
        const material = new THREE.MeshBasicMaterial({color : 0x00ff00}); //should be a bright green box
        console.log('cube is created...');
    
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube); //should add the cube to the scene
        console.log('cube should be visible...');
        function animate()
        {
            cube.rotation.x += 1.02;
            cube.rotation.y += 1.02;
            renderer.render(scene,camera);
        }
        animate();

        return () => {
            if(mountRef.current)
            {
                mountRef.current.removeChild(renderer.domElement);
            }
        }

    }, []);
    return <div ref={mountRef}/>
}
