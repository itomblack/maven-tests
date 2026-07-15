import { useState } from "react";
import { ArrowLeft, Pill, Syringe } from "lucide-react";
import { medications, money, supportingCopy } from "../data";
import type { MedicationType, SelectionProps } from "../types";
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

const formatCopy = {
  Pill: { price: 149, routine: "Daily routine", Icon: Pill },
  Injection: { price: 199, routine: "Usually weekly", Icon: Syringe },
};

export function FormatFirst(props: SelectionProps) {
  const [format, setFormat] = useState<MedicationType | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  if (!format) {
    return (
      <>
        <ScreenIntro
          eyebrow="First, choose a format"
          title="Would you prefer a pill or injection?"
          body={supportingCopy}
        />
        <div className="grid gap-12">
          {(Object.keys(formatCopy) as MedicationType[]).map((type) => {
            const { price, routine, Icon } = formatCopy[type];
            return (
              <button
                key={type}
                type="button"
                onClick={() => setFormat(type)}
                className="flex w-full items-center gap-16 rounded-md border border-border-disabled bg-surface-primary p-20 text-left transition hover:border-border-brand"
              >
                <span className="flex size-24 items-center justify-center rounded-full bg-maven-100 text-icon-maven">
                  <Icon aria-hidden="true" className="size-12" />
                </span>
                <span className="flex-1">
                  <strong className="block font-emphasis text-subheadline-lg font-normal text-text-primary">{type}</strong>
                  <span className="block font-primary text-body-sm text-text-secondary">{routine}</span>
                </span>
                <span className="text-right font-primary text-body-sm text-text-secondary">
                  From <strong className="price-nums block text-subheadline-xs text-maven-800">{money(price)}</strong>
                </span>
              </button>
            );
          })}
          <NotSureCard {...props} />
        </div>
      </>
    );
  }

  const filtered = medications.filter((medication) => medication.type === format);
  return (
    <>
      <button
        type="button"
        onClick={() => {
          setFormat(null);
          setOpen(null);
        }}
        className="mb-16 flex items-center gap-4 border-0 bg-transparent p-0 font-primary text-body-sm text-text-link-primary"
      >
        <ArrowLeft aria-hidden="true" className="size-12" /> Change format
      </button>
      <ScreenIntro
        eyebrow={`${format} options`}
        title={`Compare ${format.toLowerCase()} medications`}
        body={`${filtered.length} options match your format preference.`}
        compact
      />
      <div className="grid gap-12">
        {filtered.map((medication) => {
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
                  <strong className="block font-primary text-body-default font-medium text-text-primary">
                    {medication.name}
                  </strong>
                  <span className="mb-8 mt-4 flex gap-4"><Badge>{medication.badge}</Badge></span>
                  <span className="block font-primary text-body-sm text-text-secondary">
                    {money(medication.firstMonth)} first month
                  </span>
                  <DisclosureButton open={expanded} onClick={() => setOpen(expanded ? null : medication.id)}>
                    Full pricing
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
