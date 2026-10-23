import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Medal, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { directions, trainers, type Trainer } from "@/lib/data";

export default function TrainersPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-20">
      <div className="mx-auto mb-12 max-w-2xl space-y-3 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
          <Users className="h-4 w-4" />
          Тренеры
        </span>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Наша команда тренеров
        </h1>
        <p className="text-muted-foreground">
          Опытные специалисты по фитнесу, единоборствам, кроссфиту и групповым
          программам помогут вам достичь целей.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {trainers.map((trainer) => (
          <TrainerCard key={trainer.id} trainer={trainer} />
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

function TrainerCard({ trainer }: { trainer: Trainer }) {
  const trainerDirections = directions.filter((item) =>
    trainer.directionSlugs.includes(item.slug)
  );

  return (
    <article className="card-hover flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/40">
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={trainer.photo}
          alt={`Фото тренера ${trainer.name}`}
          width={400}
          height={500}
          unoptimized
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">{trainer.name}</h2>
          <p className="text-sm font-medium text-primary">
            {trainer.specialization}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">{trainer.description}</p>
        <p className="inline-flex items-center gap-2 text-sm font-medium">
          <Medal className="h-4 w-4 text-primary" />
          {trainer.experience}
        </p>
        {trainerDirections.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {trainerDirections.map((direction) => (
              <Badge
                key={direction.slug}
                variant="outline"
                render={<Link href={`/schedule?direction=${direction.slug}`} />}
              >
                {direction.title}
              </Badge>
            ))}
          </div>
        )}
        <Link
          href={`/schedule?trainer=${trainer.id}`}
          className={buttonVariants({ size: "sm", className: "mt-auto" })}
        >
          <CalendarDays />
          Расписание тренера
        </Link>
      </div>
    </article>
  );
}
