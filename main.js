import * as THREE from './pkg/three.module.js'
import { AmmoPhysics } from './pkg/AmmoPhysics.js'

window.addEventListener('DOMContentLoaded', async DOMContentLoaded => {

    //INIT
    const physics = await AmmoPhysics()
    const renderer = new THREE.WebGL1Renderer({canvas: document.querySelector('canvas')})
    renderer.setSize(renderer.domElement.clientWidth, renderer.domElement.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x88AAFF)
    const camera = new THREE.PerspectiveCamera(75, renderer.domElement.clientWidth / renderer.domElement.clientHeight, 0.1, 1000)
    camera.position.z = 5

    //Lights
    const dir_light = new THREE.DirectionalLight(0xFFFFFF, 1)
    dir_light.position.x = 3; 
    dir_light.position.z = 4; 
    dir_light.position.y = 5; 
    dir_light.castShadow = true
    scene.add(dir_light)

    //Ground
    const ground_geo = new THREE.BoxGeometry(20, 1, 30)
    const ground_mat = new THREE.MeshStandardMaterial({
        color: 0x44AA88,
        roughness: 0.8,
    })
    const ground = new THREE.Mesh(ground_geo, ground_mat)
    ground.receiveShadow = true
    ground.position.y = -2
    scene.add(ground)
    physics.addMesh(ground)

    //Cube
    const cube_geo = new THREE.BoxGeometry()
    const cube_mat = new THREE.MeshStandardMaterial({
        color: 0xAA88FF,
    })
    const cube = new THREE.Mesh(cube_geo, cube_mat)
    cube.position.y = 3
    cube.castShadow = true
    scene.add(cube)
    physics.addMesh(cube, 1)

    //Input
    window.addEventListener('keydown', keydown => {
        if(keydown.key === 'a'){
            physics.setVelocity(cube, {x: -4, y: 0, z: 0})
        }
        if(keydown.key === 'd'){
            physics.setVelocity(cube, {x: 4, y: 0, z: 0})
        }
        if(keydown.key === 'w'){
            physics.setVelocity(cube, {x: 0, y: 0, z: -4})
        }
        if(keydown.key === 's'){
            physics.setVelocity(cube, {x: 0, y: 0, z: 4})
        }
        if(keydown.key === ' '){
            physics.setVelocity(cube, {x: 0, y: 6, z: 0})
        }
    })

    //Loop
    const animate = timestamp => {
        window.requestAnimationFrame(animate)

        //Render
        renderer.render(scene, camera)
    }
    window.requestAnimationFrame(animate)
})