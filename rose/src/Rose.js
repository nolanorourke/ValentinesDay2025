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

        // const geometry = new THREE.BoxGeometry(1,1,1); //(width, height, depth)
        // const material = new THREE.LineBasicMaterial({color : 0x00ff00}); //should be a bright green box
        // console.log('cube is created...');
        // const cube = new THREE.Mesh(geometry, material);
        // scene.add(cube); //should add the cube to the scene
        // console.log('cube should be visible...');

        const stemGeometry = new THREE.CylinderGeometry(1, 1.5, 100, 700);
        const stemMaterial = new THREE.MeshBasicMaterial({color: 0x299B29, side: THREE.DoubleSide});
        const stem = new THREE.Mesh(stemGeometry, stemMaterial);
        
        scene.add(stem);

        // function generatePetal(angle)
        // {
            const x = 0, y = -19;
            const petalShape = new THREE.Shape();
            //petalShape.moveTo(x+5, y+5);
            // petalShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
            // petalShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
            // petalShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
            // petalShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
            // petalShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
            // petalShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );
            //petalShape.bezierCurveTo( x, y, x, y, x, y );

            // petalShape.bezierCurveTo( x + 6, y, x + 6, y - 7,x + 6, y - 7 );
            // petalShape.bezierCurveTo( x + 6, y - 11, x + 3, y - 15.4, x - 5, y - 19 );
            // petalShape.bezierCurveTo( x - 12, y - 15.4, x - 16, y - 11, x - 16, y - 7 );
            // petalShape.bezierCurveTo( x - 16, y - 7, x - 16, y, x - 10, y );

            petalShape.bezierCurveTo( x + 6, y + 19, x + 6, y + 12, x + 6, y + 12 );
            petalShape.bezierCurveTo( x + 6, y + 8, x + 3, y + 4, x - 5, y );
            petalShape.bezierCurveTo( x - 12, y + 4, x - 16, y + 8, x - 16, y + 12 );
            petalShape.bezierCurveTo( x - 16, y + 12, x - 16, y + 19, x - 10, y + 19 );
            //petalShape.bezierCurveTo( x - 7, y, x - 5, y - 5, x + 5, y + 5 );

            const curve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(0,0,0),
                new THREE.Vector3(0,0,1),
                new THREE.Vector3(0.5,0,2),
                new THREE.Vector3(0.2,0,3),
            ]);
            const extrudeSettings = {
                //depth: 0.1,
                steps: 1,
                bevelEnabled: false,
                //bevelSize: 0.2,
                //bevelThickness: 0.3,
                extrudePath: curve
            };
            const petalGeometry = new THREE.ExtrudeGeometry(petalShape, extrudeSettings);
            const petalMaterial = new THREE.MeshBasicMaterial({color: 0xFF003F, side: THREE.DoubleSide, /*vertexColors: true */});
            const petal = new THREE.Mesh(petalGeometry, petalMaterial);
            petal.rotation.x = 5;
            petal.rotation.y = 4.25

            petal.position.set(-10, 63,9);
            //  const petalGeometry = new THREE.PlaneGeometry(0.5, 1, 32, 32);
            //  const petalMaterial = new THREE.MeshBasicMaterial({color: 0xFF003F, side: THREE.DoubleSide});
            //  const petal = new THREE.Mesh(petalGeometry, petalMaterial);
            scene.add(petal);

        // }
        const petalAmount =3
        let yrotat = 8.5, zrotat=0;
        for (let i = 0; i < petalAmount; i++, zrotat++) {
            const petal = new THREE.Mesh(petalGeometry, petalMaterial);
            
            // Rotate each petal around the stem
            let angle = (i / petalAmount) * Math.PI * 2; // Spread petals evenly
            petal.position.set(Math.cos(angle) * 8, 63, Math.sin(angle) * 8);
            petal.lookAt(0,63,0);
            //petal.rotation.y = angle;
            petal.rotation.z += Math.PI;
            //scene.add(petal);
        }
        function animate()
        {
            // cube.rotation.x += 0.01;
            // cube.rotation.y += 0.01;
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene,camera);
            //petal.rotation.z+= .1;
            //petal.rotation.x+= .1;
            petal.rotation.y+= .1;

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
