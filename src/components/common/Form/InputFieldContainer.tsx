import { FlexContainer } from '@/components';
import { InputFieldContainerProps } from '@/interfaces';

const InputFieldContainer = ({
  label,
  type,
  className,
  labelClassName,
  inputClassName,
  value,
  onChange,
  isOptional = false,
  disable = false,
}: InputFieldContainerProps) => {
  return (
    <FlexContainer
      direction='col'
      className={`w-full gap-2.5 ${className}`}
      itemCenter={false}
    >
      <label className={`pre-title text-white  ${labelClassName}`}>
        {label}
        {!isOptional && <span>*</span>}
      </label>
      <input
        disabled={disable}
        type={type}
        value={value}
        className={`w-full rounded focus:border-secondary focus:outline-none  ${inputClassName}`}
        onChange={(e) => onChange(e.target.value)}
      />
    </FlexContainer>
  );
};

export default InputFieldContainer;
