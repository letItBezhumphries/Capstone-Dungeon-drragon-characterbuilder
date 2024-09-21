import { useState } from 'react';

export const Input = ({ label, register, required }) => {
  return (
    <div>
      <label>{label}</label>
      <input type='text' {...register(label, { required })} />
    </div>
  );
};
