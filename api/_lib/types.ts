export type FileType = "png" | "jpeg";
export type Theme = "light" | "dark";

export interface ParsedRequest {
  fileType: FileType;
  text: string;
  theme: Theme;
  fontSize: string;
  image: string;
  width: string;
  height: string;
  v: string;
}
