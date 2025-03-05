import React from 'react';

type MyInputProps = {
  checked: boolean;
  onChange: () => void;
  taskId: number;
};

// 1 оптимизировать компонент myInput
const MyInput = React.memo(({ checked, onChange, taskId }: MyInputProps) => {
  console.log('MY INPUT', taskId);
  return (
    <input
      className="checkbox"
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />
  );
});

export default MyInput;
