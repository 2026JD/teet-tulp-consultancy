import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const DAGDELEN = ["Ochtend", "Middag", "Avond"] as const;
type Dagdeel = (typeof DAGDELEN)[number];

const WEEKDAGEN_KORT = ["zo", "ma", "di", "wo", "do", "vr", "za"];
const WEEKDAGEN_LANG = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];

function getWeekdays(): Date[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days: Date[] = [];
  let d = new Date(today);
  while (days.length < 5) {
    const dow = d.getDay();
    if (dow >= 1 && dow <= 5) days.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return days;
}

function fmtDay(d: Date) {
  return `${WEEKDAGEN_KORT[d.getDay()]} ${d.getDate()}/${d.getMonth() + 1}`;
}
function fmtLong(d: Date) {
  return `${WEEKDAGEN_LANG[d.getDay()]} ${d.getDate()}/${d.getMonth() + 1}`;
}

export function ContactForm() {
  const dagen = useMemo(getWeekdays, []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [slots, setSlots] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);

  const toggleSlot = (key: string) =>
    setSlots((s) => ({ ...s, [key]: !s[key] }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || name.length > 100) {
      setError("Vul je naam in.");
      return;
    }

    const emailFilled = email.trim().length > 0 && message.trim().length > 0;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    const selectedSlots = Object.entries(slots).filter(([, v]) => v).map(([k]) => k);
    const phoneFilled = phone.trim().length > 0 && selectedSlots.length > 0;

    if (!emailFilled && !phoneFilled) {
      setError(
        "Vul óf je e-mailadres en bericht in, óf je telefoonnummer met minstens één beschikbaar dagdeel."
      );
      return;
    }
    if (email.trim() && !emailValid) {
      setError("Ongeldig e-mailadres.");
      return;
    }
    if (message.length > 1000 || phone.length > 50) {
      setError("Invoer is te lang.");
      return;
    }

    setError(null);

    const lines: string[] = [`Naam: ${name}`];
    if (emailFilled) {
      lines.push(`E-mail: ${email}`, "", `Bericht:`, message);
    }
    if (phoneFilled) {
      lines.push("", `Telefoon: ${phone}`, `Beschikbaarheid:`, ...selectedSlots.map((s) => `- ${s}`));
    }

    const subject = encodeURIComponent(`Contactverzoek van ${name}`);
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:Janna@TeetTulp.nl?subject=${subject}&body=${body}`;
    toast.success("Je e-mailprogramma opent met je bericht.");
  };

  const renderWeek = (days: Date[]) => (
    <div className="space-y-3">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground">
              <th className="py-2 pr-2 font-medium">Dag</th>
              {DAGDELEN.map((d) => (
                <th key={d} className="py-2 px-2 text-center font-medium">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((d) => (
              <tr key={d.toISOString()} className="border-t border-border/60">
                <td className="py-2 pr-2 capitalize">{fmtDay(d)}</td>
                {DAGDELEN.map((dd) => {
                  const key = `${fmtLong(d)} – ${dd}`;
                  const id = `slot-${d.toISOString()}-${dd}`;
                  return (
                    <td key={dd} className="py-2 px-2 text-center">
                      <Checkbox
                        id={id}
                        checked={!!slots[key]}
                        onCheckedChange={() => toggleSlot(key)}
                        aria-label={key}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <h3 className="font-display text-2xl font-semibold text-primary">Neem contact op</h3>

      <div className="space-y-2">
        <Label htmlFor="name">Naam</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
          required
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_1px_1fr] lg:gap-10">
        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-primary/80">Stuur een bericht</h4>
          <div className="space-y-2">
            <Label htmlFor="email">E-mailadres</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={255}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Bericht</Label>
            <Textarea
              id="message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={1000}
            />
          </div>
        </div>

        <div aria-hidden className="hidden bg-border lg:block" />

        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-primary/80">Maak een belafspraak</h4>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefoonnummer</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={50}
            />
          </div>
          <div className="space-y-2">
            <Label>Beschikbaarheid</Label>
            <div className="rounded-lg border border-border/60 p-4">
              {renderWeek(dagen)}
            </div>
          </div>
        </div>
      </div>

      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Verstuur
      </Button>
    </form>
  );
}
