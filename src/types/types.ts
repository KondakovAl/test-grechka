export interface MovieCardProps {
  id: number;
  name: string;
  description: string;
  src: string;
}

export interface Marks {
  scenario: number;
  actors: number;
  operator: number;
}

export interface RatedCards extends MovieCardProps {
  marks: Marks;
}
