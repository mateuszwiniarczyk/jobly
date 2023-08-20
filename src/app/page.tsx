import Link from 'next/link';

import { Badge } from '@/components/ui/Badge';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
} from '@/components/ui/Command';
import { Separator } from '@/components/ui/Separator';
import AirbnbIcon from '~/icons/airbnb.svg';
import FacebookIcon from '~/icons/facebook.svg';
import GoogleIcon from '~/icons/google.svg';

const suggestedJobSearches = [
  'Project manager',
  'Software engineer',
  'Product manager',
  'Data analyst',
  'Data scientist',
  'Graphic designer',
  'Sales manager',
  'QA Engineer',
];

const recommendedForYou = [
  {
    id: 1,
    icon: GoogleIcon,
    name: 'Software Engineer',
    company: 'Google',
    location: 'Mountain View, CA',
    hourlyRate: '$100',
  },
  {
    id: 2,
    icon: FacebookIcon,
    name: 'Product Manager',
    company: 'Facebook',
    location: 'Menlo Park, CA',
    hourlyRate: '$90',
  },
  {
    id: 3,
    icon: AirbnbIcon,
    name: 'Virtual Scheduler',
    company: 'Carenet Health',
    location: 'Remote',
    hourlyRate: '$80',
  },
];

const Home = () => (
  <div className='my-10'>
    <div className='flex flex-col items-center gap-2.5 py-5 text-center'>
      <h1 className='text-2xl font-bold md:text-4xl'>
        Search for your next job
      </h1>
      <p className='max-w-md text-sm text-muted-foreground md:text-base'>
        When you&apos;re searching for a job, there are a few things you can do
        to get the most out of your search
      </p>
    </div>
    <Command className='mx-auto mt-12 w-full max-w-4xl rounded-lg drop-shadow'>
      <CommandInput
        placeholder='Job title, keyword or company'
        className='h-16'
      />

      <CommandList>
        <CommandEmpty className='hidden'>No results found.</CommandEmpty>
      </CommandList>
    </Command>

    <div className='mt-16'>
      <h2 className='text-center text-muted-foreground'>
        Suggested job searches
      </h2>
      <div className='mx-auto mt-5 flex max-w-2xl flex-wrap justify-center gap-2'>
        {suggestedJobSearches.map((search) => (
          <Link href='/offers' key={search}>
            <Badge
              variant='secondary'
              className='px-3 py-2 text-muted-foreground'
            >
              {search}
            </Badge>
          </Link>
        ))}
      </div>
    </div>

    <div className='mt-16'>
      <h2 className='text-center text-muted-foreground'>Recommended for you</h2>
      <div className='mx-auto mt-5 flex max-w-md flex-col justify-center space-y-5'>
        {recommendedForYou.map(
          ({ company, hourlyRate, location, name, id, icon: Icon }, index) => (
            <>
              <div className='flex w-full gap-x-5' key={id}>
                <Icon className='h-11 w-11' />
                <div className='flex flex-col justify-center gap-2.5'>
                  <h3 className='text-sm font-bold leading-none'>{name}</h3>
                  <div className='flex items-center gap-2.5 text-xs text-muted-foreground'>
                    <span>{location}</span>
                    <span>{company}</span>
                  </div>
                </div>
                <span className='ml-auto text-sm'>{hourlyRate} hourly</span>
              </div>
              {index === recommendedForYou.length - 1 ? null : <Separator />}
            </>
          ),
        )}
      </div>
    </div>
  </div>
);

export default Home;
