import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Tagro — der Operations Interpreter von Festag";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage(
    "Tagro übersetzt Arbeit in Klarheit.",
    "Kein Chatbot. Ein Interpreter, der eure Organisation kennt.",
  );
}
