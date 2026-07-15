export type MedicationType = "Pill" | "Injection";

export type Medication = {
  id: string;
  name: string;
  type: MedicationType;
  generic: string;
  firstMonth: number;
  ongoing: number;
  prepay3?: number;
  prepay12?: number;
  badge: string;
  cadence: string;
  insurance: string;
  approval: string;
  why: string;
};

export type SelectionProps = {
  selected: string | null;
  onSelect: (id: string) => void;
};

export type ConceptAnnotation = {
  label: string;
  name: string;
  technique: string;
  hypothesis: string;
  risk: string;
  metric: string;
};
