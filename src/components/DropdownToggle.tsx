import { Signal } from "solid-js";
import { Arrow } from "./Arrow";

interface DropdownToggleProps {
    isOpen: boolean
    toggleOpen: (event: MouseEvent) => void;
}

export const DropdownToggle = (props: DropdownToggleProps) => {
    return (
        <div onClick={props.toggleOpen} class="mx-2 text-sm cursor-pointer inline-flex justify-center items-center w-6 h-6 rounded-sm  hover:bg-indigo-900 transition-colors duration-150 ease-in-out">
            {props.isOpen ? (
              <span class="transition-transform transform rotate-90"><Arrow/></span>
            ) : (
              <span class="transition-transform"><Arrow/></span>
            )}
          </div> 
    )
};
