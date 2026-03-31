import { Navigate, useParams } from "react-router-dom";

/** One-off redirects for legacy / bookmarked URLs (kebab-case is canonical). */
export function NavigateReplace({ to }) {
  return <Navigate to={to} replace />;
}

/** Old detail URL used PascalCase param name. */
export function LegacyChallengeDetailRedirect() {
  const { ChallengesId } = useParams();
  return <Navigate to={`/challenges/${ChallengesId}`} replace />;
}
