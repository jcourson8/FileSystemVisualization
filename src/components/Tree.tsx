// TreeComponent.tsx
import { createEffect, createSignal, For } from 'solid-js';
import { Item } from './Item';
import type { ContentProps } from '../models';

interface TreeProps {
  items: ContentProps[];
  onSelectItem: (item: ContentProps) => void;
}

export const Tree = (props: TreeProps) => {
  const [nodeRefs, setNodeRefs] = createSignal<{ id: string; el: HTMLElement | null }[]>([]);
  const [lines, setLines] = createSignal<{ x1: number; y1: number; x2: number; y2: number }[]>([]);

  const registerNode = (el: HTMLElement | null, id: string) => {
    console.log(`Registering node: ${id}`, el);
    setNodeRefs((prevRefs) => {
      const newRefs = prevRefs.filter(ref => ref.id !== id);
      if (el) newRefs.push({ id, el });
      return newRefs;
    });
  };
  createEffect(() => {
    // Inside your effect that calculates lines
    console.log(lines());
  });

//   createEffect(() => {
//     console.log("Node refs updated", nodeRefs());
//   });

  createEffect(() => {
    const updatedLines = nodeRefs().flatMap(({ id, el }) => {
      if (!el) return [];
      const parentEl = el.closest(".item");
      if (!parentEl) return [];
      const { top: childTop, left: childLeft } = el.getBoundingClientRect();
      const { top: parentTop, left: parentLeft } = parentEl.getBoundingClientRect();
      console.log(`Drawing line from ${id} to ${parentEl.id}`);
      return [{
        x1: parentLeft - 10,
        y1: parentTop - 70,
        x2: childLeft,
        y2: childTop,
      }];
    });
    setLines(updatedLines);
  });

  return (
    <div class="relative tree-container">
      <svg class="absolute top-0 left-0 w-full h-full" style="z-index: 0;">
        <For each={lines()}>{(line) =>
          <line x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="black" stroke-width="2" />
        }</For>
      </svg>
      <div class="relative z-10">
        <Item {...props} onSelectItem={props.onSelectItem} registerNode={registerNode} class={"root"} />
      </div>
    </div>
  );
};
