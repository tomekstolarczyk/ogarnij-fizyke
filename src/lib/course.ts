import { topics, type Topic } from "@/data/topics";

// The course is the topics array read top to bottom. The prerequisites form a
// DAG, so a valid course order is a topological order of it: every topic comes
// after all the topics it requires. We check that once, when this file loads
// (so during the build): a bad order or a typo in a slug fails the build
// instead of producing a course that sends you to a topic too early.
// O(V + E): one pass, remembering which slugs we've already seen.
function assertValidCourseOrder(list: Topic[]) {
  const allSlugs = new Set(list.map((t) => t.slug));
  const seen = new Set<string>();
  for (const topic of list) {
    for (const required of topic.requires) {
      if (!allSlugs.has(required)) {
        throw new Error(`${topic.slug} requires unknown topic: ${required}`);
      }
      if (!seen.has(required)) {
        throw new Error(
          `${topic.slug} comes before ${required}, which it requires. Reorder topics.ts`,
        );
      }
    }
    seen.add(topic.slug);
  }
}
assertValidCourseOrder(topics);

// Looks a topic up by slug; undefined if there's no such topic (bad URL)
export function findTopic(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}

// Same, but for slugs written in our own code: a typo throws (like an assert)
export function getTopic(slug: string): Topic {
  const topic = findTopic(slug);
  if (!topic) throw new Error(`Unknown topic slug: ${slug}`);
  return topic;
}

// Module number shown to the user: "01", "02", ...
export function moduleNumber(topic: Topic): string {
  return String(topics.indexOf(topic) + 1).padStart(2, "0");
}

// Neighbours in the course order, for the "previous / next" buttons
export function courseNeighbours(topic: Topic) {
  const index = topics.indexOf(topic);
  return {
    previous: topics[index - 1] as Topic | undefined, // undefined for the first one
    next: topics[index + 1] as Topic | undefined, // undefined for the last one
  };
}

// A topic counts as "available" once there's at least one video for it
export function isRecorded(topic: Topic): boolean {
  return topic.videos.length > 0;
}

export function topicHref(topic: Topic): string {
  return `/dzialy/${topic.slug}`;
}
