import { notFound } from 'next/navigation';
import ProjectDetail from '@/views/ProjectDetail';
import { pageMetadata } from '@/lib/metadata';
const projectIds = ['rhamm-breast-cancer', 'fitness'];
export function generateStaticParams() { return projectIds.map(projectId => ({ projectId })); }
export async function generateMetadata({ params }) {
 const { projectId } = await params;
 return pageMetadata({ title: projectId === 'fitness' ? 'Fitness' : 'RHAMM-Deficient Breast Cancer Lung Metastases',
 description: projectId === 'fitness' ? 'Evidence-based fitness routines and training' : 'Honours thesis: PacBio HiFi long-read sequencing shows that loss of the RHAMM protein reduces genomic heterogeneity and drives clonal dominance in breast cancer lung metastases.',
 path: `/projects/${projectId}`, type: 'article' });
}
export default async function Page({ params }) {
 const { projectId } = await params;
 if (!projectIds.includes(projectId)) notFound();
 return <ProjectDetail projectId={projectId} />;
}
