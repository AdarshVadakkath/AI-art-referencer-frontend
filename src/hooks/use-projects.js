import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import { createProject, generateProject } from "@/lib/api";

export function useCreateProject() {
  const { getToken } = useAuth();
  return useMutation({
    mutationFn: async (variables) => {
      const token = await getToken();
      return createProject(variables, token);
    },
  });
}

export function useGenerateProject() {
  const { getToken } = useAuth();
  return useMutation({
    mutationFn: async (projectId) => {
      const token = await getToken();
      return generateProject(projectId, token);
    },
  });
}
