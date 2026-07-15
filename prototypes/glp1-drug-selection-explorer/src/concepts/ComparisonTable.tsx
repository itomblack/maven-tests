import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { medications, money, supportingCopy } from "../data";
import type { Medication, SelectionProps } from "../types";
import {
  Badge,
  MedicationIcon,
  NotSureCard,
  ScreenIntro,
  SelectableCard,
  SelectIndicator,
  cn,
} from "../components/Shared";

function ComparisonColumn({ medication }: { medication: Medication }) {
  const rows = [
    ["Format", medication.type],
    ["First month", money(medication.firstMonth)],
    ["Ongoing", `${money(medication.ongoing)}/mo`],
    ["12-month", medication.prepay12 ? `${money(medication.prepay12)}/mo` : "Not offered"],
    ["Frequency", medication.cadence],
    ["Insurance", medication.insurance],
    ["Approval", medication.approval],
  ];
  return (
    <article className="min-w-full rounded-md border border-border-disabled bg-surface-primary p-16">
      <div className="mb-16 flex items-center gap-12">
        <MedicationIcon type={medication.type} />
        <div>
          <h3 className="m-0 font-primary text-subheadline-xs font-medium text-text-primary">{medication.name}</h3>
          <p className="m-0 font-primary text-legal text-text-secondary">{medication.generic}</p>
        </div>
      </div>
      <dl className="m-0 grid gap-0">
        {rows.map(([label, value]) => (
          <div key={label} className="grid grid-cols-2 gap-12 border-t border-border-disabled py-12 font-primary text-body-sm">
            <dt className="text-text-secondary">{label}</dt>
            <dd className="price-nums m-0 text-right font-medium text-text-primary">{value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

export function ComparisonTable(props: SelectionProps) {
  const [compareIds, setCompareIds] = useState<string[]>(["wegovy-pill", "zepbound-kwikpen"]);
  const [showComparison, setShowComparison] = useState(false);

  const toggleCompare = (id: string) => {
    setCompareIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length === 3) return current;
      return [...current, id];
    });
  };

  return (
    <>
      <ScreenIntro eyebrow="Build a short list" body={supportingCopy} />
      <div className="mb-16 rounded-md border border-border-brand bg-maven-25 p-12">
        <div className="flex items-center justify-between gap-12">
          <div>
            <strong className="block font-primary text-body-sm font-medium text-text-primary">
              Compare up to 3
            </strong>
            <span className="font-primary text-legal text-text-secondary">{compareIds.length} selected to compare</span>
          </div>
          <button
            type="button"
            disabled={compareIds.length < 2}
            onClick={() => setShowComparison((value) => !value)}
            className="rounded-full bg-fill-button-primary px-12 py-8 font-primary text-body-sm text-text-primary-inverse disabled:bg-fill-button-disabled disabled:text-text-disabled"
          >
            {showComparison ? "Hide" : "Compare"}
          </button>
        </div>
      </div>
      {showComparison ? (
        <section aria-label="Medication comparison" className="mb-16 grid gap-12">
          <p className="m-0 font-primary text-legal text-text-secondary">Swipe between selected medications.</p>
          <div className="flex snap-x gap-12 overflow-x-auto">
            {compareIds.map((id) => (
              <div key={id} className="min-w-full snap-start">
                <ComparisonColumn medication={medications.find((item) => item.id === id)!} />
              </div>
            ))}
          </div>
        </section>
      ) : null}
      <div className="grid gap-12">
        {medications.map((medication) => {
          const selected = props.selected === medication.id;
          const compared = compareIds.includes(medication.id);
          return (
            <SelectableCard
              key={medication.id}
              selected={selected}
              onClick={() => props.onSelect(medication.id)}
              label={`Select ${medication.name}`}
            >
              <span className="flex items-center gap-12">
                <span className="min-w-0 flex-1">
                  <strong className="block font-primary text-body-default font-medium text-text-primary">
                    {medication.name}
                  </strong>
                  <span className="mt-4 flex items-center gap-4"><Badge quiet>{medication.type}</Badge></span>
                  <span className="mt-8 block font-primary text-body-sm text-text-secondary">
                    {money(medication.firstMonth)} first · {money(medication.ongoing)}/mo ongoing
                  </span>
                  <button
                    type="button"
                    aria-pressed={compared}
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleCompare(medication.id);
                    }}
                    className={cn(
                      "mt-8 flex items-center gap-4 rounded-full border px-8 py-4 font-primary text-legal",
                      compared
                        ? "border-border-brand bg-maven-100 text-maven-800"
                        : "border-border-disabled bg-surface-primary text-text-secondary",
                    )}
                  >
                    {compared ? <Check aria-hidden="true" className="size-12" /> : <Plus aria-hidden="true" className="size-12" />}
                    {compared ? "In comparison" : "Add to compare"}
                  </button>
                </span>
                <SelectIndicator selected={selected} />
              </span>
            </SelectableCard>
          );
        })}
        <NotSureCard {...props} />
      </div>
    </>
  );
}
