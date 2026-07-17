// ─── Art Gallery ────────────────────────────────────────────────────────────
// To add a photo:
//   1. Drop the file into src/assets/project/about/
//   2. Import it at the top, e.g.:
//        import koiFish from "../../assets/project/about/koi-fish.jpg";
//   3. Set `image: koiFish` on the item.
//
// Each category shows up to 4 photos scattered around the center menu.
// Slots fill left→right: large-left, small-left, large-right, small-right.

import calligraphy2 from "../../assets/project/about/calligraphy-2.JPG";
import art2 from "../../assets/project/about/art_2.png";
import art3 from "../../assets/project/about/art_3.png";
import ipad1 from "../../assets/project/about/ipad-1.jpg";
import ipad2 from "../../assets/project/about/ipad-2.jpg";
import ipad4 from "../../assets/project/about/ipad-4.jpg";
import shoe1 from "../../assets/project/about/art_1.JPG";
import shoe2 from "../../assets/project/about/shoe-2.jpg";
import shoe3 from "../../assets/project/about/shoe-3.jpg";
import shoe4 from "../../assets/project/about/shoe-4.jpg";
import traditional1 from "../../assets/project/about/traditional-1.jpg";
import traditional3 from "../../assets/project/about/traditional-3.jpg";
import traditional4 from "../../assets/project/about/traditional-4.jpg";

export const GALLERY_SECTION_LABEL    = "Early Days";
export const GALLERY_SECTION_SUBTITLE = "I did a lot as a kid / teenager. Here's some of my favorite phases.";

export type ArtPhoto = {
  tag: string;       // small uppercase label, e.g. "CUSTOM" or "PRINT"
  title?: string;    // main name — omit to hide
  subtitle: string;  // material, medium, or year
  image?: string;    // imported asset — undefined shows a dark placeholder
};

export type ArtCategory = {
  label: string;    // shown in the center menu
  year: string;     // e.g. "c. 2020"
  photos: ArtPhoto[];
};

export const ART_CATEGORIES: ArtCategory[] = [
  {
    label: "CALLIGRAPHY",
    year: "c. 2016",
    photos: [
      { tag: "2016", title: "Ocean",  subtitle: "Watercolor + Nib", image: calligraphy2 },
      { tag: "2016", title: "Galaxy", subtitle: "Brush Pens",       image: art2 },
    ],
  },
  {
    label: "IPAD",
    year: "c. 2019",
    photos: [
      { tag: "2019", title: "DTIYS",  subtitle: "Procreate", image: ipad1 },
      { tag: "2019", title: "Energy", subtitle: "Procreate", image: ipad2 },
      { tag: "2020", title: "Hair",   subtitle: "Procreate", image: ipad4 },
    ],
  },
  {
    label: "SHOES",
    year: "c. 2020",
    photos: [
      { tag: "2020", title: "Koi Fish",  subtitle: "Angelus Paint", image: shoe1 },
      { tag: "2021", title: "Wave",      subtitle: "Angelus Paint", image: shoe2 },
      { tag: "2020", title: "Butterfly", subtitle: "Angelus Paint", image: shoe3 },
      { tag: "2021", title: "Flower",    subtitle: "Angelus Paint", image: shoe4 },
    ],
  },
  {
    label: "TRADITIONAL",
    year: "c. 2022",
    photos: [
      { tag: "2021", title: "Blob",              subtitle: "Colored Pencil",      image: traditional1 },
      { tag: "2022", title: "Girl",              subtitle: "Ink",                  image: art3 },
      { tag: "2021", title: "Decorative Plate",  subtitle: "Clay",                 image: traditional3 },
      { tag: "2022", title: "Dress",             subtitle: "Crochet Trashbags",    image: traditional4 },
    ],
  },
];
