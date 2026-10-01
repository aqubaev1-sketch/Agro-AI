import Link from 'next/link';
import { Sprout, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700 mb-4">
        <Sprout className="h-8 w-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-neutral-900 sm:text-4xl">404</h1>
      <p className="mt-2 text-base text-neutral-600">Страница не найдена</p>
      <p className="mt-1 text-xs text-neutral-400">
        Возможно, страница была перемещена или введен неверный адрес
      </p>
      <Link
        href="/"
        className="mt-6 flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-green-700 transition"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Вернуться на главную</span>
      </Link>
    </div>
  );
}
