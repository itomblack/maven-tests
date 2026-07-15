import { useState } from "react";
import { firstThreeMonthTotal, medications, money, supportingCopy } from "../data";
import type { SelectionProps } from "../types";
import {
  Badge,
  DisclosureButton,
  NotSureCard,
  ScreenIntro,
  SelectableCard,
  SelectIndicator,
} from "../components/Shared";

export function CommitmentPreview(props: SelectionProps) {
  const [open, setOpen] = useState<string | null>("wegovy-pill");
  return (
    <>
      <ScreenIntro eyebrow="Plan the next three months" body={supportingCopy} />
      <div className="grid gap-12">
        {medications.map((medication) => {
          const selected = props.selected === medication.id;
          const expanded = open === medication.id;
          return (
            <SelectableCard
              key={medication.id}
              selected={selected}
              onClick={() => props.onSelect(medication.id)}
              label={`Select ${medication.name}, estimated ${money(firstThreeMonthTotal(medication))} for three months`}
            >
              <span className="flex items-start gap-12">
                <span className="min-w-0 flex-1">
                  <span className="font-primary text-overline uppercase tracking-overline text-text-secondary">
                    Estimated first 3 months
                  </span>
                  <strong className="price-nums mt-4 block font-emphasis text-headline-lg font-normal text-maven-800">
                    {money(firstThreeMonthTotal(medication))}
                  </strong>
                  <span className="mt-8 flex flex-wrap items-center gap-4">
                    <strong className="font-primary text-body-default font-medium text-text-primary">
                      {medication.name}
                    </strong>
                    <Badge quiet>{medication.type}</Badge>
                  </span>
                </span>
                <SelectIndicator selected={selected} />
              </span>
              <span className="mt-12 block">
                <DisclosureButton open={expanded} onClick={() => setOpen(expanded ? null : medication.id)}>
                  How this is calculated
                </DisclosureButton>
              </span>
              {expanded ? (
                <span className="mt-12 grid gap-8 rounded-sm bg-coconut-100 p-12">
                  {[
                    ["Month 1", medication.firstMonth],
                    ["Month 2", medication.firstMonth],
                    ["Month 3", medication.ongoing],
                  ].map(([label, amount]) => (
                    <span key={label} className="flex justify-between gap-12 font-primary text-body-sm">
                      <span className="text-text-secondary">{label}</span>
                      <strong className="price-nums font-medium text-text-primary">{money(Number(amount))}</strong>
                    </span>
                  ))}
                  <span className="border-t border-border-disabled pt-8 font-primary text-legal text-text-secondary">
                    Medication only. Maven membership is separate.
                  </span>
                </span>
              ) : null}
            </SelectableCard>
          );
        })}
        <NotSureCard {...props} />
      </div>
    </>
  );
}
