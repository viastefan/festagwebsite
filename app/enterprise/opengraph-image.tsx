import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Festag Enterprise — White-Label & Security";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage(
    "Festag als euer Produkt. Eure Marke vorne.",
    "White-Label, Security und Datenschutz — Server in Deutschland.",
  );
}
