import type { ImageMetadata } from 'astro';

import campusFront from '../assets/images/campus-front.jpg';
import campusCourtyard from '../assets/images/campus-courtyard.jpg';
import gradContinentsStage from '../assets/images/grad-continents-stage.jpg';
import gradAntarctica from '../assets/images/grad-antarctica.jpg';
import gradWorldLine from '../assets/images/grad-world-line.jpg';
import gradFlowerApple from '../assets/images/grad-flower-apple.jpg';
import gradRoots from '../assets/images/grad-roots.jpg';
import gradShapesTeacher from '../assets/images/grad-shapes-teacher.jpg';
import gradShapesHearts from '../assets/images/grad-shapes-hearts.jpg';
import playCarousel from '../assets/images/play-carousel.jpg';
import tableActivity from '../assets/images/table-activity.jpg';
import summerSchool2024 from '../assets/images/summer-school-2024.jpg';
import youngChef from '../assets/images/young-chef.jpg';
import codingLab from '../assets/images/coding-lab.jpg';
import artColouring from '../assets/images/art-colouring.jpg';
import craftFans from '../assets/images/craft-fans.jpg';
import handsUp from '../assets/images/hands-up.jpg';
import codingScratch from '../assets/images/coding-scratch.jpg';
import littleScientist from '../assets/images/little-scientist.jpg';
import sortingBeads from '../assets/images/sorting-beads.jpg';
import countingSticks from '../assets/images/counting-sticks.jpg';
import outdoorDiscovery from '../assets/images/outdoor-discovery.jpg';
import dentalHealthTalk from '../assets/images/dental-health-talk.jpg';
import admissionsDay from '../assets/images/admissions-day.jpg';
import firstDaySigns from '../assets/images/first-day-signs.jpg';
import showForthYourLight from '../assets/images/show-forth-your-light.jpg';
import welcomeBack from '../assets/images/welcome-back.jpg';

export type Category = 'events' | 'learning' | 'play' | 'campus';

export interface Media {
  src: ImageMetadata;
  alt: string;
  caption: string;
  category: Category;
}

export const media = {
  campusFront: {
    src: campusFront,
    alt: 'The two-storey Karisbridge Schools building with its ocean-themed shark mural entrance and paved courtyard',
    caption: 'Our campus — and the famous shark entrance',
    category: 'campus',
  },
  campusCourtyard: {
    src: campusCourtyard,
    alt: 'The Karisbridge Schools building and courtyard, with a KBS Summer School 2024 sign by the entrance',
    caption: 'A calm, gated courtyard in Kajola Estate',
    category: 'campus',
  },
  gradContinentsStage: {
    src: gradContinentsStage,
    alt: 'Children in traditional dress from around the world singing on stage at the graduation ceremony',
    caption: 'Voices from every continent',
    category: 'events',
  },
  gradAntarctica: {
    src: gradAntarctica,
    alt: 'Pupils dressed for Antarctica and Europe holding continent signs at the graduation ceremony',
    caption: 'From Antarctica to Europe',
    category: 'events',
  },
  gradWorldLine: {
    src: gradWorldLine,
    alt: 'A line of pupils in costumes representing the continents of the world on the graduation stage',
    caption: 'Around the world in one afternoon',
    category: 'events',
  },
  gradFlowerApple: {
    src: gradFlowerApple,
    alt: 'Two nursery pupils dressed as a daisy and an apple for a performance',
    caption: 'How a seed becomes a flower — and fruit',
    category: 'events',
  },
  gradRoots: {
    src: gradRoots,
    alt: 'Young pupils dressed as the roots and leaves of a plant, standing with their teachers on stage',
    caption: 'Roots, leaves and proud teachers',
    category: 'events',
  },
  gradShapesTeacher: {
    src: gradShapesTeacher,
    alt: 'A smiling teacher with toddlers holding colourful paper shapes with happy faces',
    caption: 'Our littlest graduates and their shapes',
    category: 'events',
  },
  gradShapesHearts: {
    src: gradShapesHearts,
    alt: 'Toddlers holding a pink triangle and heart shapes with smiling faces as a teacher kneels beside them',
    caption: 'Triangles, hearts and big smiles',
    category: 'events',
  },
  playCarousel: {
    src: playCarousel,
    alt: 'A smiling boy in a red uniform on the playground roundabout',
    caption: 'Playtime on the roundabout',
    category: 'play',
  },
  tableActivity: {
    src: tableActivity,
    alt: 'A teacher leading a hands-on table activity with a group of young pupils',
    caption: 'Learning together around the table',
    category: 'learning',
  },
  summerSchool2024: {
    src: summerSchool2024,
    alt: 'A pupil posing beside the KBS Summer School 2024 sign',
    caption: 'KBS Summer School 2024',
    category: 'events',
  },
  youngChef: {
    src: youngChef,
    alt: 'A smiling girl in a chef’s hat and apron holding a cupcake she made',
    caption: 'Our young chefs at work',
    category: 'learning',
  },
  codingLab: {
    src: codingLab,
    alt: 'Pupils working on laptops in the computer lab',
    caption: 'Coding in the computer lab',
    category: 'learning',
  },
  artColouring: {
    src: artColouring,
    alt: 'A boy concentrating on a colouring and drawing activity',
    caption: 'Art that asks for focus',
    category: 'learning',
  },
  craftFans: {
    src: craftFans,
    alt: 'Girls holding up handmade woven craft pieces in the classroom',
    caption: 'Craft and culture',
    category: 'learning',
  },
  handsUp: {
    src: handsUp,
    alt: 'Pupils eagerly raising their hands in class',
    caption: 'Every hand up',
    category: 'learning',
  },
  codingScratch: {
    src: codingScratch,
    alt: 'A girl building a block-based coding project on a laptop',
    caption: 'Block-based coding',
    category: 'learning',
  },
  littleScientist: {
    src: littleScientist,
    alt: 'A laughing boy in a lab coat showing his paint-covered hands',
    caption: 'Science is meant to be messy',
    category: 'learning',
  },
  sortingBeads: {
    src: sortingBeads,
    alt: 'A boy sorting colourful beads into trays',
    caption: 'Sorting, counting, noticing',
    category: 'learning',
  },
  countingSticks: {
    src: countingSticks,
    alt: 'A girl arranging coloured counting sticks to solve number problems',
    caption: 'Hands-on number work',
    category: 'learning',
  },
  outdoorDiscovery: {
    src: outdoorDiscovery,
    alt: 'Pupils gathered outdoors watching their teacher pour water into a basin during an experiment',
    caption: 'Outdoor discovery',
    category: 'play',
  },
  dentalHealthTalk: {
    src: dentalHealthTalk,
    alt: 'Pupils in uniform seated for a dental health talk with a smile poster on the wall',
    caption: 'Health and wellbeing: a dental visit',
    category: 'play',
  },
  admissionsDay: {
    src: admissionsDay,
    alt: 'Two women and a pupil holding a presentation cheque beside a Karisbridge admission banner',
    caption: 'A special presentation at Karisbridge',
    category: 'events',
  },
  firstDaySigns: {
    src: firstDaySigns,
    alt: 'Two pupils holding signs that read “Show forth your light” and “Amazing things happen here”',
    caption: 'Amazing things happen here',
    category: 'events',
  },
  showForthYourLight: {
    src: showForthYourLight,
    alt: 'A boy in school uniform holding a star-shaped sign that reads “Show forth your light”',
    caption: 'Show forth your light',
    category: 'events',
  },
  welcomeBack: {
    src: welcomeBack,
    alt: 'A teacher with pupils holding “Welcome back to school” signs beside the flags at the entrance',
    caption: 'Welcome back to school',
    category: 'events',
  },
} satisfies Record<string, Media>;

export type MediaKey = keyof typeof media;

/** Order used by the Life at KBS gallery. */
export const galleryOrder: MediaKey[] = [
  'gradWorldLine',
  'youngChef',
  'codingLab',
  'littleScientist',
  'gradShapesTeacher',
  'playCarousel',
  'countingSticks',
  'campusFront',
  'showForthYourLight',
  'sortingBeads',
  'gradContinentsStage',
  'artColouring',
  'handsUp',
  'welcomeBack',
  'gradFlowerApple',
  'codingScratch',
  'outdoorDiscovery',
  'craftFans',
  'gradRoots',
  'summerSchool2024',
  'tableActivity',
  'dentalHealthTalk',
  'campusCourtyard',
  'firstDaySigns',
  'gradAntarctica',
  'admissionsDay',
  'gradShapesHearts',
];

export const categories: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'Everything' },
  { id: 'events', label: 'Celebrations' },
  { id: 'learning', label: 'Learning' },
  { id: 'play', label: 'Play & wellbeing' },
  { id: 'campus', label: 'Campus' },
];
