import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  Clock,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { clubs, type Club } from "@/lib/data";

export default function ClubsPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-20">
      <div className="mx-auto mb-12 max-w-2xl space-y-3 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
          <Building2 className="h-4 w-4" />
          Клубы
        </span>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Наши клубы
        </h1>
        <p className="text-muted-foreground">
          Три зала в разных районах города — выберите удобный адрес, чтобы
          тренироваться рядом с домом или работой.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {clubs.map((club) => (
          <ClubCard key={club.id} club={club} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/"
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          <ArrowLeft />
          На главную
        </Link>
      </div>
    </div>
  );
}

function ClubCard({ club }: { club: Club }) {
  return (
    <article className="card-hover flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <Building2 className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <h2 className="text-lg font-semibold">{club.name}</h2>
          <p className="text-sm text-muted-foreground">Сеть «Импульс»</p>
        </div>
      </div>

      <dl className="space-y-3 text-sm">
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <dd>{club.address}</dd>
        </div>
        <div className="flex items-start gap-3">
          <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <dd>
            <a
              href={`tel:${club.phone.replace(/[^\d+]/g, "")}`}
              className="transition-colors hover:text-primary"
            >
              {club.phone}
            </a>
          </dd>
        </div>
        <div className="flex items-start gap-3">
          <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <dd>
            <a
              href={`mailto:${club.email}`}
              className="transition-colors hover:text-primary"
            >
              {club.email}
            </a>
          </dd>
        </div>
      </dl>

      <div className="rounded-xl border border-border bg-background/60 p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <Clock className="h-4 w-4 text-primary" />
          Часы работы
        </div>
        <dl className="space-y-1.5 text-sm">
          <div className="flex items-center justify-between gap-3">
            <dt className="text-muted-foreground">Будни</dt>
            <dd className="font-medium">{club.workHours.weekdays}</dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-muted-foreground">Выходные</dt>
            <dd className="font-medium">{club.workHours.weekends}</dd>
          </div>
        </dl>
      </div>

      <Link
        href="/schedule"
        className={buttonVariants({ size: "sm", className: "mt-auto" })}
      >
        <CalendarDays />
        Расписание занятий
      </Link>
    </article>
  );
}
