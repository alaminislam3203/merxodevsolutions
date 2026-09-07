import Image from 'next/image';
import Link from 'next/link';
import { getAllProjects } from '@/app/lib/projects';
import ProjectsGrid from './ProjectsGrid';

export const metadata = {
  title: 'Our Projects — MerxoDev Solutions',
  description:
    'Explore the full portfolio of web and mobile projects delivered by MerxoDev Solutions — from SaaS platforms to e-commerce storefronts.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function OurProjectsPage() {
  const projects = await getAllProjects();
  return <ProjectsGrid projects={projects} />;
}
