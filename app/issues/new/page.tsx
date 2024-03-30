'use client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import React, { useState } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const [error, setError] = useState('');

  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();

  return (
    <div className="max-w-xl pb-4">
      {error && (
        <Callout.Root className="mb-4">
          <Callout.Text color="red">{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post(`/api/issues`, data);
            router.push('/issues');
          } catch (error) {
            console.log('error', error);
            setError('An expected error occurred');
          }
        })}
        className=" space-y-3"
      >
        <TextField.Root placeholder="Title" {...register('title')} />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <Button>Submit New Issue </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
