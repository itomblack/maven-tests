import { useState } from "react";
import { medications, money, supportingCopy } from "../data";
import type { SelectionProps } from "../types";
import {
  Badge,
  DisclosureButton,
  MedicationIcon,
  NotSureCard,
  PriceDetails,
  ScreenIntro,
  SelectableCard,
  SelectIndicator,
} from "../components/Shared";

export function CurrentDesign(props: SelectionProps) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <>
      <ScreenIntro title="Do you have a GLP-1 in mind?" body={supportingCopy} />
      <div className="grid gap-12">
        {medications.map((medication) => {
          const selected = props.selected === medication.id;
          const expanded = open === medication.id;
          return (
            <SelectableCard
              key={medication.id}
              selected={selected}
              onClick={() => props.onSelect(medication.id)}
              label={`Select ${medication.name}`}
            >
              <span className="flex items-center gap-12">
                <MedicationIcon type={medication.type} />
                <span className="min-w-0 flex-1">
                  <span className="mb-4 flex flex-wrap items-center gap-4">
                    <strong className="font-primary text-body-default font-medium text-text-primary">
                      {medication.name}
                    </strong>
                    <Badge quiet>{medication.type}</Badge>
                  </span>
                  <span className="block font-primary text-body-sm text-text-secondary">
                    Starts at <strong className="price-nums text-text-primary">{money(medication.firstMonth)}</strong>
                  </span>
                  <DisclosureButton open={expanded} onClick={() => setOpen(expanded ? null : medication.id)}>
                    View pricing
                  </DisclosureButton>
                </span>
                <SelectIndicator selected={selected} />
              </span>
              {expanded ? (
                <span className="mt-16 block border-t border-border-disabled pt-16">
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
