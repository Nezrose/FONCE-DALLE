import React from 'react';
import { useFrame}  from '@react-three/fiber'
function Box(props) {
    // This reference will give us direct access to the mesh
    const mesh = React.useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = React.useState(false)
    const [active, setActive] = React.useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
    // Return view, these are regular three.js elements expressed in JSX
    return (
      <mesh
        {...props}
        ref={mesh}
        scale={active ? 1.5 : 1}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    )
  }
  export default Box