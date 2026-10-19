import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { groups, type Topic } from "@/data/topics";

export type TopicNodeType = Node<
  { topic: Topic; floatDelay: number }, // floatDelay [s] desyncs the floating
  "topic"
>;

// A single topic tile on the physics map, styled like a hand-drawn label:
// group color, thick ink border and a hard offset shadow
export default function TopicNode({ data, dragging }: NodeProps<TopicNodeType>) {
  const { topic } = data;
  const group = groups[topic.group];

  return (
    // Outer div floats gently; the card inside reacts to hover and drag
    <div
      className="motion-safe:animate-float"
      style={{ animationDelay: `${data.floatDelay}s` }}
    >
      <div
        className={`w-44 rounded-lg border-2 border-ink px-3 py-2 text-ink transition duration-200 ${
          dragging
            ? "scale-110 cursor-grabbing shadow-[6px_6px_0_var(--color-ink)]"
            : "cursor-grab shadow-[3px_3px_0_var(--color-ink)] hover:-translate-y-1 hover:shadow-[5px_7px_0_var(--color-ink)]"
        }`}
        style={{ backgroundColor: group.color }}
      >
        <p className="font-mono text-[10px] uppercase tracking-wider opacity-60">
          {group.name}
        </p>
        <p className="mt-0.5 text-sm font-bold leading-tight">{topic.name}</p>
      </div>

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
