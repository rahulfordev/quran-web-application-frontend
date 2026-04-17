import { AlertTriangle } from "lucide-react";

import { EmptyState } from "./EmptyState";

interface ErrorStateProps {
  title?: string;
  description?: string;
}

export function ErrorState({
  title = "Something interrupted the reading flow",
  description = "The backend did not return the expected response. Please try again in a moment."
}: ErrorStateProps) {
  return <EmptyState title={title} description={description} icon={<AlertTriangle className="h-6 w-6" />} />;
}
