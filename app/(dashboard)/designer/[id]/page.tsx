import { GetEmailById } from '@/actions/emails';
import EmailDesigner from '@/components/EmailDesigner';
import { emailType } from '@/db/schemas/emails';

async function DesignerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const email: emailType = await GetEmailById(Number(id));

  if (!email) {
    throw new Error('Email not found');
  }
  return <EmailDesigner email={email} />;
}

export default DesignerPage;
