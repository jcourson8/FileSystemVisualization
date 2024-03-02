import { Accessor, Component, For, createSignal } from 'solid-js';
import { ContentProps } from '../models'; // Assuming this is your type definition
// import { Highlight, Language } from "solid-highlight";

interface SelectedItemDetailsProps {
  selectedItem: Accessor<ContentProps>
}

export const SelectedItemDetails: Component<SelectedItemDetailsProps> = ({ selectedItem }) => {
  const [activeTab, setActiveTab] = createSignal('attributes');
  // const [language, setLanguage] = createSignal<Language>(Language.PYTHON);

  // Helper function to determine how to render different types of values
  const renderValue = (value: any) => {
    if (Array.isArray(value)) {
      return (
        <For each={value}>
          {(item, index) => (
            <div class="px-4 py-2 border-b last:border-b-0">
              <p class="font-medium">{item.name}</p>
              <p class="text-sm text-gray-600">{item.text}</p>
            </div>
          )}
        </For>
      );
    } else if (typeof value === 'object' && value !== null) {
      return <pre>{JSON.stringify(value, null, 2)}</pre>;
    } else if (value !== null && value !== undefined) {
      return <span>{value.toString()}</span>;
    } else {
      return <span>N/A</span>;
    }
  };

  return (
    <div>
      <div class="tabs space-x-2">
        <button class={activeTab() === 'attributes' ? 'active' : ''} onClick={() => setActiveTab('attributes')}>Attributes</button>
        <button class={activeTab() === 'source' ? 'active' : ''} onClick={() => setActiveTab('source')}>Source</button>
        {/* Additional tabs can be added here */}
      </div>

      <div class="tab-content">
        {activeTab() === 'attributes' && (
          <div class="overflow-auto">
            <For each={Object.entries(selectedItem() || {})}>
              {([key, value]) => (
                <div class="pl-4 py-2 border-b last:border-b-0">
                  <p class="font-medium">{key}</p>
                  <div class="text-sm text-gray-600">{renderValue(value)}</div>
                </div>
              )}
            </For>
          </div>
        )}
        {activeTab() === 'source' && (
          <div class="overflow-auto">
            <pre>{selectedItem().source}</pre>
            {/* <Highlight language={language()}>
              {props.source}
            </ Highlight > */}
          </div>
        )}
        {/* Content for additional tabs would go here */}
      </div>
    </div>
  );
};
