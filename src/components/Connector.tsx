import { Component } from 'solid-js';

interface LinePoints {
  xStart: number;
  yStart: number;
  xEnd: number;
  yEnd: number;
}

interface ConnectorProps {
  linePoints: LinePoints; // Directly use the structure for props
}

export const Connector: Component<ConnectorProps> = (props) => {
//   console.log('Connector called with:', props);

  // Assuming direct use of props, no need to destructure from a Signal
  const RADIUS: number = 10;

  // Calculate depth and width based on provided linePoints
  const depth = () => props.linePoints.yEnd - props.linePoints.yStart;
  const width = () => props.linePoints.xEnd - props.linePoints.xStart;

  // Adjust depth for the quarter pipe turn and compute path dynamically
  const adjustedDepth = () => depth() - RADIUS;
  const pathD = () => `M${props.linePoints.xStart},${props.linePoints.yStart}
                       L${props.linePoints.xStart},${props.linePoints.yStart + adjustedDepth()}
                       A${RADIUS},${RADIUS} 0 0 0 ${props.linePoints.xStart + RADIUS},${props.linePoints.yStart + adjustedDepth() + RADIUS}
                       L${props.linePoints.xStart + RADIUS + width()},${props.linePoints.yStart + adjustedDepth() + RADIUS}`;

  return (
    <svg style={{pointerEvents: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0}}>
      <path d={pathD()} stroke="gray" fill="none" strokeWidth="2" style={{pointerEvents: 'none'}} />
    </svg>
  );
};
