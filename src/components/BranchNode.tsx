import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";

export type BranchNodeType = Node<{ color: string }, "branch">;

// A branch point: the dot from which arrows fan out to a group
export default function BranchNode({ data }: NodeProps<BranchNodeType>) {
  return (
    <div
      className="size-5 rounded-full border-[3px] border-ink shadow-[2px_2px_0_var(--color-ink)]"
      style={{ backgroundColor: data.color }}
    >
      {/* React Flow attaches edges to handles; FloatingEdge ignores where they are */}
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={false}
        className="opacity-0"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={false}
        className="opacity-0"
      />
    </div>
  );
}
