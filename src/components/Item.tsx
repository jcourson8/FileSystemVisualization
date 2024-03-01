import { createSignal, For } from 'solid-js';
import type { ContentProps } from '../models';
import { Arrow } from './Arrow';

interface ItemProps extends ContentProps {
  onSelectItem: (item: ContentProps) => void;
}

export const Item = (props: ItemProps) => {
  const [isOpen, setIsOpen] = createSignal(false);

  const toggleOpen = (event: MouseEvent) => {
    event.stopPropagation();
    setIsOpen(!isOpen());
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
    <div> 
      <div onClick={handleClick} class={`cursor-pointer font-semibold ${itemColor()} flex items-center gap-2`}>
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
          <For each={props.contents}>{(item) => (
            <div class="my-3 last:mb-0">
              <Item {...item} onSelectItem={props.onSelectItem} parentUuid={props.uuid} />
            </div>
          )}</For>
        </div>
      )}
    </div>
  );
};
