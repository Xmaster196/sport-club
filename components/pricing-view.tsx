"use client";

import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock,
  Star,
  Wallet,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { tariffs, type Tariff } from "@/lib/data";

const priceFormatter = new Intl.NumberFormat("ru-RU");

export function PricingView() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-12 space-y-3 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
          <Wallet className="h-4 w-4" />
          Цены
        </span>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Абонементы клуба «Импульс»
        </h1>
        <p className="mx-auto max-w-xl text-muted-foreground">
          Выберите подходящий формат: разовый визит, месячный абонемент или
          годовой доступ во все клубы сети.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {tariffs.map((tariff) => (
          <TariffCard key={tariff.id} tariff={tariff} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/schedule"
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          <CalendarDays />
          Посмотреть расписание
        </Link>
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/"
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          <ArrowLeft />
          На главную
        </Link>
      </div>
    </div>
  );
}

function TariffCard({ tariff }: { tariff: Tariff }) {
  const order = () =>
    toast.success("Заявка на оформление отправлена!", {
      description: `Абонемент «${tariff.name}» · ${priceFormatter.format(tariff.price)} ₽ ${tariff.periodLabel}.`,
    });

  return (
    <article
      className={[
        "card-hover flex flex-col gap-5 rounded-2xl border bg-card p-6 transition-colors",
        tariff.popular
          ? "border-primary/60 shadow-[0_0_0_1px] shadow-primary/30"
          : "border-border hover:border-primary/40",
      ].join(" ")}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-semibold">{tariff.name}</h2>
          {tariff.popular && (
            <Badge>
              <Star />
              Хит
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{tariff.description}</p>
      </div>

      <div className="flex items-end gap-2">
        <span className="text-4xl font-extrabold tracking-tight">
          {priceFormatter.format(tariff.price)} ₽
        </span>
        <span className="pb-1 text-sm text-muted-foreground">
          {tariff.periodLabel}
        </span>
      </div>

      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground">
        <Clock className="h-3.5 w-3.5 text-primary" />
        Срок действия: {tariff.duration}
      </div>

      <ul className="mt-auto space-y-2.5">
        {tariff.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-2 space-y-2">
        <Button className="w-full" onClick={order}>
          Оформить абонемент
        </Button>
        <Link
          href="/schedule"
          className={buttonVariants({
            variant: "outline",
            size: "sm",
            className: "w-full",
          })}
        >
          Записаться на тренировку
        </Link>
      </div>
    </article>
  );
}
