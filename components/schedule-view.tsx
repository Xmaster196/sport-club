"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Building2, CalendarDays, Clock, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  clubs,
  directions,
  scheduleLessons,
  trainers,
  weekDays,
} from "@/lib/data";

type FilterOption = {
  value: string;
  label: string;
};

export function ScheduleView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [club, setClub] = useState("all");

  const urlSlug = searchParams.get("direction");
  const direction =
    urlSlug && directions.some((item) => item.slug === urlSlug)
      ? urlSlug
      : "all";

  const urlTrainer = searchParams.get("trainer");
  const trainerId =
    urlTrainer && trainers.some((item) => item.id === urlTrainer)
      ? urlTrainer
      : "all";

  const directionOptions: FilterOption[] = useMemo(
    () => [
      { value: "all", label: "Все направления" },
      ...directions.map((item) => ({ value: item.slug, label: item.title })),
    ],
    []
  );

  const clubOptions: FilterOption[] = useMemo(
    () => [
      { value: "all", label: "Все клубы" },
      ...clubs.map((item) => ({ value: item.id, label: item.name })),
    ],
    []
  );

  const trainerOptions: FilterOption[] = useMemo(
    () => [
      { value: "all", label: "Все тренеры" },
      ...trainers.map((item) => ({ value: item.id, label: item.name })),
    ],
    []
  );

  const selectDirection = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("direction");
    } else {
      params.set("direction", value);
    }
    router.replace(`/schedule?${params.toString()}`, { scroll: false });
  };

  const selectClub = (value: string) => {
    setClub(value);
  };

  const selectTrainer = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("trainer");
    } else {
      params.set("trainer", value);
    }
    router.replace(`/schedule?${params.toString()}`, { scroll: false });
  };

  const lessons = useMemo(() => {
    return scheduleLessons
      .filter(
        (lesson) =>
          (direction === "all" || lesson.directionSlug === direction) &&
          (club === "all" || lesson.clubId === club) &&
          (trainerId === "all" || lesson.trainerId === trainerId)
      )
      .sort(
        (a, b) =>
          a.dayIndex - b.dayIndex ||
          a.time.localeCompare(b.time) ||
          a.clubId.localeCompare(b.clubId)
      );
  }, [direction, club, trainerId]);

  const directionTitle = directions.find(
    (item) => item.slug === direction
  )?.title;

  const trainerTitle = trainers.find((item) => item.id === trainerId)?.name;

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-10 space-y-3 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
          <CalendarDays className="h-4 w-4" />
          Расписание
        </span>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Расписание занятий
        </h1>
        <p className="mx-auto max-w-xl text-muted-foreground">
          Выберите направление, клуб или тренера, чтобы найти подходящую
          тренировку по дню недели, времени и залу.
        </p>
      </div>

      <div className="mb-8 space-y-4 rounded-2xl border border-border bg-card/40 p-4 sm:p-6">
        <FilterGroup
          label="Направление"
          options={directionOptions}
          value={direction}
          onChange={selectDirection}
        />
        <FilterGroup
          label="Клуб"
          options={clubOptions}
          value={club}
          onChange={selectClub}
        />
        <FilterGroup
          label="Тренер"
          options={trainerOptions}
          value={trainerId}
          onChange={selectTrainer}
        />
      </div>

      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {lessons.length === 0
            ? "Занятий не найдено"
            : `Найдено занятий: ${lessons.length}`}
          {directionTitle && ` · ${directionTitle}`}
          {trainerTitle && ` · ${trainerTitle}`}
        </p>
      </div>

      {lessons.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-card/40 px-6 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <CalendarDays className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <p className="font-medium">По выбранным фильтрам занятий нет</p>
            <p className="text-sm text-muted-foreground">
              Попробуйте изменить направление, клуб или тренера.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              selectDirection("all");
              setClub("all");
              selectTrainer("all");
            }}
          >
            Сбросить фильтры
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson) => {
            const lessonDirection = directions.find(
              (item) => item.slug === lesson.directionSlug
            );
            const lessonClub = clubs.find((item) => item.id === lesson.clubId);
            return (
              <div
                key={lesson.id}
                className="card-hover flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
              >
                <div className="flex items-center justify-between gap-3">
                  <Badge variant="secondary">{weekDays[lesson.dayIndex]}</Badge>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    <Clock className="h-4 w-4" />
                    {lesson.time}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  {lessonDirection && (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                      <lessonDirection.icon className="h-5 w-5" />
                    </div>
                  )}
                  <div className="min-w-0 space-y-0.5">
                    <h3 className="font-semibold">
                      {lessonDirection?.title ?? "Занятие"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Длительность {lesson.duration}
                    </p>
                  </div>
                </div>

                <dl className="mt-auto space-y-2 text-sm">
                  <div className="flex items-center gap-2.5">
                    <User className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <dt className="sr-only">Тренер</dt>
                    <dd>{lesson.trainer}</dd>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Building2 className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <dt className="sr-only">Зал</dt>
                    <dd>
                      {lesson.gym}
                      {lessonClub ? ` · ${lessonClub.name}` : ""}
                    </dd>
                  </div>
                </dl>

                <Button
                  className="w-full"
                  onClick={() =>
                    toast.success("Заявка отправлена!", {
                      description: `Запись на «${lessonDirection?.title ?? "занятие"}» · ${weekDays[lesson.dayIndex]}, ${lesson.time}.`,
                    })
                  }
                >
                  Записаться
                </Button>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-10 text-center">
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

function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      <span className="w-28 shrink-0 text-sm font-semibold text-muted-foreground">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={active}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
