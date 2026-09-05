import SiteLayout from '@/app/(site)/layout';
import NotFoundView from '@/app/(site)/not-found';

export const metadata = {
  title: '404 - Page Not Found | MerxoDev Solutions',
  description: 'The page you are looking for does not exist or has been moved.',
};

export default function RootNotFound() {
  return (
    <SiteLayout>
      <NotFoundView />
    </SiteLayout>
  );
}
