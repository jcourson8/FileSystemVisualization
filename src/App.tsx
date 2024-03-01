import { createSignal, Show } from 'solid-js';
import knowledgeData from './data/knowledge.json';
import { Item } from './components/Item';
import type { ContentProps } from './models';
import { SelectedItemDetails } from './components/SelectedItemDetails';


export const App = () => {
  const [selectedItem, setSelectedItem] = createSignal<ContentProps | null>(null);
  // const [isDarkMode, setIsDarkMode] = createSignal(false);
  const [updateTrigger, setUpdateTrigger] = createSignal(0); // Trigger for updating line positions

  const handleSelectItem = (item: ContentProps) => {
    setSelectedItem(item);
  };


  return (
    <div class="dark flex divide-x  min-h-screen">
      <div class="w-2/5 px-5 py-5 overflow-auto">
        <h1 class="text-xl text-gray-200 font-bold mb-4">Knowledge Base</h1>
        <Item {...knowledgeData as ContentProps} onSelectItem={handleSelectItem} />
      </div>
      <div class="w-3/5 pl-5 py-5 bg-indigo-950 overflow-auto text-gray-300">
        <Show when={selectedItem()} fallback={<p>No item selected. Please select an item to see its details.</p>}>
          <SelectedItemDetails selectedItem={selectedItem} />
        </Show>
      </div>
    </div>
  );
};
