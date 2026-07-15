import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import { medications, money, supportingCopy } from "../data";
import type { MedicationType, SelectionProps } from "../types";
import {
  Badge,
  BottomSheet,
  MedicationIcon,
  NotSureCard,
  ScreenIntro,
  SelectableCard,
  SelectIndicator,
  cn,
} from "../components/Shared";

type Period = 1 | 3 | 12;

const moneyRange = (minimum: number, maximum: number) =>
  minimum === maximum ? money(minimum) : `${money(minimum)}–${money(maximum)}`;

function OptionGroup<T extends string | number>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: Array<{ label: string; value: T }>;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="m-0 border-0 p-0">
      <legend className="mb-8 font-primary text-body-sm font-medium text-text-primary">{label}</legend>
      <div className="flex flex-wrap gap-8">
        {options.map((option) => (
          <button
            key={String(option.value)}
            type="button"
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-full border px-12 py-8 font-primary text-body-sm",
              value === option.value
                ? "border-border-brand bg-maven-100 text-maven-800"
                : "border-border-disabled bg-surface-primary text-text-secondary",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function CostCalculator(props: SelectionProps) {
  const [open, setOpen] = useState(false);
  const [payment, setPayment] = useState<"Self-pay" | "Insurance">("Self-pay");
  const [experience, setExperience] = useState<"New" | "Already taking">("New");
  const [preference, setPreference] = useState<MedicationType | "No preference">("No preference");
  const [prepay, setPrepay] = useState<"Yes" | "No">("Yes");
  const [period, setPeriod] = useState<Period>(3);

  const estimate = useMemo(() => {
    const candidates = medications.filter((medication) => preference === "No preference" || medication.type === preference);
    const totals = candidates.map((medication) => {
      if (period === 1) return medication.firstMonth;
      const recurring = prepay === "Yes"
        ? period === 12
          ? medication.prepay12 ?? medication.ongoing
          : medication.prepay3 ?? medication.ongoing
        : medication.ongoing;
      return medication.firstMonth + recurring * (period - 1);
    });
    const savings = candidates.map((medication) => {
      const plan = period === 12 ? medication.prepay12 : medication.prepay3;
      return plan ? Math.max(0, (medication.ongoing - plan) * Math.max(0, period - 1)) : 0;
    });
    return {
      min: Math.min(...totals),
      max: Math.max(...totals),
      maxSavings: Math.max(...savings),
      firstMin: Math.min(...candidates.map((medication) => medication.firstMonth)),
      firstMax: Math.max(...candidates.map((medication) => medication.firstMonth)),
      ongoingMin: Math.min(...candidates.map((medication) => medication.ongoing)),
      ongoingMax: Math.max(...candidates.map((medication) => medication.ongoing)),
    };
  }, [period, preference, prepay]);

  return (
    <>
      <ScreenIntro eyebrow="Personalise the estimate" body={supportingCopy} />
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mb-16 flex w-full items-center gap-12 rounded-md border border-border-brand bg-maven-25 p-16 text-left"
      >
        <span className="flex size-24 items-center justify-center rounded-full bg-maven-100 text-icon-maven">
          <Calculator aria-hidden="true" className="size-12" />
        </span>
        <span className="flex-1">
          <strong className="block font-primary text-body-default font-medium text-text-primary">
            Want a clearer estimate?
          </strong>
          <span className="font-primary text-body-sm text-text-secondary">Answer five quick pricing questions</span>
        </span>
        <span className="font-primary text-body-sm text-text-link-primary">Calculate</span>
      </button>
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
              <span className="flex items-center gap-12">
                <MedicationIcon type={medication.type} />
                <span className="min-w-0 flex-1">
                  <strong className="block font-primary text-body-default font-medium text-text-primary">
                    {medication.name}
                  </strong>
                  <span className="mt-4 flex flex-wrap gap-4"><Badge quiet>{medication.type}</Badge></span>
                  <span className="mt-8 block font-primary text-body-sm text-text-secondary">
                    From {money(medication.firstMonth)} · Tap calculator for full estimate
                  </span>
                </span>
                <SelectIndicator selected={selected} />
              </span>
            </SelectableCard>
          );
        })}
        <NotSureCard {...props} />
      </div>
      <BottomSheet open={open} onClose={() => setOpen(false)} title="Your cost estimate">
        <div className="grid gap-16">
          <OptionGroup
            label="How are you paying?"
            value={payment}
            options={[{ label: "Self-pay", value: "Self-pay" }, { label: "Insurance", value: "Insurance" }]}
            onChange={setPayment}
          />
          <OptionGroup
            label="Where are you starting?"
            value={experience}
            options={[{ label: "New to GLP-1s", value: "New" }, { label: "Already taking one", value: "Already taking" }]}
            onChange={setExperience}
          />
          <OptionGroup
            label="Preferred format"
            value={preference}
            options={[
              { label: "Pill", value: "Pill" },
              { label: "Injection", value: "Injection" },
              { label: "No preference", value: "No preference" },
            ]}
            onChange={setPreference}
          />
          <OptionGroup
            label="Interested in prepay savings?"
            value={prepay}
            options={[{ label: "Yes", value: "Yes" }, { label: "Not now", value: "No" }]}
            onChange={setPrepay}
          />
          <OptionGroup
            label="Estimate period"
            value={period}
            options={[{ label: "1 month", value: 1 }, { label: "3 months", value: 3 }, { label: "12 months", value: 12 }]}
            onChange={setPeriod}
          />
          <section className="grid gap-8 rounded-md bg-maven-25 p-16" aria-live="polite">
            <p className="m-0 font-primary text-overline uppercase tracking-overline text-maven-800">
              Illustrative {period}-month estimate
            </p>
            <strong className="price-nums font-emphasis text-headline-lg font-normal text-text-primary">
              {moneyRange(estimate.min, estimate.max)}
            </strong>
            <div className="grid gap-4 font-primary text-body-sm text-text-secondary">
              <span>First month: {moneyRange(estimate.firstMin, estimate.firstMax)}</span>
              <span>Typical ongoing: {moneyRange(estimate.ongoingMin, estimate.ongoingMax)}/month</span>
              <span>Potential prepay savings: up to {money(estimate.maxSavings)}</span>
              <span>{payment === "Insurance" ? "Your final cost may change after coverage review." : "Estimate assumes self-pay pricing."}</span>
            </div>
          </section>
        </div>
      </BottomSheet>
    </>
  );
}
