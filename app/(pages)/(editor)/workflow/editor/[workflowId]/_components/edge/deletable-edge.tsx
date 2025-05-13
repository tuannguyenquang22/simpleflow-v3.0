import { Button } from "@/components/ui/button";
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getSimpleBezierPath, useReactFlow } from "@xyflow/react";
import { CircleXIcon } from "lucide-react";

export default function DeletableEdge(props: EdgeProps) {
  const [edgePath, labelX, labelY] = getSimpleBezierPath(props);
  const { setEdges } = useReactFlow();
  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={props.markerEnd}
        style={props.style}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all"
          }}
        >
          <Button 
            variant={"ghost"} 
            size="icon" 
            className="!p-0 !border-0 !bg-transparent hover:!bg-transparent"
            onClick={(event) => {
              setEdges((eds) => eds.filter((e) => e.id !== props.id));
            }}
          >
            <CircleXIcon className="text-destructive"/>
          </Button>
        </div>
      </EdgeLabelRenderer>
    </>
  )
}