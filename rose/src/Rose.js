import React, {useRef, useEffect} from "react";
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function Rose3D()
{
    const mountRef = useRef(null);
    useEffect(() => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xfff0f6);

        const camera = new THREE.PerspectiveCamera(75,
            window.innerWidth / window.innerHeight,0.1,1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);

        mountRef.current.appendChild(renderer.domElement);

        const geometry = new THREE.BoxGeometry(1,1,1); //(width, height, depth)
        const material = new THREE.MeshBasicMaterial({color : 0x00ff00}); //should be a bright green box

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube); //should add the cube to the scene

        function animate()
        {
            requestAnimationFrame(animate);
            renderer.render(scene,camera);
        }
        animate();

        return () => {
            mountRef.current.removeChild(renderer.domElement);
        }

    }, []);
    return <div ref={mountRef} style={{ width: '100vw', height: '100vh', border: '2px solid red' }}/>
}
