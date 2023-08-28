import { CreateOfferForm } from '@/app/offers/components/CreateOfferForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';

const NewOffer = () => (
  <Card className='mx-auto max-w-4xl'>
    <CardHeader>
      <CardTitle>Create a new offer</CardTitle>
      <CardDescription>
        As a company looking to attract top talent, this is your canvas to craft
        compelling job offers. Showcase your company's culture, the role's
        responsibilities, and the benefits of joining your team. Get ready to
        inspire and engage potential candidates - start creating your impactful
        job offer now.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <CreateOfferForm />
    </CardContent>
  </Card>
);

export default NewOffer;
