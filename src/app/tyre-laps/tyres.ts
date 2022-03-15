export interface Tyre {
  compound: 'soft' | 'medium' | 'hard' | 'intermediate' | 'wet';
  laps: number;
  threshold: number;
}

export let tyres: Tyre[] = [
  {
    compound: 'soft',
    laps: 7,
    threshold: 15,
  },
  {
    compound: 'medium',
    laps: 11,
    threshold: 10,
  },
  {
    compound: 'hard',
    laps: 15,
    threshold: 5,
  },
  {
    compound: 'intermediate',
    laps: 18,
    threshold: 0,
  },
  {
    compound: 'wet',
    laps: 18,
    threshold: 0,
  },
];
