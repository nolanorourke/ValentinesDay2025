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

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        console.log('renderer is rendered...');

        const camera = new THREE.PerspectiveCamera(75,
            window.innerWidth / window.innerHeight,1,500);
        const controls = new OrbitControls( camera, renderer.domElement);
        camera.position.set(0,0,150);
        controls.update();
        camera.lookAt(0,0,0);
        console.log('camera is created...');
        
        mountRef.current.appendChild(renderer.domElement);

        const stemGeometry = new THREE.CylinderGeometry(1, 1.5, 100, 700);
        const stemMaterial = new THREE.MeshBasicMaterial({color: 0x299B29, side: THREE.DoubleSide});
        const stem = new THREE.Mesh(stemGeometry, stemMaterial);
        
        scene.add(stem);
        function animate()
        {
            // cube.rotation.x += 0.01;
            // cube.rotation.y += 0.01;
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene,camera);
            //petal.rotation.z+= .1;
            //petal.rotation.x+= .1;
            //petal.rotation.y+= .1;

        }
        animate();

        return () => {
            if(mountRef.current)
            {
                mountRef.current.removeChild(renderer.domElement);
            }
        }

    }, []);
    return <div ref={mountRef} style={{overflow: "hidden"}}/>
}
