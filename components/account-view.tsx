"use client";

import Link from "next/link";
import {
  useSyncExternalStore,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { z } from "zod";
import {
  ArrowLeft,
  Building2,
  Cake,
  CalendarDays,
  CalendarX,
  Check,
  Clock,
  KeyRound,
  LogIn,
  LogOut,
  Phone,
  ShieldCheck,
  Ticket,
  User,
  UserPlus,
  Wallet,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  clubs,
  demoBookingLessonIds,
  demoProfile,
  demoSubscription,
  directions,
  scheduleLessons,
  tariffs,
  weekDays,
  type ScheduleLesson,
  type Tariff,
} from "@/lib/data";

const STORAGE_KEY = "impulse-demo-user";
const SESSION_EVENT = "impulse-demo-session";

type StoredUser = {
  name: string;
  email: string;
  bookingIds: string[];
};

type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
};

const loginSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(6, "Пароль: минимум 6 символов"),
});

const registerSchema = z.object({
  name: z.string().trim().min(2, "Введите имя"),
  email: z.string().email("Введите корректный email"),
  password: z.string().min(6, "Пароль: минимум 6 символов"),
});

let cachedSessionRaw: string | null = null;

function readSessionRaw() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(STORAGE_KEY);
}

function subscribeSession(onChange: () => void) {
  window.addEventListener(SESSION_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(SESSION_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSessionSnapshot() {
  const raw = readSessionRaw();
  if (raw !== cachedSessionRaw) cachedSessionRaw = raw;
  return cachedSessionRaw;
}

function getSessionServerSnapshot() {
  return null;
}

function writeSession(user: StoredUser | null) {
  if (typeof window === "undefined") return;
  if (user) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    cachedSessionRaw = JSON.stringify(user);
  } else {
    window.localStorage.removeItem(STORAGE_KEY);
    cachedSessionRaw = null;
  }
  window.dispatchEvent(new Event(SESSION_EVENT));
}

function parseFieldErrors(
  error: z.ZodError,
  fields: Array<keyof FieldErrors>
): FieldErrors {
  const flat = error.flatten().fieldErrors as Record<
    string,
    string[] | undefined
  >;
  const result: FieldErrors = {};
  for (const field of fields) {
    const message = flat[field]?.[0];
    if (message) result[field] = message;
  }
  return result;
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function displayNameFromEmail(email: string) {
  const localPart = email.split("@")[0] || "Гость";
  return localPart.charAt(0).toUpperCase() + localPart.slice(1);
}

export function AccountView() {
  const sessionRaw = useSyncExternalStore(
    subscribeSession,
    getSessionSnapshot,
    getSessionServerSnapshot
  );

  let user: StoredUser | null = null;
  if (sessionRaw) {
    try {
      user = normalizeUser(JSON.parse(sessionRaw));
    } catch {
      user = null;
    }
  }

  const handleSignIn = (next: StoredUser) => {
    writeSession(next);
    toast.success("Добро пожаловать в «Импульс»!", {
      description: `Вы вошли как ${next.name}.`,
    });
  };

  const handleSignOut = () => {
    writeSession(null);
    toast.info("Вы вышли из аккаунта");
  };

  const handleCancelBooking = (lessonId: string) => {
    if (!user) return;
    writeSession({
      ...user,
      bookingIds: user.bookingIds.filter((id) => id !== lessonId),
    });
    const lesson = scheduleLessons.find((item) => item.id === lessonId);
    const title =
      directions.find((item) => item.slug === lesson?.directionSlug)?.title ??
      "занятие";
    toast.success("Запись отменена", {
      description: `Вы отменили запись на «${title}».`,
    });
  };

  return (
    <div className="mx-auto max-w-4xl">
      {user ? (
        <Cabinet
          user={user}
          onSignOut={handleSignOut}
          onCancelBooking={handleCancelBooking}
        />
      ) : (
        <AuthGate onSignIn={handleSignIn} />
      )}
    </div>
  );
}

function normalizeUser(value: unknown): StoredUser | null {
  if (typeof value !== "object" || value === null) return null;
  const candidate = value as Partial<StoredUser>;
  if (typeof candidate.name !== "string") return null;
  if (typeof candidate.email !== "string") return null;
  const bookingIds = Array.isArray(candidate.bookingIds)
    ? candidate.bookingIds.filter(
        (id): id is string =>
          typeof id === "string" &&
          scheduleLessons.some((lesson) => lesson.id === id)
      )
    : [];
  return {
    name: candidate.name,
    email: candidate.email,
    bookingIds: bookingIds.length > 0 ? bookingIds : [...demoBookingLessonIds],
  };
}

type AuthMode = "login" | "register";

function AuthGate({ onSignIn }: { onSignIn: (user: StoredUser) => void }) {
  const [mode, setMode] = useState<AuthMode>("login");

  return (
    <div className="mx-auto max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="space-y-3 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
          <KeyRound className="h-4 w-4" />
          Личный кабинет
        </span>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Вход и регистрация
        </h1>
        <p className="mx-auto max-w-sm text-muted-foreground">
          Демонстрационный режим: вход имитируется на стороне браузера, данные
          никуда не отправляются.
        </p>
      </header>

      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="mb-6 grid grid-cols-2 gap-1 rounded-xl bg-muted p-1">
          <TabButton active={mode === "login"} onClick={() => setMode("login")}>
            <LogIn className="h-4 w-4" />
            Вход
          </TabButton>
          <TabButton
            active={mode === "register"}
            onClick={() => setMode("register")}
          >
            <UserPlus className="h-4 w-4" />
            Регистрация
          </TabButton>
        </div>

        {mode === "login" ? (
          <LoginForm onSignIn={onSignIn} />
        ) : (
          <RegisterForm onSignIn={onSignIn} />
        )}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Для демо-входа подойдёт любой email и пароль от 6 символов.
      </p>

      <div className="text-center">
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

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

function LoginForm({ onSignIn }: { onSignIn: (user: StoredUser) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      setErrors(parseFieldErrors(result.error, ["email", "password"]));
      return;
    }
    setErrors({});
    onSignIn({
      name: displayNameFromEmail(result.data.email),
      email: result.data.email,
      bookingIds: [...demoBookingLessonIds],
    });
  };

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <Field label="Email" htmlFor="login-email" error={errors.email}>
        <Input
          id="login-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={Boolean(errors.email)}
          className={cn(errors.email && "border-destructive")}
        />
      </Field>
      <Field label="Пароль" htmlFor="login-password" error={errors.password}>
        <Input
          id="login-password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          aria-invalid={Boolean(errors.password)}
          className={cn(errors.password && "border-destructive")}
        />
      </Field>
      <Button type="submit" className="w-full">
        <LogIn />
        Войти в аккаунт
      </Button>
    </form>
  );
}

function RegisterForm({ onSignIn }: { onSignIn: (user: StoredUser) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = registerSchema.safeParse({ name, email, password });
    if (!result.success) {
      setErrors(parseFieldErrors(result.error, ["name", "email", "password"]));
      return;
    }
    setErrors({});
    onSignIn({
      name: result.data.name,
      email: result.data.email,
      bookingIds: [...demoBookingLessonIds],
    });
  };

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <Field label="Имя" htmlFor="register-name" error={errors.name}>
        <Input
          id="register-name"
          type="text"
          autoComplete="name"
          placeholder="Иван Петров"
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-invalid={Boolean(errors.name)}
          className={cn(errors.name && "border-destructive")}
        />
      </Field>
      <Field label="Email" htmlFor="register-email" error={errors.email}>
        <Input
          id="register-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={Boolean(errors.email)}
          className={cn(errors.email && "border-destructive")}
        />
      </Field>
      <Field label="Пароль" htmlFor="register-password" error={errors.password}>
        <Input
          id="register-password"
          type="password"
          autoComplete="new-password"
          placeholder="Минимум 6 символов"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          aria-invalid={Boolean(errors.password)}
          className={cn(errors.password && "border-destructive")}
        />
      </Field>
      <Button type="submit" className="w-full">
        <UserPlus />
        Создать аккаунт
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function Cabinet({
  user,
  onSignOut,
  onCancelBooking,
}: {
  user: StoredUser;
  onSignOut: () => void;
  onCancelBooking: (lessonId: string) => void;
}) {
  const tariff = tariffs.find((item) => item.id === demoSubscription.tariffId);
  const remainingDays = daysRemaining(demoSubscription.expiresOn);
  const progress = subscriptionProgress(
    demoSubscription.activatedOn,
    demoSubscription.expiresOn
  );
  const lessons = user.bookingIds
    .map((id) => scheduleLessons.find((lesson) => lesson.id === id))
    .filter((lesson): lesson is ScheduleLesson => Boolean(lesson))
    .sort((a, b) => a.dayIndex - b.dayIndex || a.time.localeCompare(b.time));

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="space-y-3 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
          <ShieldCheck className="h-4 w-4" />
          Личный кабинет
        </span>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Привет, {user.name}!
        </h1>
        <p className="mx-auto max-w-md text-muted-foreground">
          Профиль, абонемент и записи на тренировки — всё в одном месте.
        </p>
      </header>

      <ProfileCard user={user} onSignOut={onSignOut} />

      <SubscriptionCard
        tariff={tariff}
        activatedOn={demoSubscription.activatedOn}
        expiresOn={demoSubscription.expiresOn}
        remainingDays={remainingDays}
        progress={progress}
      />

      <BookingsSection lessons={lessons} onCancelBooking={onCancelBooking} />

      <div className="text-center">
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

function ProfileCard({
  user,
  onSignOut,
}: {
  user: StoredUser;
  onSignOut: () => void;
}) {
  const details = [
    { icon: Phone, label: "Телефон", value: demoProfile.phone },
    {
      icon: Cake,
      label: "Дата рождения",
      value: formatDate(demoProfile.birthDate),
    },
    {
      icon: CalendarDays,
      label: "В клубе с",
      value: formatDate(demoProfile.memberSince),
    },
  ];

  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xl font-bold text-primary">
          {getInitials(user.name)}
        </div>
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <span className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              <ShieldCheck className="h-3 w-3" />
              Демо-аккаунт
            </span>
          </div>
          <p className="truncate text-sm text-muted-foreground">{user.email}</p>
        </div>
        <Button variant="outline" onClick={onSignOut}>
          <LogOut />
          Выйти
        </Button>
      </div>

      <dl className="mt-6 grid gap-4 sm:grid-cols-3">
        {details.map((item) => (
          <div
            key={item.label}
            className="flex items-start gap-3 rounded-xl bg-muted/50 p-4"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <item.icon className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <dt className="text-xs font-medium text-muted-foreground">
                {item.label}
              </dt>
              <dd className="mt-0.5 truncate text-sm font-medium">
                {item.value}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}

function SubscriptionCard({
  tariff,
  activatedOn,
  expiresOn,
  remainingDays,
  progress,
}: {
  tariff: Tariff | undefined;
  activatedOn: string;
  expiresOn: string;
  remainingDays: number;
  progress: number;
}) {
  const active = remainingDays >= 0;

  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Wallet className="h-5 w-5 text-primary" />
          Мой абонемент
        </h2>
        {active ? (
          <Badge>
            <Clock />
            Осталось {Math.max(remainingDays, 0)} дн.
          </Badge>
        ) : (
          <Badge variant="destructive">Истёк</Badge>
        )}
      </div>

      {tariff ? (
        <div className="mt-5 space-y-5">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-0.5">
              <h3 className="text-xl font-bold">{tariff.name}</h3>
              <p className="text-sm text-muted-foreground">
                {tariff.description}
              </p>
            </div>
            <p className="text-2xl font-extrabold tracking-tight text-primary">
              {priceFormatter.format(tariff.price)} ₽{" "}
              <span className="text-sm font-medium text-muted-foreground">
                {tariff.periodLabel}
              </span>
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{formatDate(activatedOn)}</span>
              <span>{formatDate(expiresOn)}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <ul className="grid gap-2 sm:grid-cols-2">
            {tariff.features.slice(0, 4).map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div>
            <Link
              href="/pricing"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              <Wallet />
              Тарифы и продление
            </Link>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">
          Абонемент не найден. Посмотрите доступные тарифы.
        </p>
      )}
    </section>
  );
}

function BookingsSection({
  lessons,
  onCancelBooking,
}: {
  lessons: ScheduleLesson[];
  onCancelBooking: (lessonId: string) => void;
}) {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Ticket className="h-5 w-5 text-primary" />
          Мои записи
        </h2>
        <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          {lessons.length}{" "}
          {pluralize(lessons.length, ["занятие", "занятия", "занятий"])}
        </span>
      </div>

      {lessons.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card/40 px-6 py-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <CalendarDays className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <p className="font-medium">У вас пока нет записей</p>
            <p className="text-sm text-muted-foreground">
              Выберите направление, клуб и удобное время на странице расписания.
            </p>
          </div>
          <Link href="/schedule" className={buttonVariants({ size: "sm" })}>
            <CalendarDays />
            Перейти к расписанию
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {lessons.map((lesson) => {
            const direction = directions.find(
              (item) => item.slug === lesson.directionSlug
            );
            const club = clubs.find((item) => item.id === lesson.clubId);
            return (
              <article
                key={lesson.id}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <Badge variant="secondary">{weekDays[lesson.dayIndex]}</Badge>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    <Clock className="h-4 w-4" />
                    {lesson.time}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  {direction && (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                      <direction.icon className="h-5 w-5" />
                    </div>
                  )}
                  <div className="min-w-0 space-y-0.5">
                    <h3 className="font-semibold">
                      {direction?.title ?? "Занятие"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {lesson.duration} · {lesson.gym}
                    </p>
                  </div>
                </div>

                <dl className="space-y-1.5 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 shrink-0" />
                    <dd>{lesson.trainer}</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 shrink-0" />
                    <dd>{club?.name ?? "Клуб «Импульс»"}</dd>
                  </div>
                </dl>

                <Button
                  variant="outline"
                  size="sm"
                  className="mt-auto w-full text-destructive hover:border-destructive/40 hover:text-destructive"
                  onClick={() => onCancelBooking(lesson.id)}
                >
                  <CalendarX />
                  Отменить запись
                </Button>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

const priceFormatter = new Intl.NumberFormat("ru-RU");

function pluralize(count: number, forms: [string, string, string]) {
  const n = Math.abs(count) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) return forms[2];
  if (n1 > 1 && n1 < 5) return forms[1];
  if (n1 === 1) return forms[0];
  return forms[2];
}

function formatDate(dateStr: string) {
  const date = new Date(`${dateStr}T00:00:00Z`);
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function daysRemaining(expiresOn: string) {
  const end = new Date(`${expiresOn}T00:00:00Z`).getTime();
  const now = new Date();
  const today = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  );
  return Math.round((end - today) / 86400000);
}

function subscriptionProgress(activatedOn: string, expiresOn: string) {
  const start = new Date(`${activatedOn}T00:00:00Z`).getTime();
  const end = new Date(`${expiresOn}T00:00:00Z`).getTime();
  const now = new Date();
  const today = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  );
  const total = end - start;
  if (total <= 0) return 0;
  const elapsed = today - start;
  return Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));
}
