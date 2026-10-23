import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { advantages, club, directions, stats } from "@/lib/data";

export default function HomePage() {
  const { hero } = club;

  return (
    <div className="flex flex-col">
      <section className="gradient-hero-sport relative overflow-hidden border-b border-border">
        <div className="pattern-grid-dark pointer-events-none absolute inset-0" />
        <div className="container mx-auto px-4 py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="inline-flex w-fit items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              {hero.badge}
            </span>
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              {club.name} — <span className="text-primary">{hero.title}</span>
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground sm:text-xl">
              {hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#directions"
                className={buttonVariants({ size: "lg" })}
              >
                {hero.primaryCta}
                <ArrowRight />
              </Link>
              <Link
                href="#advantages"
                className={buttonVariants({
                  size: "lg",
                  variant: "outline",
                })}
              >
                {hero.secondaryCta}
              </Link>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 pb-14">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-background/80 px-6 py-6 backdrop-blur-sm"
              >
                <dt className="order-last mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </dt>
                <dd className="text-3xl font-bold text-foreground">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="advantages" className="scroll-mt-20 py-20 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 max-w-2xl space-y-3">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Почему мы
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Преимущества клуба
            </h2>
            <p className="text-muted-foreground">
              Создаём условия, в которых регулярные тренировки становятся
              привычкой, а результат — вопросом времени.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((advantage) => (
              <div
                key={advantage.title}
                className="card-hover rounded-2xl border border-border bg-card p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <advantage.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  {advantage.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {advantage.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="directions"
        className="border-t border-border bg-card/40 py-20 sm:py-24"
      >
        <div className="container mx-auto px-4">
          <div className="mb-12 max-w-2xl space-y-3">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Направления
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Выберите свою тренировку
            </h2>
            <p className="text-muted-foreground">
              Шесть направлений — от силового фитнеса до единоборств и групповых
              классов.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {directions.map((direction) => (
              <Link
                key={direction.title}
                href={`/schedule?direction=${direction.slug}`}
                className="card-hover group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <direction.icon className="h-6 w-6" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">{direction.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {direction.text}
                  </p>
                </div>
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  К расписанию
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center sm:px-12">
            <div className="pattern-grid-dark pointer-events-none absolute inset-0 opacity-40" />
            <div className="relative mx-auto max-w-2xl space-y-6">
              <h2 className="text-3xl font-extrabold tracking-tight text-primary-foreground sm:text-4xl">
                Готовы начать?
              </h2>
              <p className="text-lg text-primary-foreground/90">
                Первая тренировка — знакомство с клубом. Запишитесь на удобное
                занятие уже сегодня.
              </p>
              <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-primary-foreground/90">
                {[
                  "Без скрытых платежей",
                  "Бесплатное первое занятие",
                  "Пауза абонемента",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="#directions"
                className={buttonVariants({
                  size: "lg",
                  variant: "secondary",
                })}
              >
                Выбрать направление
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
