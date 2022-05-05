import { IncomingMessage } from "http";
import { parse } from "url";
import { ParsedRequest } from "./types";

export function parseRequest(req: IncomingMessage) {
  console.log("HTTP " + req.url);
  const { pathname, query } = parse(req.url || "/", true);
  const { fontSize, theme, image, width, height, v } = query || {};

  if (Array.isArray(fontSize)) {
    throw new Error("Expected a single fontSize");
  }

  if (Array.isArray(theme)) {
    throw new Error("Expected a single theme");
  }

  if (Array.isArray(image)) {
    throw new Error("Expected a single image");
  }

  if (Array.isArray(width)) {
    throw new Error("Expected a single width");
  }

  if (Array.isArray(height)) {
    throw new Error("Expected a single height");
  }

  if (Array.isArray(v)) {
    throw new Error("Expected a single v");
  }

  const arr = (pathname || "/").slice(1).split(".");
  let extension = "";
  let text = "";
  if (arr.length === 0) {
    text = "";
  } else if (arr.length === 1) {
    text = arr[0];
  } else {
    extension = arr.pop() as string;
    text = arr.join(".");
  }

  const parsedRequest: ParsedRequest = {
    fileType: extension === "jpeg" ? extension : "png",
    text: decodeURIComponent(text),
    theme: theme === "dark" ? "dark" : "light",
    fontSize: fontSize || "96px",
    image:
      image ||
      "https://dev.cubdesign.com/static/favicon/android-chrome-192x192.png",
    width: width || "120",
    height: height || "120",
    v: v || "1.0.0",
  };

  return parsedRequest;
}
