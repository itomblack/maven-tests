import { useState } from "react";
import { medications, money, supportingCopy } from "../data";
import type { SelectionProps } from "../types";
import {
  Badge,
  DisclosureButton,
  NotSureCard,
  PriceDetails,
  ScreenIntro,
  SelectableCard,
  SelectIndicator,
} from "../components/Shared";

export function CostTimeline(props: SelectionProps) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <>
      <ScreenIntro eyebrow="See how pricing changes" body={supportingCopy} />
      <div className="grid gap-12">
        {medications.map((medication) => {
          const selected = props.selected === medication.id;
          const expanded = open === medication.id;
          const months = [
            ["Month 1", medication.firstMonth],
            ["Month 2", medication.firstMonth],
            ["Month 3+", medication.ongoing],
          ] as const;
          return (
            <SelectableCard
              key={medication.id}
              selected={selected}
              onClick={() => props.onSelect(medication.id)}
              label={`Select ${medication.name}`}
            >
              <span className="flex items-start justify-between gap-12">
                <span>
                  <strong className="block font-primary text-body-default font-medium text-text-primary">
                    {medication.name}
                  </strong>
                  <span className="mt-4 block"><Badge quiet>{medication.type}</Badge></span>
                </span>
                <SelectIndicator selected={selected} />
              </span>
              <span className="relative mt-16 grid grid-cols-3 gap-8">
                <span className="timeline-line absolute left-0 right-0 top-4" />
                {months.map(([label, amount]) => (
                  <span key={label} className="relative grid gap-4">
                    <span className="timeline-point" />
                    <span className="font-primary text-legal text-text-secondary">{label}</span>
                    <strong className="price-nums font-primary text-body-sm font-medium text-text-primary">
                      {money(amount)}{label === "Month 3+" ? "/mo" : ""}
                    </strong>
                  </span>
                ))}
              </span>
              {medication.prepay12 ? (
                <span className="mt-12 block rounded-sm bg-fill-success-secondary p-8 font-primary text-legal text-maven-800">
                  Save {money(medication.ongoing - medication.prepay12)}/month with 12-month prepay
                </span>
              ) : null}
              <span className="mt-12 block">
                <DisclosureButton open={expanded} onClick={() => setOpen(expanded ? null : medication.id)}>
                  {expanded ? "Hide plan options" : "Compare plan options"}
                </DisclosureButton>
              </span>
              {expanded ? (
                <span className="mt-12 block border-t border-border-disabled pt-12">
                  <PriceDetails medication={medication} compact />
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
