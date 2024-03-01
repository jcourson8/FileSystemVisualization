import { createSignal, Show } from 'solid-js';
import knowledgeData from './data/knowledge.json';
import { Item } from './components/Item';
import type { ContentProps } from './models';
import { SelectedItemDetails } from './components/SelectedItemDetails';


export const App = () => {
  const [selectedItem, setSelectedItem] = createSignal<ContentProps | null>(null);
  // const [isDarkMode, setIsDarkMode] = createSignal(false);

  const handleSelectItem = (item: ContentProps) => {
    setSelectedItem(item);
  };

  // const toggleDarkMode = () => setIsDarkMode(!isDarkMode());

  return (
    <div class="flex divide-x min-h-screen">
      <div class="w-2/5 px-5 py-5 overflow-auto">
        <h1 class="text-xl font-bold mb-4">Knowledge Base</h1>
        <Item {...knowledgeData as ContentProps} onSelectItem={handleSelectItem}/>
      </div>
      <div class="w-3/5 pl-5 py-5 bg-gray-50 overflow-auto">
        <Show when={selectedItem()} fallback={<p>No item selected. Please select an item to see its details.</p>}>
          <SelectedItemDetails selectedItem={selectedItem} />
        </Show>
      </div>
    </div>
  );
};
