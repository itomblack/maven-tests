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

export function CostFirst(props: SelectionProps) {
  const [open, setOpen] = useState<string | null>("wegovy-pill");
  return (
    <>
      <ScreenIntro eyebrow="Compare by starter cost" body={supportingCopy} />
      <div className="grid gap-12">
        {medications.map((medication) => {
          const selected = props.selected === medication.id;
          const expanded = open === medication.id;
          return (
            <SelectableCard
              key={medication.id}
              selected={selected}
              onClick={() => props.onSelect(medication.id)}
              label={`Select ${medication.name}, ${money(medication.firstMonth)} first month`}
            >
              <span className="flex items-start gap-12">
                <span className="min-w-0 flex-1">
                  <span className="price-nums block font-emphasis text-headline-lg text-maven-800">
                    {money(medication.firstMonth)}
                  </span>
                  <span className="block font-primary text-legal uppercase tracking-overline text-text-secondary">
                    First month
                  </span>
                  <strong className="mt-12 block font-primary text-subheadline-xs font-medium text-text-primary">
                    {medication.name}
                  </strong>
                  <span className="mb-8 mt-4 flex flex-wrap gap-4">
                    <Badge quiet>{medication.type}</Badge>
                    {medication.prepay12 ? <Badge>Save with prepay</Badge> : null}
                  </span>
                  <p className="mb-8 mt-0 font-primary text-body-sm text-text-secondary">
                    Then typically {money(medication.ongoing)}/month
                  </p>
                  <DisclosureButton open={expanded} onClick={() => setOpen(expanded ? null : medication.id)}>
                    View full pricing
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
