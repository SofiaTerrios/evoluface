import { HOMINID_STAGES } from './hominids';
import { DISCOVERIES } from './discoveries';
import { ARCHEOLOGY_ITEMS } from './archeology-items';
import { CULTURAL_LAYERS } from './layers';

export type SearchableItem = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  type: 'Hominid' | 'Discovery' | 'Archeology' | 'Culture';
  path: string;
  tags: string[];
};

export function getAllSearchableData(): SearchableItem[] {
  const hominids: SearchableItem[] = HOMINID_STAGES.map((h) => ({
    id: h.name,
    title: h.name,
    subtitle: h.years,
    description: `${h.facialFeatures} ${h.craniumFeatures}`,
    type: 'Hominid',
    path: `/evoluface`, // Or a path that can focus on this hominid
    tags: [h.name, h.years],
  }));

  const discoveries: SearchableItem[] = DISCOVERIES.map((d) => ({
    id: d.id,
    title: d.title,
    subtitle: d.date,
    description: d.summary,
    type: 'Discovery',
    path: `/hominids`,
    tags: [d.title, d.hominidTag, d.typeTag],
  }));

  const archeology: SearchableItem[] = ARCHEOLOGY_ITEMS.map((a) => ({
    id: a.id,
    title: a.title,
    subtitle: a.period,
    description: a.description,
    type: 'Archeology',
    path: `/archeology`,
    tags: [a.title, a.period],
  }));

  const culture: SearchableItem[] = CULTURAL_LAYERS.map((c) => ({
    id: c.id,
    title: c.title,
    subtitle: c.period,
    description: c.description,
    type: 'Culture',
    path: `/cultura`,
    tags: [c.title, c.period],
  }));

  return [...hominids, ...discoveries, ...archeology, ...culture];
}
