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

        //this is the stem info, the geomtry is the dimensions, material is the colo, mesh them together, add to the scene
        const stemGeometry = new THREE.CylinderGeometry(1, 1.5, 100, 700);
        const stemMaterial = new THREE.MeshBasicMaterial({color: 0x299B29, side: THREE.DoubleSide});
        const stem = new THREE.Mesh(stemGeometry, stemMaterial);
        stem.position.y -= 59
        scene.add(stem);

        /*
            what i want to do is create a shape, 
        */

        //this is going to be the heart / petal
        function createPetal(scale)
        {
            const points = [];
            for ( let i = 0; i < 10; i ++ ) {
                points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 , ( i - 5 ) * 2 ).addScalar(scale) );
            }
            return points
        }

        const petalGeometry = new THREE.LatheGeometry(createPetal(1));
        const petalMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.DoubleSide});
        const petal = new THREE.Mesh(petalGeometry, petalMaterial);
        const petal2 = new THREE.Mesh(new THREE.LatheGeometry(createPetal(-1)), new THREE.MeshBasicMaterial({color: 0x00ff00, side: THREE.DoubleSide}))
        const petal3 = new THREE.Mesh(new THREE.LatheGeometry(createPetal(2)), new THREE.MeshBasicMaterial({color: 0x0000ff, side: THREE.DoubleSide}))

        scene.add(petal);
        scene.add(petal2);
        scene.add(petal3);

        
        function animate()
        {
            // cube.rotation.x += 0.01;
            // cube.rotation.y += 0.01;
            requestAnimationFrame(animate);
            controls.update();
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
    return <div ref={mountRef} style={{overflow: "hidden"}}/>
}
