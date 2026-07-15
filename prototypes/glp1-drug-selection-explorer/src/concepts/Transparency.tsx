import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { medications, money } from "../data";
import type { Medication, SelectionProps } from "../types";
import {
  Badge,
  BottomSheet,
  MedicationIcon,
  NotSureCard,
  PriceDetails,
  ScreenIntro,
  SelectableCard,
  SelectIndicator,
} from "../components/Shared";

export function Transparency(props: SelectionProps) {
  const [sheetMedication, setSheetMedication] = useState<Medication | null>(null);
  return (
    <>
      <section className="mb-20 rounded-lg bg-maven-900 p-20 text-text-primary-inverse">
        <div className="mb-12 flex size-24 items-center justify-center rounded-full bg-fill-button-secondary-inverse">
          <ShieldCheck aria-hidden="true" className="size-12" />
        </div>
        <p className="m-0 font-primary text-overline uppercase tracking-overline text-maven-100">Pricing clarity</p>
        <h1 className="mb-8 mt-4 font-emphasis text-headline-lg font-normal">
          Know what treatment may cost before you choose.
        </h1>
        <p className="m-0 font-primary text-body-sm text-maven-100">
          We’ll show your first-month cost, typical ongoing cost, and available savings before you make a decision.
        </p>
        <div className="mt-16 flex items-center gap-8 rounded-md bg-fill-button-secondary-inverse p-12 font-primary text-body-sm">
          <ShieldCheck aria-hidden="true" className="size-16 shrink-0" />
          No hidden medication pricing
        </div>
      </section>
      <ScreenIntro eyebrow="Complete pricing at a glance" title="Choose an option to review" compact />
      <div className="grid gap-12">
        {medications.map((medication) => {
          const selected = props.selected === medication.id;
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
                  <span className="flex flex-wrap items-center gap-4">
                    <strong className="font-primary text-body-default font-medium text-text-primary">
                      {medication.name}
                    </strong>
                    <Badge quiet>{medication.type}</Badge>
                  </span>
                  <span className="mt-8 grid grid-cols-2 gap-8 font-primary text-body-sm">
                    <span>
                      <span className="block text-legal text-text-secondary">First month</span>
                      <strong className="price-nums font-medium text-maven-800">{money(medication.firstMonth)}</strong>
                    </span>
                    <span>
                      <span className="block text-legal text-text-secondary">Typical ongoing</span>
                      <strong className="price-nums font-medium text-text-primary">{money(medication.ongoing)}/mo</strong>
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSheetMedication(medication);
                    }}
                    className="mt-12 border-0 bg-transparent p-0 font-primary text-body-sm text-text-link-primary underline underline-offset-4"
                  >
                    See complete pricing
                  </button>
                </span>
                <SelectIndicator selected={selected} />
              </span>
            </SelectableCard>
          );
        })}
        <NotSureCard {...props} />
      </div>
      <BottomSheet
        open={Boolean(sheetMedication)}
        onClose={() => setSheetMedication(null)}
        title={sheetMedication?.name ?? "Pricing"}
      >
        {sheetMedication ? <PriceDetails medication={sheetMedication} /> : null}
      </BottomSheet>
    </>
  );
}
