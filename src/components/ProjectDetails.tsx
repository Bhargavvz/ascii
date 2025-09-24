'use client';

import React from 'react';
import { Project } from '@/types/portfolio';
import { createBorder } from '@/utils/ascii';

interface ProjectDetailsProps {
  project: Project;
  theme: string;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, theme }) => {
  const formatProjectDetails = (project: Project): string => {
    const details = `
PROJECT: ${project.name}
${'═'.repeat(60)}

DESCRIPTION:
${project.description}

TECHNOLOGIES:
${project.technologies.map(tech => `• ${tech}`).join('\n')}

KEY FEATURES:
${project.features.map(feature => `• ${feature}`).join('\n')}

LINKS:
${project.githubUrl ? `GitHub: ${project.githubUrl}` : ''}
${project.liveUrl ? `Live Demo: ${project.liveUrl}` : ''}

ARCHITECTURE:
${project.architecture || 'No architecture diagram available'}
    `.trim();

    return createBorder(details, '═');
  };

  return (
    <div className="font-mono whitespace-pre-wrap text-xs sm:text-sm">
      {formatProjectDetails(project)}
    </div>
  );
};

export default ProjectDetails;