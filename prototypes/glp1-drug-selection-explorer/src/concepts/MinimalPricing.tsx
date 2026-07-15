import { useState } from "react";
import { dailyPrice, medications, supportingCopy } from "../data";
import type { Medication, SelectionProps } from "../types";
import {
  BottomSheet,
  MedicationIcon,
  NotSureCard,
  PriceDetails,
  ScreenIntro,
  SelectableCard,
  SelectIndicator,
} from "../components/Shared";

export function MinimalPricing(props: SelectionProps) {
  const [sheetMedication, setSheetMedication] = useState<Medication | null>(null);
  return (
    <>
      <ScreenIntro eyebrow="Simple choices" body={supportingCopy} />
      <div className="grid gap-12">
        {medications.map((medication) => {
          const selected = props.selected === medication.id;
          return (
            <SelectableCard
              key={medication.id}
              selected={selected}
              onClick={() => props.onSelect(medication.id)}
              label={`Select ${medication.name}`}
              className="py-20"
            >
              <span className="flex items-center gap-12">
                <MedicationIcon type={medication.type} />
                <span className="min-w-0 flex-1">
                  <strong className="block font-primary text-subheadline-xs font-medium text-text-primary">
                    {medication.name}
                  </strong>
                  <span className="block font-primary text-body-sm text-text-secondary">
                    From {dailyPrice(medication.firstMonth)}/day · {medication.cadence.toLowerCase()}
                  </span>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSheetMedication(medication);
                    }}
                    className="mt-8 border-0 bg-transparent p-0 font-primary text-body-sm text-text-link-primary underline underline-offset-4"
                  >
                    See pricing
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
