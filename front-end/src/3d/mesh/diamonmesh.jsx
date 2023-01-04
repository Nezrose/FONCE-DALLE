import React from 'react';
import { useRef } from 'react'
import { useLoader } from '@react-three/fiber'
import {
  useGLTF,
  MeshRefractionMaterial,
  OrthographicCamera,
} from '@react-three/drei'
import { useControls } from 'leva'
import { RGBELoader } from 'three-stdlib'
import HdrFile from '../../assets/aerodynamics_workshop_1k.hdr'
import Singe from '../../3d/objet/dflat.glb'




function Diamond(props) {


  const ref = useRef()
 
  const { nodes } = useGLTF(Singe)
   console.log(nodes.Diamond_1_0.geometry)

  // Use a custom envmap/scene-backdrop for the diamond material
  // This way we can have a clear BG while cube-cam can still film other objects
  const texture = useLoader(RGBELoader, HdrFile)
  console.log(HdrFile)

  // Optional config
  const config = useControls({
    bounces: { value: 4, min: 0, max: 8, step: 1 },
    aberrationStrength: { value: 0.01, min: 0, max: 0.1, step: 0.01 },
    ior: { value: 2.4, min: 0, max: 10 },
    fresnel: { value: 1, min: 0, max: 1 },
    color: 'white',
    fastChroma: true
  })
  return (
    <OrthographicCamera  frames={1} envMap={texture}>

      {(texture) => (
        <mesh castShadow ref={ref} geometry={nodes.Diamond_1_0.geometry} {...props}>
          <MeshRefractionMaterial envMap={texture} {...config} toneMapped={true} />
          
        </mesh>
      )}
    </OrthographicCamera>
  )
}
export default Diamond
