const WarpMesh = () => {
  return (
    <mesh position={[0, 0, -0.5]}>
      <circleGeometry args={[1.8, 100]} />
      <meshStandardMaterial color={"green"} />
    </mesh>
  );
};

export default WarpMesh;
