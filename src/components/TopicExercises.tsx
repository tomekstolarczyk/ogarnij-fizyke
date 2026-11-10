import ComingSoon from "@/components/ComingSoon";
import type { Topic } from "@/data/topics";

type Props = {
  topic: Topic;
  onShowSolution: (youtubeId: string) => void; // opens that video in the player
};

// "Zadania" panel: CKE exam tasks in the order Tomek recommends solving them
export default function TopicExercises({ topic, onShowSolution }: Props) {
  return (
    <>
      {topic.exercises.length === 0 ? (
        <ComingSoon text="Układam listę zadań maturalnych do tego działu, od najłatwiejszych do najtrudniejszych." />
      ) : (
        <>
          <p className="mb-5 max-w-2xl text-muted">
            Rób po kolei: zadania są ułożone od łatwiejszych do trudniejszych.
            Najpierw spróbuj sam, dopiero potem zajrzyj do rozwiązania.
          </p>
          <ol className="flex flex-col gap-3">
            {topic.exercises.map((exercise, index) => {
              // A const copy: TypeScript then knows it's a string (not undefined)
              // inside the onClick arrow function below
              const solutionId = exercise.solutionVideoId;
              return (
                <li
                  key={exercise.title}
                  className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-border bg-surface px-5 py-4"
                >
                  <span className="font-mono text-sm text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-medium">{exercise.title}</span>
                  <span className="flex gap-4 text-sm font-semibold">
                    <a
                      href={exercise.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-marker-blue hover:underline"
                    >
                      arkusz CKE ↗
                    </a>
                    {solutionId && (
                      <button
                        type="button"
                        onClick={() => onShowSolution(solutionId)}
                        className="text-marker-coral hover:underline"
                      >
                        rozwiązanie na filmie ▶
                      </button>
                    )}
                  </span>
                </li>
              );
            })}
          </ol>
        </>
      )}
    </>
  );
}
