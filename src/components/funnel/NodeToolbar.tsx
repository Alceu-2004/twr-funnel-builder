import { Button } from "@/components/ui/button";
import { nodeFactory } from "@/factory/nodeFactory";
import { useFunnelStore } from "@/store/funnelStore";
import type { NodeType } from "@/types/Funnel";

export function NodeToolbar() {
  const addNode = useFunnelStore((state) => state.addNode);
  const nodes = useFunnelStore((state) => state.nodes); 

  function handleAddNode(type: NodeType) {
    const columns = 4;

    const newNode = nodeFactory.createNode(type, {
        x: 50 + (nodes.length % columns) * 220,
        y: 50 + Math.floor(nodes.length / columns) * 150,
    });

    addNode(newNode);
  }

  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      <Button onClick={() => handleAddNode("start")}>Start</Button>
      <Button onClick={() => handleAddNode("email")}>Email</Button>
      <Button onClick={() => handleAddNode("sms")}>SMS</Button>
      <Button onClick={() => handleAddNode("delay")}>Delay</Button>
      <Button onClick={() => handleAddNode("condition")}>Condition</Button>
      <Button onClick={() => handleAddNode("end")}>End</Button>
    </div>
  );
}