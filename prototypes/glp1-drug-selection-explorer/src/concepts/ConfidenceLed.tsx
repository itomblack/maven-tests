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

export function ConfidenceLed(props: SelectionProps) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <>
      <ScreenIntro
        eyebrow="Choose with confidence"
        title="Which option feels right for your routine?"
        body={supportingCopy}
      />
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
              <span className="flex items-start gap-12">
                <MedicationIcon type={medication.type} />
                <span className="min-w-0 flex-1">
                  <span className="mb-8 flex flex-wrap gap-4">
                    <Badge>{medication.badge}</Badge>
                    <Badge quiet>{medication.type}</Badge>
                  </span>
                  <strong className="block font-primary text-subheadline-xs font-medium text-text-primary">
                    {medication.name}
                  </strong>
                  <p className="mb-8 mt-4 font-primary text-body-sm text-text-secondary">{medication.why}</p>
                  <p className="mb-8 mt-0 font-primary text-body-sm text-text-primary">
                    <strong className="price-nums font-medium">{money(medication.firstMonth)}</strong> first month · {money(medication.ongoing)}/mo ongoing
                  </p>
                  <DisclosureButton open={expanded} onClick={() => setOpen(expanded ? null : medication.id)}>
                    {expanded ? "Hide complete pricing" : "See complete pricing"}
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
