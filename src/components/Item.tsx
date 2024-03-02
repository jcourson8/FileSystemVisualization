import { createEffect, createSignal, For, onCleanup, onMount } from 'solid-js';
import type { ContentProps } from '../models';
import { Arrow } from './Arrow';
import { Connector } from './Connector';
import { DropdownToggle } from './DropdownToggle';
import type { Signal, Accessor, Setter } from 'solid-js';

interface ItemProps extends ContentProps {
  onSelectItem: (item: ContentProps) => void;
  updateSignal: Accessor<number>;
  triggerUpdate: () => void;
  parentRef?: HTMLElement; // Optional: Reference to the parent item's HTML element
}

export const Item = (props: ItemProps) => {
  let itemRef: HTMLElement; // Reference to this item's HTML element
  const [isOpen, setIsOpen] = createSignal(false);
  const [linePoints, setLinePoints] = createSignal({ xStart: 0, yStart: 0, xEnd: 0, yEnd: 0 });
  
  // Function to calculate and update line points between this item and its parent
  const updateLinePoints = () => {
    if (!props.parentRef) {
      return;
    }
    console.log('updateLinePoints');
  
    const parentRect = props.parentRef.getBoundingClientRect();
    const itemRect = itemRef.getBoundingClientRect();

    // const xOffset = 12; // depends on the width of the icon and such
    const yOffset = 14; // depends on the width of the icon and such

    const xStart = (parentRect.left + parentRect.right) / 2 ;
    const yStart = parentRect.bottom;
    const xEnd = itemRect.left;
    const yEnd = (itemRect.top + itemRect.bottom) / 2;

    setLinePoints({ xStart, yStart, xEnd, yEnd });
  };
  

  // setInterval(() => updateLinePoints(), 10);
  

  // Update line points on mount and when isOpen changes
  onMount(() => {
    window.addEventListener('resize', updateLinePoints);
    updateLinePoints();
  });


  createEffect(() => {
    const signalValue = props.updateSignal();
    updateLinePoints();
  });

  // Cleanup
  onCleanup(() => {
    window.removeEventListener('resize', updateLinePoints);
  });

  const toggleOpen = (event: MouseEvent) => {
    event.stopPropagation();
    setIsOpen(!isOpen());
    props.triggerUpdate();
    
    // setTimeout(updateLinePoints, 100);    
    // console.log('toggleOpen');
    // onToggle();
    
  };

  const handleClick = (event: MouseEvent) => {
    event.stopPropagation();
    props.onSelectItem(props);
  };

  const isDirectory = props.type === 'Directory' || props.type === 'RootDirectory';
  const isPythonEntity = props.type === 'PythonEntity';
  const isFile = (!isDirectory && !isPythonEntity);

  const isDropDownable = () => {
    return (props.contents && props.contents.length > 0) && (isDirectory || isPythonEntity)
  }


  const renderIcon = () => {
    if (isFile) return '📄';
    if (isDirectory) return isOpen() ? '📂' : '📁';
    if (isPythonEntity) return '🐍';
    return '';
  };

  const itemColor = () => {
    if (isFile) return 'text-indigo-300';
    if (isDirectory) return 'text-gray-300';
    if (isPythonEntity) return 'text-orange-500';
    return 'text-black';
  };

  return (
    <div class="relative-container">
      {/* Conditionally render the SVG line if this item has a parent */}
      {props.parentRef && (
        <Connector  
          linePoints={linePoints()}
        />
      )}
      <div onClick={handleClick} class={`relative cursor-pointer font-semibold ${itemColor()} flex items-center gap-2`}>
        <span ref={itemRef} class="inline-flex mr-2 w-6 h-6 rounded-sm bg-dark-800 items-center justify-center z-10">  
          {renderIcon()}
        </span>
        <span class="flex-1 truncate hover:underline">{props.name}</span>
        {props.contents && props.contents.length > 0 && (
          <DropdownToggle isOpen={isOpen()} toggleOpen={toggleOpen} />
        )}
      </div>
      {isDropDownable() && isOpen() && (
        <div class="pl-10">
          <For each={props.contents}>{(item, index) => (
            <div class="my-5 last:mb-0">
              <Item {...item} onSelectItem={props.onSelectItem} parentRef={itemRef} updateSignal={props.updateSignal} triggerUpdate={props.triggerUpdate} />
            </div>
          )}</For>
        </div>
      )}
    </div>
  );
};
