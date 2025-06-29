import React from "react";

interface LabelRadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const LabelRadio: React.FC<LabelRadioProps> = ({ label, ...inputProps }) => {
  return (
    <label className="w-fit">
      <input type="radio" {...inputProps} />
      {label}
    </label>
  );
};

export default LabelRadio;
