import { createEffect, createSignal, For, onCleanup, onMount } from 'solid-js';
import type { ContentProps } from '../models';
import { Arrow } from './Arrow';

interface ItemProps extends ContentProps {
  onSelectItem: (item: ContentProps) => void;
  parentRef?: HTMLElement; // Optional: Reference to the parent item's HTML element
}

export const Item = (props: ItemProps) => {
  let itemRef: HTMLElement; // Reference to this item's HTML element
  const [isOpen, setIsOpen] = createSignal(false);
  const [linePoints, setLinePoints] = createSignal({ x1: 0, y1: 0, x2: 0, y2: 0 });

  // Function to calculate and update line points between this item and its parent
  const updateLinePoints = () => {
    if (!props.parentRef || !itemRef) {
      return;
    }

    const parentRect = props.parentRef.getBoundingClientRect();
    const itemRect = itemRef.getBoundingClientRect();

    // Adjust these calculations as needed for your layout
    setLinePoints({
      x1: parentRect.left + 10,
      y1: parentRect.top + 20,
      x2: itemRect.left,
      y2: itemRect.top + 10,
    });
  };

  // Update line points on mount and when isOpen changes
  onMount(() => {
    window.addEventListener('resize', updateLinePoints);
    updateLinePoints();
  });

  createEffect(updateLinePoints);

  // Cleanup
  onCleanup(() => {
    window.removeEventListener('resize', updateLinePoints);
  });

  const toggleOpen = (event: MouseEvent) => {
    event.stopPropagation();
    setIsOpen(!isOpen());
    setTimeout(updateLinePoints, 10); // Update line positions after the toggle animation
  };

  const handleClick = (event: MouseEvent) => {
    event.stopPropagation();
    props.onSelectItem(props);
  };

  const isDirectory = props.type === 'Directory' || props.type === 'RootDirectory';
  const isPythonEntity = props.type === 'PythonEntity';
  const isFile = (!isDirectory && !isPythonEntity);

  const renderIcon = () => {
    if (isFile) return '📄';
    if (isDirectory) return isOpen() ? '📂' : '📁';
    if (isPythonEntity) return '🐍';
    return '';
  };

  const itemColor = () => {
    if (isFile) return 'text-indigo-800';
    if (isDirectory) return 'text-gray-800';
    if (isPythonEntity) return 'text-yellow-900';
    return 'text-black';
  };

  return (
    <div ref={itemRef}>
      {/* Conditionally render the SVG line if this item has a parent */}
      {props.parentRef && (
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        <line {...linePoints()} stroke="black" strokeWidth="2" style={{ pointerEvents: 'none' }} />
      </svg>
      )}
      <div onClick={handleClick} class={`relative cursor-pointer font-semibold ${itemColor()} flex items-center gap-2`}>
        <span class="inline-flex mr-2 w-5 h-5 rounded-sm bg-gray-300 items-center justify-center">
          {renderIcon()}
        </span>
        <span class="flex-1 truncate hover:underline">{props.name}</span>
        {props.contents && props.contents.length > 0 && (
          <div onClick={toggleOpen} class="mx-2 text-sm cursor-pointer inline-flex justify-center items-center w-6 h-6 rounded-sm hover:bg-gray-300 transition-colors duration-150 ease-in-out">
            {isOpen() ? (
              <span class="transition-transform transform rotate-90"><Arrow/></span>
            ) : (
              <span class="transition-transform"><Arrow/></span>
            )}
          </div>
        )}
      </div>
      {(isDirectory || isPythonEntity) && isOpen() && (
        <div class="pl-7 transition-all duration-500 ease-in-out">
          <For each={props.contents}>{(item, index) => (
            <div class="my-3 last:mb-0">
              <Item {...item} onSelectItem={props.onSelectItem} parentRef={itemRef} />
            </div>
          )}</For>
        </div>
      )}
    </div>
  );
};
