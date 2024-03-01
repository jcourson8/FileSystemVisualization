import { Component, For } from 'solid-js';
import { ContentProps } from '../models'; // Assuming this is your type definition

interface SelectedItemDetailsProps {
  selectedItem: () => ContentProps;
}

export const SelectedItemDetails: Component<SelectedItemDetailsProps> = ({ selectedItem }) => {
  // Helper function to determine how to render different types of values
  const renderValue = (value: any) => {
    // console.log('renderValue called with:', value);
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
      // Check that value is not null or undefined before calling toString
      return <span>{value.toString()}</span>;
    } else {
      // Return a placeholder or an empty string if value is null or undefined
      return <span>N/A</span>; // or <span></span> if you prefer not to display anything
    }
  };

  return (
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
  );
};
