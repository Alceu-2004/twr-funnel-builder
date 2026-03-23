import { Card, CardContent } from "@/components/ui/card";
import { Handle, Position } from "reactflow";
import { useFunnelStore } from "@/store/funnelStore";
import type { FunnelNode as FunnelNodeType } from "@/types/Funnel";
import { useState } from "react";

interface Props {
  node: FunnelNodeType;
}

export function FunnelNode({ node }: Props) {
  const isStart = node.data.type === "start";
  const isEnd = node.data.type === "end";

  const { deleteNode, updateNode } = useFunnelStore();

  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(node.data.label);

  function handleDelete() {
    if (confirm("Are you sure you want to delete this step?")) {
      deleteNode(node.id);
    }
  }

  function handleSave() {
    updateNode(node.id, {
      label,
    });
    setIsEditing(false);
  }

  return (
    <div className="relative">
      {!isStart && (
        <Handle type="target" position={Position.Left} />
      )}

      <Card className="w-48 shadow-md">
        <CardContent className="p-3">
          {isEditing ? (
            <div className="space-y-2">
              <input
                className="w-full border rounded px-2 py-1 text-sm"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />

              <div className="flex justify-between">
                <button
                  className="text-xs text-green-600"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="text-xs text-gray-500"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="font-semibold text-sm">
                {node.data.label}
              </h3>

              <div className="text-xs mt-2 space-y-1">
                <p>Sent: {node.data.metrics?.sent ?? 0}</p>
                <p>Opened: {node.data.metrics?.opened ?? 0}</p>
                <p>Clicked: {node.data.metrics?.clicked ?? 0}</p>
                <p>Converted: {node.data.metrics?.converted ?? 0}</p>
              </div>

              <div className="flex justify-between mt-3">
                {/* Edit */}
                <button
                  className="text-xs text-blue-600"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>

                {/* Delete */}
                {!isStart && !isEnd && (
                  <button
                    className="text-xs text-red-600"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {!isEnd && (
        <Handle type="source" position={Position.Right} />
      )}
    </div>
  );
}