'use client';
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import React, { useState } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { createIssueSchema } from '@/app/validationSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const [error, setError] = useState('');
  const [isSubmiting, setSubmiting] = useState(false);

  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmiting(true);
      await axios.post(`/api/issues`, data);
      router.push('/issues');
    } catch (error) {
      console.log('error', error);
      setError('An expected error occurred');
      setSubmiting(false);
    }
  });

  return (
    <div className="max-w-xl pb-4">
      {error && (
        <Callout.Root className="mb-4">
          <Callout.Text color="red">{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={onSubmit} className=" space-y-3">
        <TextField.Root placeholder="Title" {...register('title')} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmiting}>
          Submit New Issue {isSubmiting && <Spinner />}{' '}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
