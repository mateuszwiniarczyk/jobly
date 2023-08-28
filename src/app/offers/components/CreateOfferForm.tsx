'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  EmploymentType,
  ExperienceLevel,
  FlexibleHours,
  JobType,
  OnlineInterview,
  PaidHoliday,
  RemoteOption,
  Skill,
} from '@prisma/client';
import { useSession } from 'next-auth/react';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { createOfferAction } from '@/app/_actions/offer';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { experienceLevels, skills } from '@/constants/offer';
import { catchError } from '@/lib/utils';
import { offerSchema } from '@/lib/validations/offer';

type Offer = z.infer<typeof offerSchema>;

const defaultValues = {
  skills: [] as Skill[],
  position: '',
  experienceLevel: ExperienceLevel.TRAINEE,
  description: '',
  location: '',
  remoteOption: RemoteOption.REMOTE,
  jobType: JobType.FULL_TIME,
  employmentType: EmploymentType.CONTRACT,
  onlineInterview: OnlineInterview.YES,
  paidHoliday: PaidHoliday.YES,
  flexibleHours: FlexibleHours.YES,
  minSalary: 0,
  maxSalary: 0,
  contactEmail: '',
  contactPhone: '',
};

export const CreateOfferForm = () => {
  const data = useSession();
  const { pending } = useFormStatus();
  const form = useForm({
    defaultValues,
    resolver: zodResolver(offerSchema),
  });

  const onSubmit = async (values: Offer) => {
    try {
      const userId = data.data?.user?.id;

      if (userId) {
        await createOfferAction(values, userId);
      }
    } catch (error) {
      catchError(error);
    }
  };

  return (
    <Form {...form}>
      <form className='space-y-5' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='position'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input placeholder='Python Engineer' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='experienceLevel'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience Level</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Trainee' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {experienceLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Clearly describe the responsibilities, projects, and expectations for the role.'
                  className='resize-none'
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='location'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder='San Francisco, CA' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='remoteOption'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Possibility of remote work</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Remote / On-site / Hybrid' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='REMOTE'>Remote</SelectItem>
                  <SelectItem value='ONSITE'>On-site</SelectItem>
                  <SelectItem value='HYBRID'>Hybrid</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='jobType'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Type</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Full-time' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='FULL_TIME'>Full-time</SelectItem>
                  <SelectItem value='PART_TIME'>Part-time</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='employmentType'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employment Type</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Permanent' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='CONTRACT'>Contract</SelectItem>
                  <SelectItem value='PERMANENT'>Permanent</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='skills'
          render={() => (
            <FormItem>
              <FormLabel className='text-base'>Skills</FormLabel>
              {skills.map((skill) => (
                <FormField
                  key={skill.value}
                  control={form.control}
                  name='skills'
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={skill.value}
                        className='flex flex-row items-start space-x-3 space-y-0'
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(skill.value)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, skill.value])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== skill.value,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className='text-sm font-normal'>
                          {skill.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='onlineInterview'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Online Interview</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Yes' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='YES'>Yes</SelectItem>
                  <SelectItem value='NO'>No</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='paidHoliday'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paid Holiday</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Yes' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='YES'>Yes</SelectItem>
                  <SelectItem value='NO'>No</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='flexibleHours'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Flexible Hours</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Yes' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='YES'>Yes</SelectItem>
                  <SelectItem value='NO'>No</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='minSalary'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Min Salary</FormLabel>
              <FormControl>
                <div className='flex items-center gap-5'>
                  <Input
                    type='number'
                    placeholder='4000'
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                  $
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='maxSalary'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Salary</FormLabel>
              <FormControl>
                <div className='flex items-center gap-5'>
                  <Input
                    type='number'
                    placeholder='14000'
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                  $
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='contactEmail'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Email</FormLabel>
              <FormControl>
                <Input type='email' placeholder='john@doe.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='contactPhone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Phone</FormLabel>
              <FormControl>
                <Input type='tel' placeholder='123456' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={pending} className='justify-self-end'>
          Create job offer
        </Button>
      </form>
    </Form>
  );
};
