import React from 'react';
import { useRef } from 'react'
import { RGBELoader } from 'three-stdlib'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useFBO, Center, Text3D, Instance, Instances, Environment, Lightformer, OrbitControls, RandomizedLight, AccumulativeShadows } from '@react-three/drei'
import { useControls, button } from 'leva'
import { MeshRefractionMaterial } from './mesh/MeshRefractionMaterial'
import HdrFile from '../assets/aerodynamics_workshop_1k.hdr'
import JsonFile from '../assets/Inter_Medium_Regular.json'

function Chrome () {
    const { autoRotate, text, shadow,positionX, ...config } = useControls({
        text: 'EN 2 SPI',
        clearcoat: { value: 1, min: 0.1, max: 1 },
        clearcoatRoughness: { value: 0.25, min: 0, max: 1 },
        uRefractPower: { value: 0.35, min: 0, max: 5 },
        uTransparent: { value: 0.25, min: 0, max: 5 },
        uIntensity: { value: 1.3, min: 0.0, max: 5.0 },
        uNoise: { value: 0.03, min: 0, max: 1, step: 0.01 },
        uSat: { value: 1.0, min: 1, max: 1.25, step: 0.01 },
        uColor: '#66d5e3',
        gColor: '#5f79ef',
        shadow: '#2d3a5c',
        rotate: { value: 0.03, min: 0, max: 1, step: 0.01 },
        autoRotate: false,
        screenshot: button(() => {
        // Save the canvas as a *.png
        const link = document.createElement('a')
        link.setAttribute('download', 'canvas.png')
        link.setAttribute('href', document.querySelector('canvas').toDataURL('image/png').replace('image/png', 'image/octet-stream'))
        link.click()
        })
    })
    return (
            <div style={{ width: "100%", height: "100vh" }}>
            <Canvas shadows orthographic camera={{ position: [50, 0, 300], zoom: 30 }} gl={{ preserveDrawingBuffer: true }}>
                <color attach="background" args={['#53AAF1']} />
                {/** The text and the grid */}
                <Text config={config} rotation={[-Math.PI / 2.5, 0, 0]} position={[1, 0.2, 5]}>
                    {text}
                </Text>
       
                {/** Controls */}
                <OrbitControls
                    autoRotate={autoRotate}
                    autoRotateSpeed={0}
                    zoomSpeed={5}
                    minZoom={30}
                    maxZoom={140}
                    enablePan={true}
                    rotate={90}
                    dampingFactor={0.05}
                    minPolarAngle={Math.PI/4}
                    maxPolarAngle={Math.PI / 4}
                />
                {/** The environment is just a bunch of shapes emitting light. This is needed for the clear-coat */}
                <Environment resolution={20}>
                    <group rotation={[-Math.PI / 2, 0, 0]}>
                    <Lightformer intensity={10} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
                    <Lightformer intensity={4} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
                    <Lightformer intensity={20} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[10, 2, 1]} />
                    <Lightformer intensity={10} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} />
                    <Lightformer type="ring" intensity={10} rotation-y={Math.PI / 2} position={[-0.1, -1, -5]} scale={10} />
                    </group>
                </Environment>
                {/** Soft shadows */}
                <AccumulativeShadows
                    temporal
                    frames={100}
                    color={shadow}
                    colorBlend={5}
                    toneMapped={true}
                    alphaTest={0.9}
                    opacity={1}
                    scale={30}
                    position={[0, -1.01, 0]}>
                    <RandomizedLight amount={4} radius={10} ambient={0.5} intensity={1} position={[0, 10, -10]} size={15} mapSize={1024} bias={0.0001} />
                </AccumulativeShadows>
                </Canvas>
  

           </div>
    );
}
const Grid = ({ number = 23, lineWidth = 0.026, height = 0.1 }) => (
    // Renders a grid and crosses as instances
    <Instances position={[0, 0, 0]}>
      <planeGeometry args={[lineWidth, height]} />
      <meshBasicMaterial color="#ffff" />
      {Array.from({ length: number }, (_, y) =>
        Array.from({ length: number }, (_, x) => (
          <group key={x + ':' + y} position={[x * 2 - Math.floor(number / 2) * 2, -0.01, y * 2 - Math.floor(number / 2) * 2]}>
            <Instance rotation={[-Math.PI / 2, 0, 0]} />
            <Instance rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
          </group>
        ))
      )}
      
    </Instances>
  )
  function Text({ children, config,font=JsonFile, ...props }) {

    const ref = useRef()
    const fbo = useFBO(1024)
    const texture = useLoader(RGBELoader, HdrFile)
  
    let oldBg
    useFrame((state) => {
      // Hide the outer groups contents
      ref.current.visible = false
      // Set render target to the local buffer
      state.gl.setRenderTarget(fbo)
      // Save the current background and set the HDR as the new BG
      // This is what creates the reflections
      oldBg = state.scene.background
      state.scene.background = texture
      // Render into the buffer
      state.gl.render(state.scene, state.camera)
      // Set old state back
      state.scene.background = oldBg
      state.gl.setRenderTarget(null)
      ref.current.visible = true
    })
  
    return (
      <>
        <group ref={ref}>
          <Center scale={[0.8, 1, 1]} front top {...props}>
            <Text3D
              castShadow
              bevelEnabled
              font={font}
              scale={5}
              letterSpacing={-0.03}
              height={0.25}
              bevelSize={0.01}
              bevelSegments={10}
              curveSegments={128}
              bevelThickness={0.01}>
              {children}
              {/** Pass the rendered buffer into the refraction shader */}
              <MeshRefractionMaterial uSceneTex={fbo.texture} {...config} />
            </Text3D>
          </Center>
          <Grid />
        </group>
        {/** Double up the text as a flat layer at the bottom for more interesting refraction */}
        <Center scale={[0.8, 1, 1]} front top {...props}>
          <Text3D font={font} scale={5} letterSpacing={-0.03} height={0.01} curveSegments={32}>
            {children}
            <meshBasicMaterial color={config.gColor} />
          </Text3D>
        </Center>
        
      </>
    )
  }
export default Chrome;
