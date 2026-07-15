import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { medications, money, supportingCopy } from "../data";
import type { SelectionProps } from "../types";
import {
  MedicationIcon,
  NotSureCard,
  PriceDetails,
  ScreenIntro,
  SelectIndicator,
  cn,
} from "../components/Shared";

export function PriceAccordion(props: SelectionProps) {
  const [open, setOpen] = useState<string | null>("wegovy-pill");
  return (
    <>
      <ScreenIntro body={supportingCopy} />
      <div className="grid gap-12">
        {medications.map((medication) => {
          const selected = props.selected === medication.id;
          const expanded = open === medication.id;
          const Icon = expanded ? ChevronUp : ChevronDown;
          return (
            <article
              key={medication.id}
              className={cn(
                "overflow-hidden rounded-md border bg-surface-primary",
                selected ? "border-border-brand ring-1 ring-border-brand" : "border-border-disabled",
              )}
            >
              <button
                type="button"
                aria-expanded={expanded}
                onClick={() => setOpen(expanded ? null : medication.id)}
                className="flex w-full items-center gap-12 bg-surface-primary p-16 text-left"
              >
                <MedicationIcon type={medication.type} />
                <span className="min-w-0 flex-1">
                  <strong className="block font-primary text-body-default font-medium text-text-primary">
                    {medication.name}
                  </strong>
                  <span className="font-primary text-body-sm text-text-secondary">
                    {medication.type} · Starts at {money(medication.firstMonth)}
                  </span>
                </span>
                <Icon aria-hidden="true" className="size-16 text-icon-maven" />
              </button>
              {expanded ? (
                <div className="border-t border-border-disabled p-16">
                  <PriceDetails medication={medication} compact />
                  <button
                    type="button"
                    onClick={() => props.onSelect(medication.id)}
                    className={cn(
                      "mt-16 flex w-full items-center justify-center gap-8 rounded-full border px-12 py-8 font-primary text-body-sm font-medium",
                      selected
                        ? "border-border-brand bg-maven-100 text-maven-800"
                        : "border-border-brand bg-surface-primary text-text-link-primary",
                    )}
                  >
                    <SelectIndicator selected={selected} />
                    {selected ? "Selected" : `Choose ${medication.name}`}
                  </button>
                </div>
              ) : null}
            </article>
          );
        })}
        <NotSureCard {...props} />
      </div>
    </>
  );
}
