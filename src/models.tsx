export interface FileProps {
    name: string;
    type: "file";
  }
  
  export interface DirectoryProps {
    name: string;
    type: "directory";
    contents: Array<DirectoryProps | FileProps>;
  }
  
  export interface ContentProps {
    type: string;
    name: string;
    absolute_path: string;
    text: string;
    uuid: string;
    contents: ContentProps[];
    explanation?: any; // Adjust based on actual type
    preliminary_context?: string;
    metadata?: Record<string, any>; // Adjust based on actual structure
    dependencies?: any[]; // Adjust based on actual type
    expanded_state?: string;
  
    // PythonEntity-specific properties
    node_type?: string;
    decorator?: any; // Adjust based on actual type
    imports?: string[];
  
    // RootDirectory-specific properties
    ignored_directories?: string[];
    directory_name?: string;
    // parentUuid: string;
  
    // Any other custom properties from other entity types
    
  }

  export interface TreeNode {
    id: string;
    name: string;
    children?: TreeNode[];
  }