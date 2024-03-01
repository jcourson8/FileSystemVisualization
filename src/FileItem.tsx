import type { FileProps } from "./models";

export const FileItem = (props: FileProps) => {
  return <div>{props.name}</div>;
};